"use client"
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, SignOutButton, useUser } from '@clerk/nextjs'
import { Button } from './ui/button'


function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <nav className="mx-18 mt-4 rounded-3xl py-3 px-2 flex justify-between text-white bg-[#ff7043] shadow-md">
      <div className='py-1'>
        <Link href={"/"}>
          <Image
            alt='logo'
            src={"/logo.png"}
            height={50}
            width={90}
          />
        </Link>
      </div>
      <div className='flex gap-3 items-center'>
        <SignedOut>
          <Link href={"/"}>
            <Button className='rounded-2xl border-2 border-white bg-orange-600 hover:bg-orange-500'>Home</Button>
          </Link>
          <Link href={isSignedIn ? "/subscribe" : "/sign-up"}>
            <Button className='rounded-2xl border-2 border-white bg-orange-600 hover:bg-orange-500'>Subscribe</Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button className='rounded-2xl border-2 border-white bg-green-600 hover:bg-green-500'>Signup</Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <Link href={"/meal-plan"}>
            <Button className='rounded-2xl border-2 border-white bg-orange-600 hover:bg-orange-500 hover:shadow-sm text-white cursor-pointer'>Meal Plan</Button>
          </Link>
          {isLoaded && user?.imageUrl ? (
            <Link href={"/profile"}>
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
    </nav>
  )
}

export default Navbar
