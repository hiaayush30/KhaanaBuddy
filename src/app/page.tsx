import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Utensils, CalendarDays, ChevronsDown, CopyrightIcon, LucideCopyright, Copyright } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-[#fefefe]">
      <section className="relative overflow-hidden text-center py-20 px-6 bg-gradient-to-b from-[#292524] to-[#1a1a1a]">
        <video
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] object-cover z-0 opacity-40 rounded-lg"
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
            <Button className="mx-5 my-2 bg-[#ff4d4d] hover:bg-[#e64545] text-white px-6 py-3 rounded-2xl shadow-md">
              Get Started
            </Button>
          </Link>
          <Button className="bg-[#ff4d4d] hover:bg-[#e64545] text-white px-6 py-3 rounded-2xl shadow-md">
            Explore
            <ChevronsDown />
          </Button>
        </div>
      </section>


      <section className="py-16 px-6 grid gap-10 max-w-6xl mx-auto md:grid-cols-3">
        <Card className="bg-[#262626] text-white rounded-2xl shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Flame className="w-10 h-10 text-[#ffc107] mb-4" />
            <h3 className="font-semibold text-xl mb-2">Smart Suggestions</h3>
            <p>Get AI-powered weekly meal ideas tailored to your taste and diet.</p>
          </CardContent>
        </Card>

        <Card className="bg-[#262626] text-white rounded-2xl shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <CalendarDays className="w-10 h-10 text-[#ffc107] mb-4" />
            <h3 className="font-semibold text-xl mb-2">Weekly Planning</h3>
            <p>Stay ahead with an organized plan for every day of the week.</p>
          </CardContent>
        </Card>

        <Card className="bg-[#262626] text-white rounded-2xl shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Utensils className="w-10 h-10 text-[#ffc107] mb-4" />
            <h3 className="font-semibold text-xl mb-2">Tasty & Healthy</h3>
            <p>Balanced meals that are both delicious and nutritious.</p>
          </CardContent>
        </Card>
      </section>

      <section className="text-center py-16 bg-[#292524]">
        <h2 className="text-3xl font-bold mb-4">Let Khaana Buddy cook up ideas for you!</h2>
        <p className="max-w-xl mx-auto mb-6 text-[#dcdcdc]">
          We make meal planning fun and easy with the help of AI. No more stress over &quot;What&apos;s for dinner?&quot;
        </p>
        <Link href="/meal-plan">
          <Button className="bg-[#ff4d4d] hover:bg-[#e64545] text-white px-6 py-3 rounded-2xl shadow-md">
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
