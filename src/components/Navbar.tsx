import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'

function Navbar() {
  return (
      <nav className='py-3 bg-orange-300 px-2 border-b-4 border-orange-600 flex justify-between'>
        <div>
          <Link href={"/"}>
            <Image
              alt='logo'
              src={"/logo.png"}
              height={50}
              width={80}
            />
          </Link>
        </div>
        <div>
          <Button className='bg-[#ff5722] hover:bg-[#e64a19] text-white'>
            Login
          </Button>
        </div>
      </nav>
  )
}

export default Navbar
