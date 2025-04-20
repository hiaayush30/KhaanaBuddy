import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/sign-up(.*)",
    "/subscribe(.*)",
    "/api/checkSubscription(.*)",
    "/api/razorpay(.*)",
    "/api/gemini(.*)"
])

const isSignupRoute = createRouteMatcher([
    "/sign-up(.*)"
])

const isMealPlanRoute = createRouteMatcher([
    "/meal-plan(.*)"
])

export default clerkMiddleware(async (auth, req) => {
    const userAuth = await auth();
    const { userId } = userAuth;
    const { pathname, origin } = req.nextUrl;
    console.log("Middleware Info:", userId, pathname, origin);

    if (!isPublicRoute(req) && !userId) {
        return NextResponse.redirect(new URL("/sign-up", origin));
    }
    if (isSignupRoute(req) && userId) {
        return NextResponse.redirect(new URL("/meal-plan", origin));
    }
    if (isMealPlanRoute(req)) {
        const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/checkSubscription?userId=" + userId);
        if (!res.ok) {
            return NextResponse.redirect(new URL("/subscribe", origin));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};