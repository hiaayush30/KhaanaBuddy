"use client"
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, useUser } from '@clerk/nextjs'
import { Button } from './ui/button'


function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <nav className='py-3 bg-linear-to-b  bg-red-500 via-red-red-600 to-red-800 text-[#fefefe] px-2 border-b-4 border-white flex justify-between'>
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
            <Button>Home</Button>
          </Link>
          <Link href={isSignedIn ? "/subscribe":"/sign-up"}>
            <Button>Subscribe</Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button className='bg-green-600 hover:bg-green-500'>Signup</Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <Link href={"/meal-plan"}>
            <Button className='bg-orange-400 hover:bg-orange-200 hover:text-stone-700 cursor-pointer text-white'>Meal Plan</Button>
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
            <Button variant={"destructive"}>Logout</Button>
          </SignOutButton>
        </SignedIn>
      </div>
    </nav>
  )
}

export default Navbar
