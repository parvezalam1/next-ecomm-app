"use client"
import Link from 'next/link';
import React, { useState } from 'react'

const  menu=()=> {
  let [open,setOpen]=useState(false);
  return (
    <div className=' h-16'>
            <img src={!open?"menu.png":"x.png"} alt="" width={27} height={27} className='cursor-pointer mt-5' onClick={()=>setOpen((prev)=>!prev)} / >
{
  open && 
            <ul id='ul' className='absolute top-16 -left-0 xl:w-1/4 sm:w-1/2 w-full py-1 h-[90vh] z-10 bg-slate-800 flex justify-start items-center flex-col gap-2'>
              {/* <div className='w-full p-1 flex justify-end'><span className='text-3xl cursor-pointer w-7 flex justify-center bg-slate-200'>X</span></div> */}
              <form className='lg:hidden w-[90%] py-2 px-1 bg-white block:flex'>
                <input type="search" placeholder='Search Now' className='w-[77%] bg-transparent p-2 text-center  border-none outline-none'/>
        <button><img src="search.png" alt="" className='cursor-pointer w-5 h-5'/></button>
                
              </form>
                <li className='bg-lime-200  mt-8'><Link href="#" className='w-72 text-center px-10 py-1 block'>Home</Link></li>
                <li className='bg-purple-300'><Link href="#" className='w-72 text-center px-10 py-1 block'>Home</Link></li>
                <li className='bg-fuchsia-300'><Link href="#" className='w-72 text-center px-10 py-1 block'>Home</Link></li>
                <li className='bg-cyan-300'><Link href="#" className='w-72 text-center px-10 py-1 block'>Home</Link></li>
                <li className='bg-red-50'><Link href="#" className='w-72 text-center px-10 py-1 block'>Home</Link></li>
                <li className='bg-red-300'><Link href="#" className='w-72 text-center px-10 py-1 block'>Home</Link></li>
            </ul>
}
    </div>
  )
}
export default menu;

