"use client"
import { initiate } from "@/actions/userActions"
import Script from "next/script";
import { Button } from "./ui/button";
import { PlanInterval } from "@/lib/plans";

export default function PaymentsPage({
    amount,
    tier
}: {
    amount: number,
    tier:PlanInterval
}) {
    const pay = async () => {
        const order = await initiate(amount,tier);
        const options = {
            "key": process.env.NEXT_PUBLIC_KEY_ID as string, // Enter the Key ID generated from the Dashboard
            "amount": (order.amount).toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Khaana Buddy",
            "description": "Test Transaction",
            "image": `${process.env.NEXT_PUBLIC_URL}/logo.png`,
            "order_id": order.id, //This is a sample Order ID. Pass the id obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": {
                // "name": "Gaurav Kumar",
                // "email": "gaurav@email.com",
                // "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#FF7043"
            }
        }
        //@ts-ignore
        const rzp1 = new Razorpay(options);
        rzp1.open();
    }
    return <>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
        <Button
            className="w-full bg-[#e64a19] hover:bg-[#ff6130] text-white py-2 rounded-xl"
            id="rzp-button1"
            onClick={()=>pay()}
        >
            Choose Plan
        </Button>
    </>
}