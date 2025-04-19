'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

function MealPlan() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      toast(message, {
        position: 'bottom-right',
        icon: <Check />,
      });
    }
  }, [searchParams]);

  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  const [currentDay, setCurrentDay] = useState(0);

  interface MealPlanInput {
    snacks: boolean;
    calories: number;
    diet: null | string;
    allergies: null | string;
    cuisine: string | null;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload: MealPlanInput = {
      calories: Number(formData.get("calories")),
      snacks: formData.get("snacks")?.toString() ? true : false,
      diet: formData.get("diet")?.toString() || null,
      allergies: formData.get("allergies")?.toString() || null,
      cuisine: formData.get("cuisine")?.toString() || null
    }

    // You can add a POST request here
  }

  return (
    <div className='py-5 px-5'>
      <div className="flex flex-col md:flex-row md:justify-center md:items-stretch md:gap-0 gap-5">
        {/* Plan for the Week */}
        <div className="md:w-1/2 bg-gradient-to-b from-[#ff7043] to-[#e64a19] md:border-r-4 border-stone-800 p-6 sm:rounded-2xl md:rounded-none md:rounded-l-2xl shadow-md flex flex-col items-center justify-start space-y-4 text-black">
          <h2 className="text-xl lg:text-3xl font-bold text-black text-center">AI Meal Plan Generator</h2>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col items-center gap-3'>
            <div className="space-y-2 w-full max-w-md">
              <Label htmlFor="calories" className="text-black">Target Calories<span className='text-slate-600'>/day*</span></Label>
              <Input name='calories' id="calories" type='number' required min={500} max={100000} placeholder="e.g. 2000" className="bg-white" />
            </div>

            <div className="px-0 flex items-center self-start">
              <Input name='snacks' id="snacks" type='checkbox' className="bg-white" />
              <Label htmlFor="snacks" className="text-black ml-2">Include snacks</Label>
            </div>

            <div className="space-y-2 w-full max-w-md">
              <Label htmlFor="dietType" className="text-black">Diet type</Label>
              <Input name='diet' id="dietType" placeholder="e.g. keto,veg,any" className="bg-white" />
            </div>

            <div className="space-y-2 w-full max-w-md">
              <Label htmlFor="allergies" className="text-black">Allergies</Label>
              <Input name='allergies' id="allergies" placeholder="e.g. peanuts" className="bg-white" />
            </div>

            <div className="space-y-2 w-full max-w-md">
              <Label htmlFor="cuisines" className="text-black">Preferred cuisine*</Label>
              <Input required name='cuisine' id="cuisines" placeholder="e.g. Indian,Chinese" className="bg-white" />
            </div>

            <Button type='submit' className="w-full max-w-md">Generate Meal Plan</Button>
          </form>
        </div>

        {/* Weekly Plan Preview */}
        <div className="md:w-2/3 bg-gradient-to-b from-[#ff7043] to-[#e64a19] text-black p-6 sm:rounded-2xl md:rounded-none md:rounded-r-2xl shadow-md flex flex-col items-center justify-start">
          <h2 className="text-xl lg:text-3xl text-center font-bold mb-4 text-black">Your Weekly Plan</h2>

          <div className="flex items-center justify-between w-full max-w-md mb-4">
            <Button
              variant="outline"
              onClick={() =>
                setCurrentDay((prev) => (prev === 0 ? days.length - 1 : prev - 1))
              }
            >
              Prev
            </Button>
            <span className="text-xl font-semibold">{days[currentDay]}</span>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentDay((prev) => (prev === days.length - 1 ? 0 : prev + 1))
              }
            >
              Next
            </Button>
          </div>

          <div className="bg-white text-black w-full max-w-md rounded-xl p-4 shadow-md">
            <div className="space-y-3">
              <div className="bg-orange-100 p-2 rounded">
                <span className="font-medium">Breakfast:</span> <br /> Banana Pancakes
              </div>
              <div className="bg-orange-100 p-2 rounded">
                <span className="font-medium">Lunch:</span> <br /> Chickpea Salad Bowl
              </div>
              <div className="bg-orange-100 p-2 rounded">
                <span className="font-medium">Snacks:</span> <br /> Fruit & Nuts
              </div>
              <div className="bg-orange-100 p-2 rounded">
                <span className="font-medium">Dinner:</span> <br /> Stir-Fried Tofu Rice
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealPlan;
