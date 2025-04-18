import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PlanInterval } from "@/lib/plans";

const calculateSubscriptionExpiry = (tier: PlanInterval) => {
    const now = Date.now();
    switch (tier) {
        case "monthly":
            return new Date(now + 30 * 24 * 60 * 60 * 1000);
        case "weekly":
            return new Date(now + 7 * 24 * 60 * 60 * 1000);
        case "yearly":
            return new Date(now + 365 * 24 * 60 * 60 * 1000);
        default:
            return null;
    }
};

export const POST = async (req: NextRequest) => {
    try {
        let body = await req.formData()
        //@ts-ignore
        body = Object.fromEntries(body)
        console.log("parsed body:", body);

        const keySecret = process.env.KEY_SECRET;
        if (!keySecret) {
            console.error("Webhook Error: KEY_SECRET environment variable not set");
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }


        const payment = await prisma.payment.findFirst({
            //@ts-ignore
            where: { orderId: body.razorpay_order_id },
        });

        if (!payment) { //@ts-ignore
            console.error(`Webhook Error: Order not found for orderId: ${body.razorpay_order_id}`);
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        } else {
            //@ts-ignore
            const xx = validatePaymentVerification({ order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id }, body.razorpay_signature, process.env.KEY_SECRET);
            if (xx) {
                const updatedPayment = await prisma.payment.update({
                    where: { id: payment.id },
                    data: {
                        paymentSuccessfull: true,
                        //@ts-ignore
                        razorpay_payment_id: body.razorpay_payment_id, 
                        //@ts-ignore
                        razorpay_signature: body.razorpay_signature,
                    },
                });

                const expiryDate = calculateSubscriptionExpiry(
                    updatedPayment.subscriptionTier as PlanInterval
                );

                if (expiryDate) {
                    await prisma.user.update({
                        where: { userId: updatedPayment.userId },
                        data: {
                            subscribed: true,
                            orderId: updatedPayment.orderId,
                            subscriptionTier: updatedPayment.subscriptionTier,
                            subscriptionExpiryDate: expiryDate,
                        },
                    });
                    return NextResponse.json({ success: true, message: "Payment successful!" });
                }

            } else {
                return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
            }
        }
    } catch (error) {
        console.error("razorpay Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};