import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST() {
    const clerkUser = await currentUser();
    if (!clerkUser) {
        return NextResponse.json({ error: "User not found in Clerk" }, { status: 403 })
    }
    const email = clerkUser?.emailAddresses[0].emailAddress || ""
    if (!email) {
        return NextResponse.json({ error: "User does not have an email address" }, { status: 400 })
    }
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                userId: clerkUser.id
            }
        })
        if (existingUser) {
            return NextResponse.json({ message: "profile already exists" })
        }
        await prisma.user.create({
            data: {
                email,
                userId: clerkUser.id,
                subscriptionTier: null,
                subscriptionId: null
            }
        });
        return NextResponse.json({
            message: "profile created successfully"
        }, { status: 201 })
    } catch (error) {
        console.log("error in create-profile:", error);
        return NextResponse.json({
            error: "Internal server error"
        }, { status: 500 })
    }
}