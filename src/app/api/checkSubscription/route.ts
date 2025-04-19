import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get("userId");
        if (!userId) {
            return NextResponse.json({
                error: "userId required"
            }, { status: 403 })
        }
        const user = await prisma.user.findFirst({
            where: {
                userId,
                subscribed: true
            },
        })
        if (!user) {
            return NextResponse.json({
                error: "user not subscribed"
            }, { status: 400 })
        }
        else {
            if (new Date() < new Date(user.subscriptionExpiryDate as Date)) {
                return NextResponse.json({
                    message: "user is subscribed",
                })
            } else {
                await prisma.user.update({
                    where: {
                        userId
                    },
                    data: {
                        subscribed: false,
                        subscriptionExpiryDate: null,
                        subscriptionTier: null,
                        orderId: null,
                    }
                })
                return NextResponse.json({
                    error: "subscription expired"
                }, { status: 400 })
            }
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Internal server error"
        })
    }
}