import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Utensils, CalendarDays, ChevronsDown } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-orange-50 text-brown-900">
      <section className="relative overflow-hidden text-center py-20 px-6 bg-gradient-to-b from-orange-100 to-orange-50">
        <h1 className="text-5xl font-bold mb-4">Welcome to Khaana Buddy</h1>
        <Image
          alt="banner"
          src="/banner.jpg"
          height={200}
          width={200}
          className="rounded-full mx-auto my-5 shadow-sm"
        />
        <p className="text-lg max-w-xl mx-auto mb-6">
          Your personal AI meal planner for delicious weekly meal suggestions.
        </p>
        <Button className="mx-5 my-2 bg-[#ff5722] hover:bg-[#e64a19] text-white px-6 py-3 rounded-2xl shadow-md">
          Get Started
        </Button>
        <Button className="bg-[#ff5722] hover:bg-[#e64a19] text-white px-6 py-3 rounded-2xl shadow-md">
          Explore
          <ChevronsDown />
        </Button>
      </section>

      <section className="py-16 px-6 grid gap-10 max-w-6xl mx-auto md:grid-cols-3">
        <Card className="bg-white text-brown-800 rounded-2xl shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Flame className="w-10 h-10 text-[#ff5722] mb-4" />
            <h3 className="font-semibold text-xl mb-2">Smart Suggestions</h3>
            <p>Get AI-powered weekly meal ideas tailored to your taste and diet.</p>
          </CardContent>
        </Card>

        <Card className="bg-white text-brown-800 rounded-2xl shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <CalendarDays className="w-10 h-10 text-[#ff5722] mb-4" />
            <h3 className="font-semibold text-xl mb-2">Weekly Planning</h3>
            <p>Stay ahead with an organized plan for every day of the week.</p>
          </CardContent>
        </Card>

        <Card className="bg-white text-brown-800 rounded-2xl shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Utensils className="w-10 h-10 text-[#ff5722] mb-4" />
            <h3 className="font-semibold text-xl mb-2">Tasty & Healthy</h3>
            <p>Balanced meals that are both delicious and nutritious.</p>
          </CardContent>
        </Card>
      </section>

      <section className="text-center py-16 bg-orange-100">
        <h2 className="text-3xl font-bold mb-4">Let Khaana Buddy cook up ideas for you!</h2>
        <p className="max-w-xl mx-auto mb-6">
          We make meal planning fun and easy with the help of AI. No more stress over &quot;What&apos;s for dinner?&quot;
        </p>
        <Button className="bg-[#ff5722] hover:bg-[#e64a19] text-white px-6 py-3 rounded-2xl shadow-md">
          Try It Now
        </Button>
      </section>
    </main>
  );
}
