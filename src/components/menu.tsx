"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import SearchBar from './searchBar';
import { useRouter } from 'next/navigation';
const  menu=()=> {
  let [open,setOpen]=useState(false);
  const router=useRouter()  ;
  const handleSearch=(e:React.FormEvent<HTMLFormElement>)=>{

e.preventDefault() ;
let formData=new FormData(e.currentTarget);
let name=formData.get('name') as String; 
if(name) router.push(`/list?name=${name}`);
  } 
  return (
    <div className=' h-16'>
            <img src={!open?"menu.png":"x.png"} alt="" width={27} height={27} className='cursor-pointer mt-5' onClick={()=>setOpen((prev)=>!prev)} / >
{
  open && 
            <ul id='ul' className='absolute top-16 -left-0 xl:w-1/4 sm:w-1/2 w-full py-1 h-[90vh] z-20 bg-slate-800 flex justify-start items-center flex-col gap-2'>
              {/* <div className='w-full p-1 flex justify-end'><span className='text-3xl cursor-pointer w-7 flex justify-center bg-slate-200'>X</span></div> */}
              <form action="" onClick={handleSearch} className='lg:hidden px-2 py-1 bg-white block:flex justify-center items-center'>
                <input type="search" name='name' placeholder='Search Now' className='w-[77%] bg-transparent  text-center  border-none outline-none'/>
        <button type='submit'><img src="search.png" alt="" className='cursor-pointer w-5 h-5 relative left-2 top-1'/></button>
                
              </form>
              
                <li className='bg-lime-200  mt-8'  onClick={()=>setOpen((prev)=>!prev)}><Link href="/" className='w-72 text-center px-10 py-1 block'>Home</Link></li>
                <li className='bg-purple-300' onClick={()=>setOpen((prev)=>!prev)}><Link href="#" className='w-72 text-center px-10 py-1 block'>Shop</Link></li>
                <li className='bg-fuchsia-300' onClick={()=>setOpen((prev)=>!prev)}><Link href="#" className='w-72 text-center px-10 py-1 block'>Deals</Link></li>
                <li className='bg-cyan-300' onClick={()=>setOpen((prev)=>!prev)}><Link href="#" className='w-72 text-center px-10 py-1 block'>About Us</Link></li>
                <li className='bg-red-50' onClick={()=>setOpen((prev)=>!prev)}><Link href="#" className='w-72 text-center px-10 py-1 block'>Contact Us</Link></li>
            </ul>
}
    </div>
  )
}
export default menu;

