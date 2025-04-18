"use client"
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, SignOutButton, useUser } from '@clerk/nextjs'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"

function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <nav className="mx-8 md:mx-24 lg:mx-32 mt-4 border-4 border-orange-600 rounded-3xl py-3 px-4 flex justify-between items-center text-white bg-[#ff7043] shadow-md">
      <div className='py-1'>
        <Link href="/">
          <Image
            alt='logo'
            src="/logo.png"
            height={50}
            width={90}
          />
        </Link>
      </div>
      <div className='hidden md:flex gap-3 items-center'>
        <SignedOut>
          <Link href={isSignedIn ? "/subscribe" : "/sign-up"}>
            <Button className='rounded-2xl border-2 border-white bg-orange-600 hover:bg-orange-500'>Subscribe</Button>
          </Link>
          <Link href="/sign-up">
            <Button className='rounded-2xl border-2 border-white bg-green-600 hover:bg-green-500'>Signup</Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <Link href="/">
            <Button className='rounded-2xl border-2 cursor-pointer border-white bg-orange-600 hover:bg-orange-500'>Home</Button>
          </Link>
          <Link href="/meal-plan">
            <Button className='rounded-2xl border-2 border-white bg-orange-600 hover:bg-orange-500 hover:shadow-sm text-white cursor-pointer'>Meal Plan</Button>
          </Link>
          {isLoaded && user?.imageUrl ? (
            <Link href="/profile">
              <Image
                alt='profile'
                src={user.imageUrl}
                height={40}
                width={40}
                className='rounded-full'
              />
            </Link>
          ) : (
            <div></div>
          )}
          <SignOutButton>
            <Button className='rounded-2xl border-2 border-white hover:bg-red-500 cursor-pointer' variant={"destructive"}>Logout</Button>
          </SignOutButton>
        </SignedIn>
      </div>

      {/* Mobile dropdown */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#333] text-white">
            <SignedOut>
              <DropdownMenuItem asChild>
                <Link href={isSignedIn ? "/subscribe" : "/sign-up"}>Subscribe</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/sign-up">Signup</Link>
              </DropdownMenuItem>
            </SignedOut>
            <SignedIn>
              <DropdownMenuItem asChild>
                <Link href="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/meal-plan">Meal Plan</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <SignOutButton>Logout</SignOutButton>
              </DropdownMenuItem>
            </SignedIn>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Navbar
