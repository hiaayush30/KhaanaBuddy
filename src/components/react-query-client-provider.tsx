"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const client = new QueryClient();

export default function ReactQueryClientProvider({ children }: { children: ReactNode }) {
   return  <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider>
}