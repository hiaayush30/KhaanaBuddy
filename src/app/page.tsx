import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { availablePlans } from "@/lib/plans";
import classNames from "classnames";
import { Flame, Utensils, CalendarDays, ChevronsDown, Copyright, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-[#fefefe]">
      <section className="relative overflow-hidden text-center py-20 px-6 bg-gradient-to-b from-[#292524] to-[#1a1a1a]">
        <video
          className="mask-fade-bottom absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] object-cover z-0 opacity-40 rounded-lg"
          src={"https://res.cloudinary.com/dinsdxr0g/video/upload/v1744915486/video_t8wzvf.mp4"}
          controls={false}
          loop
          muted
          autoPlay
        />
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 text-white">Welcome to Khaana Buddy</h1>
          <Image
            alt="banner"
            src="/banner.jpg"
            height={200}
            width={200}
            className="rounded-full mx-auto my-5 shadow-sm"
          />
          <p className="text-lg max-w-xl mx-auto mb-6 text-[#dcdcdc]">
            Your personal AI meal planner for delicious weekly meal suggestions.
          </p>
          <Link href={"/meal-plan"}>
            <Button className="mx-5 my-2 bg-[#e64a19] hover:bg-[#ff6130] text-white px-6 py-3 rounded-2xl shadow-md">
              Get Started
            </Button>
          </Link>
          <Button className="bg-[#e64a19] hover:bg-[#ff6130] text-white px-6 py-3 rounded-2xl shadow-md">
            Explore
            <ChevronsDown />
          </Button>
        </div>
      </section>


      <section className="py-16 px-6 grid gap-10 max-w-6xl mx-auto md:grid-cols-3">
        <Card className="bg-[#262626] text-white rounded-2xl shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Flame className="w-10 h-10 text-[#ff5722] mb-4" />
            <h3 className="font-semibold text-xl mb-2">Smart Suggestions</h3>
            <p>Get AI-powered weekly meal ideas tailored to your taste and diet.</p>
          </CardContent>
        </Card>

        <Card className="bg-[#262626] text-white rounded-2xl shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <CalendarDays className="w-10 h-10 text-[#ff5722] mb-4" />
            <h3 className="font-semibold text-xl mb-2">Weekly Planning</h3>
            <p>Stay ahead with an organized plan for every day of the week.</p>
          </CardContent>
        </Card>

        <Card className="bg-[#262626] text-white rounded-2xl shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Utensils className="w-10 h-10 text-[#ff5722] mb-4" />
            <h3 className="font-semibold text-xl mb-2">Tasty & Healthy</h3>
            <p>Balanced meals that are both delicious and nutritious.</p>
          </CardContent>
        </Card>
      </section>
      <section className="py-10">
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
                "bg-[#262626] text-white rounded-2xl shadow-md border border-[#333]",
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
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center py-16 bg-[#292524]">
        <h2 className="text-3xl font-bold mb-4">Let Khaana Buddy cook up ideas for you!</h2>
        <p className="max-w-xl mx-auto mb-6 text-[#dcdcdc]">
          We make meal planning fun and easy with the help of AI. No more stress over &quot;What&apos;s for dinner?&quot;
        </p>
        <Link href="/meal-plan">
          <Button className="bg-[#e64a19] hover:bg-[#ff6130] text-white px-6 py-3 rounded-2xl shadow-md">
            Try It Now
          </Button>
        </Link>
      </section>
      <footer className="bg-[#292524] text-stone-500 py-1 px-1 flex flex-row-reverse justify-between">
        <div className="text-stone-300">
          <a href="/https://github.com/hiaayush30" target="_blank">About Me</a>
        </div>
        <div>
          <span className="flex items-center gap-1">
            All Rights reserved <Copyright />
          </span>
        </div>
      </footer>
    </main>
  );
}
