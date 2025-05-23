"use client"
import { ApiResponse } from "@/types/ApiResponse"
import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

async function createProfileRequest() {
    const response = await fetch("/api/createProfile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();
    return data as ApiResponse
}

export default function CreateProfile() {
    const router = useRouter();
    const { mutate, isPending } = useMutation<ApiResponse>({
        mutationFn: createProfileRequest,
        onSuccess: (data) => {
            console.log(data);
            router.push("/subscribe")
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const { isLoaded, isSignedIn } = useUser();
    useEffect(() => {
        if (isLoaded && isSignedIn && !isPending) {
            mutate()
        }
    }, [isLoaded, isSignedIn])
    return <div className="py-10 text-center flex flex-col items-center justify-center gap-2">
        <Loader2 className="text-2xl animate-spin"/>
        <div>Processing sign in...</div>
    </div>
}