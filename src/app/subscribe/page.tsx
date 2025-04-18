"use client";

import React from "react";
import { availablePlans } from "@/lib/plans";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import classNames from "classnames";
import PaymentsPage from "@/components/PaymentsPage"

function Subscribe() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#292524] to-[#1a1a1a] text-[#fefefe] px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Pricing</h2>
        <p className="text-[#dcdcdc] max-w-xl mx-auto">
          Get started with our weekly plan or upgrade to our monthly/yearly plan when you are ready.
        </p>
      </div>
      <div className="grid gap-8 max-w-5xl mx-auto md:grid-cols-3">
        {availablePlans.map((plan) => (
          <Card
            key={plan.name}
            className={classNames(
              "bg-[#262626] text-white rounded-2xl shadow-md border border-[#333] hover:scale-105 transition-all",
              {
                "border-2 border-[#e64a19] scale-[1.02]": plan.isPopular,
              }
            )}
          >
            <CardContent className="p-6 text-center">
              {plan.isPopular && (
                <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold bg-[#e64a19] text-white rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm text-[#ccc] mb-3">{plan.description}</p>
              <div className="text-3xl font-extrabold mb-4">
                ₹{plan.amount}
                <span className="text-sm font-medium text-[#aaa] ml-1">/ {plan.interval}</span>
              </div>
              <ul className="mb-6 text-left space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="text-green-400 w-4 h-4" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <PaymentsPage amount={plan.amount} tier={plan.interval} />
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

export default Subscribe;
