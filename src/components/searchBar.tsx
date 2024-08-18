"use client"
import { useRouter } from 'next/navigation';
// import { Router, useRouter } from 'next/router';
import React from 'react'
export default function searchBar() {
  const router=useRouter()  ;
  const handleSearch=(e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault() ;
let formData=new FormData(e.currentTarget);
let name=formData.get('name') as String; 
if(name) router.push(`/list?name=${name}`);
  } 
  return (
    <div>
      <form action="" onClick={handleSearch}>

        <div className="hidden search  w-[350px] px-3 h-10 relative lg:flex justify-center items-center space-x-5 bg-yellow-50 rounded-md">
        <input id='search' name='name' type="search" placeholder='Search Here' className=' w-5/6 border-none outline-none text-xl font-semibold'/>
        <button type='submit'><img src="search.png" alt="" className='cursor-pointer w-7 h-7'/></button>
        </div>
      </form>
    </div>
  )
}
