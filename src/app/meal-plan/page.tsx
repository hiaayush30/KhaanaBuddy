'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Trash2, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

// List of countries for dropdown (sample)
const countries = ['India', 'United States', 'Germany', 'France', 'Japan', 'Australia'];

function MealPlan() {
  const [ingredients, setIngredients] = useState<string[]>(['']);
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

  const handleIngredientChange = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredient = () => setIngredients([...ingredients, '']);
  const removeIngredient = (index: number) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  return (
    <div className='py-5 px-5'>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
        {/* Mini Dashboard */}
        <div className="mx-auto min-w-[70%] bg-gradient-to-b from-[#ff7043] to-[#e64a19] p-6 rounded-2xl shadow-md flex flex-col items-center justify-start space-y-4 text-black">
          <h2 className="text-3xl font-semibold text-black">Welcome👋</h2>
          <p className='text-center'
          >Plan for the week ahead or cook a delicious meal from the ingredients you already have 😋</p>
        </div>
        {/* Plan for the Week */}
        <div className="mx-auto bg-gradient-to-b from-[#ff7043] to-[#e64a19] p-6 rounded-2xl shadow-md flex flex-col items-center justify-start space-y-4 text-black">
          <h2 className="text-3xl font-bold text-black">Plan for the Week</h2>
          <div className="space-y-2 w-full max-w-md">
            <Label htmlFor="calories" className="text-black">Target Calories</Label>
            <Input id="calories" placeholder="e.g. 2000" className="bg-white" />
          </div>

          <div className="space-y-2 w-full max-w-md">
            <Label htmlFor="height" className="text-black">Height (cm)</Label>
            <Input id="height" placeholder="e.g. 170" className="bg-white" />
          </div>

          <div className="space-y-2 w-full max-w-md">
            <Label htmlFor="weight" className="text-black">Weight (kg)</Label>
            <Input id="weight" placeholder="e.g. 65" className="bg-white" />
          </div>

          <div className="space-y-2 w-full max-w-md">
            <Label htmlFor="region" className="text-black">Region</Label>
            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full max-w-md">Generate Meal Plan</Button>
        </div>

        {/* Ingredients Box */}
        <div className="mx-auto bg-gradient-to-b from-[#ff7043] to-[#e64a19] p-6 rounded-2xl shadow-md flex flex-col items-center justify-start space-y-4 text-black">
          <h2 className="text-3xl font-bold text-black">Have Some Ingredients</h2>

          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-2 w-full max-w-md">
              <Input
                placeholder={`Ingredient ${index + 1}`}
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="bg-white flex-1"
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeIngredient(index)}
                disabled={ingredients.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button variant="outline" onClick={addIngredient} className="w-full max-w-md flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Ingredient
          </Button>
          <Button>Generate a meal</Button>
        </div>
      </div>
    </div>
  );
}

export default MealPlan;
