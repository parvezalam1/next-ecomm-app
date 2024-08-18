import React, { useState } from 'react'
import SearchBar from './searchBar'
import Menu from './menu'
// import NavIcons from './NavIcons'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const NavIcons=dynamic(()=>import("./NavIcons"),{ssr:false})
export default function Navbar() {
  return (
    <div>
      <div className='relative mx-auto lg:container w-full lg:bg-transparent bg-slate-300 px-4 flex gap-3'>
        <Menu />
        <div className=" left lg:w-1/4 w-1/2  h-16 md:space-x-5 space-x-2 flex justify-center items-center">
          <img src="logo.png" alt="" className='md:w-10 w-7 h-6' />
          <Link href="/" className='text-fuchsia-400 font-extrabold lg:text-2xl md:xl text-sm whitespace-nowrap'>Parvez Alam</Link>
        </div>
        <div className="right lg:w-3/4 w-1/2 h-16 flex justify-end md:px-8 px-1 md:space-x-8 space-x-3 items-center">
          <SearchBar />
         <NavIcons />
        </div>
      </div>
    </div>
  )
}
