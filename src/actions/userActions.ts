"use server"

import Razorpay from "razorpay";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PlanInterval } from "@/lib/plans";


export const initiate = async (amount: number, tier:PlanInterval) => {
    const user = await currentUser();
    if (!user) {
        return redirect(`${process.env.NEXT_PUBLIC_URL}/sign-up`)
    }
    const instance = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET,
    });

    const options = {
        amount: amount * 100,
        currency: "INR"
    }

    const x = await instance.orders.create(options)
    try {
        await prisma.payment.create({
            data: {
                amount,
                userId: user.id,
                orderId: x.id,
                subscriptionTier:tier
            }
        })
    } catch (error) {
        console.log(error)
        redirect(`${process.env.NEXT_PUBLIC_URL}/subscribe?error=internal+server+error`)
    }

    return x;
}