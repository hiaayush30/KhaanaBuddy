import { MealPlanInput } from "@/app/meal-plan/page";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const POST = async (req: NextRequest) => {
    try {
        const body: MealPlanInput = await req.json();
        // const body: MealPlanInput = req.body;
        const promptFormat = `create me a daily meal planner for 7 days with the following details: calories required per day = ${body.calories},diet type=${body.diet},include snacks=${body.snacks},allergies if any=${body.allergies},preferred cuisine=${body.cuisine}.the response should strictly an array which has 7 objects each containing keys for day(number) and breakfast,lunch,snacks(if true) and dinner.breakfast,lunch,snacks(if true) and dinner should be an object with keys name (string of max 30 characters) and calories (number).the response should be just an array with no markups which i can directly Json.parse() and use`

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: promptFormat,
        });
        if (response.text) {
            const meals = await JSON.parse(response.text?.split("```json")[1].split("```")[0]);
            console.log(meals);
            return NextResponse.json({
                meals
            })
        } else {
           return NextResponse.json({
                error: "could not generate response"
            }, { status: 500 })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Internal server error"
        }, { status: 500 })
    }
}