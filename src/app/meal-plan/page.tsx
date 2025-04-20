'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import axios from "axios";

export interface MealPlanInput {
  snacks: boolean;
  calories: number;
  diet: null | string;
  allergies: null | string;
  cuisine: string | null;
}

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
  const [mealPlan, setMealPlan] = useState<MealPlanOutput[]>([]);

  interface MealPlanOutput {
    day: number,
    breakfast: {
      name: string,
      calories: number
    },
    lunch: {
      name: string,
      calories: number
    },
    snacks?: {
      name: string,
      calories: number
    },
    dinner: {
      name: string,
      calories: number
    }
  }

  // const mealPlan: MealPlanOutput[] = [
  //   {
  //     "day": 1,
  //     "breakfast": {
  //       "name": "Congee with Pork & Egg",
  //       "calories": 400
  //     },
  //     "lunch": {
  //       "name": "Kung Pao Chicken with Rice",
  //       "calories": 800
  //     },
  //     "dinner": {
  //       "name": "Mapo Tofu with Steamed Bok Choy",
  //       "calories": 1200
  //     }
  //   },
  //   {
  //     "day": 2,
  //     "breakfast": {
  //       "name": "Scallion Pancakes",
  //       "calories": 450
  //     },
  //     "lunch": {
  //       "name": "Beef and Broccoli Stir-fry",
  //       "calories": 750
  //     },
  //     "dinner": {
  //       "name": "Peking Duck with Pancakes",
  //       "calories": 1200
  //     }
  //   },
  //   {
  //     "day": 3,
  //     "breakfast": {
  //       "name": "Chinese Fried Dough Sticks",
  //       "calories": 500
  //     },
  //     "lunch": {
  //       "name": "Dan Dan Noodles",
  //       "calories": 700
  //     },
  //     "dinner": {
  //       "name": "Sweet and Sour Pork",
  //       "calories": 1200
  //     }
  //   },
  //   {
  //     "day": 4,
  //     "breakfast": {
  //       "name": "Steamed Buns with Veggies",
  //       "calories": 400
  //     },
  //     "lunch": {
  //       "name": "Chow Mein (Chicken)",
  //       "calories": 800
  //     },
  //     "dinner": {
  //       "name": "Hot Pot (various ingredients)",
  //       "calories": 1200
  //     }
  //   },
  //   {
  //     "day": 5,
  //     "breakfast": {
  //       "name": "Soy Milk and Baozi",
  //       "calories": 450
  //     },
  //     "lunch": {
  //       "name": "Shrimp Fried Rice",
  //       "calories": 750
  //     },
  //     "dinner": {
  //       "name": "General Tso's Chicken",
  //       "calories": 1200
  //     }
  //   },
  //   {
  //     "day": 6,
  //     "breakfast": {
  //       "name": "Sesame Balls",
  //       "calories": 500
  //     },
  //     "lunch": {
  //       "name": "Wonton Noodle Soup",
  //       "calories": 700
  //     },
  //     "dinner": {
  //       "name": "Braised Pork Belly",
  //       "calories": 1200
  //     }
  //   },
  //   {
  //     "day": 7,
  //     "breakfast": {
  //       "name": "Egg Drop Soup",
  //       "calories": 300
  //     },
  //     "lunch": {
  //       "name": "Lo Mein (Vegetable)",
  //       "calories": 900
  //     },
  //     "dinner": {
  //       "name": "Steamed Fish with Ginger",
  //       "calories": 1200
  //     }
  //   }
  // ]


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const form=e.currentTarget;
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload: MealPlanInput = {
      calories: Number(formData.get("calories")),
      snacks: formData.get("snacks")?.toString() ? true : false,
      diet: formData.get("diet")?.toString() || null,
      allergies: formData.get("allergies")?.toString() || null,
      cuisine: formData.get("cuisine")?.toString() || null
    }
    try {
      const response = await axios.post("/api/gemini", payload, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        }
      });
      setMealPlan(response.data.meals);
      toast("Meal plan generated!",{
        position:"bottom-right"
      })
    } catch (error) {
      console.log(error)
      toast("Something went wrong!",{
        position:"bottom-right"
      })
    }
    form.reset();
  }

  return (
    <div className='py-5 px-5'>
      <div className="flex flex-col md:flex-row md:justify-center md:items-stretch md:gap-0 gap-5">
        {/* Plan for the Week */}
        <div className="md:w-1/2 bg-gradient-to-b from-[#e65100] to-[#bf360c] md:border-r-4 border-stone-800 p-6 sm:rounded-2xl md:rounded-none md:rounded-l-2xl shadow-md flex flex-col items-center justify-start space-y-4 text-black">
          <h2 className="text-xl lg:text-3xl font-bold text-black text-center">AI Meal Plan Generator</h2>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col items-center gap-3'>
            <div className="space-y-2 w-full max-w-md">
              <Label htmlFor="calories" className="text-black">Target Calories<span className='text-slate-600'>/day*</span></Label>
              <Input name='calories' id="calories" type='number' required min={500} max={100000} placeholder="e.g. 2000" className="bg-white" />
            </div>

            <div className="space-y-2 w-full max-w-md flex items-center">
              <input
                name="snacks"
                id="snacks"
                type="checkbox"
                className="h-4 w-4 text-[#e65100] border-gray-300 rounded focus:ring-2 focus:ring-[#e65100]"
              />
              <Label htmlFor="snacks" className="text-black ml-3">
                Include snacks
              </Label>
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
        <div className="md:w-2/3 bg-white text-black p-6 sm:rounded-2xl md:rounded-none md:rounded-r-2xl shadow-md flex flex-col items-center justify-start">
          <h2 className="text-xl lg:text-3xl text-center font-bold mb-4 text-black">Your Weekly Plan</h2>

          <div className="flex items-center justify-between w-full max-w-md mb-4">
            <Button
              className='bg-[#e65100] hover:bg-[#bf360c]'
              onClick={() =>
                setCurrentDay((prev) => (prev === 0 ? days.length - 1 : prev - 1))
              }
            >
              Prev
            </Button>
            <span className="text-xl font-semibold">{days[currentDay]}</span>
            <Button
              className='bg-[#e65100] hover:bg-[#bf360c]'
              onClick={() =>
                setCurrentDay((prev) => (prev === days.length - 1 ? 0 : prev + 1))
              }
            >
              Next
            </Button>
          </div>

          {mealPlan.length === 0 ? (
            <div className="bg-orange-50 text-black w-full max-w-md rounded-xl p-6 shadow-md text-center">
              <p className="text-lg font-medium">No meal plan generated yet.</p>
              <p className="text-sm text-gray-600">Please fill out the form and click "Generate Meal Plan".</p>
            </div>
          ) : (
            <div className="bg-white text-black w-full max-w-md rounded-xl p-4 shadow-md">
              <div className="bg-orange-100 text-black w-full max-w-md rounded-xl p-4 shadow-md space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Breakfast</h3>
                  <p>{mealPlan[currentDay].breakfast.name}</p>
                  <p className="text-sm text-gray-600">Calories: {mealPlan[currentDay].breakfast.calories} kcal</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Lunch</h3>
                  <p>{mealPlan[currentDay].lunch.name}</p>
                  <p className="text-sm text-gray-600">Calories: {mealPlan[currentDay].lunch.calories} kcal</p>
                </div>

                {mealPlan[currentDay].snacks && (
                  <div>
                    <h3 className="font-semibold text-lg">Snacks</h3>
                    <p>{mealPlan[currentDay].snacks.name}</p>
                    <p className="text-sm text-gray-600">Calories: {mealPlan[currentDay].snacks.calories} kcal</p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-lg">Dinner</h3>
                  <p>{mealPlan[currentDay].dinner.name}</p>
                  <p className="text-sm text-gray-600">Calories: {mealPlan[currentDay].dinner.calories} kcal</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default MealPlan;
