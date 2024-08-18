"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
// import { useRouter } from 'next/router';
import React from 'react'
const  Filter=()=>{
  const pathname=usePathname();
  const searchParams=useSearchParams();
  const {replace}=useRouter();

  
  const handlerFilterChange=(e:React.ChangeEvent<HTMLSelectElement | HTMLInputElement>)=>{
    const {name,value}=e.target;
    const params=new URLSearchParams(searchParams);
    params.set(name,value)
    replace(`${pathname}?${params.toString()}`)
    // console.log(name,value) 
  }
  return (
    <div className='md:container w-full flex md:p-5 py-4 px-2 mx-auto'>
        <div className="left w-4/5  flex gap-3 flex-wrap">
          <select name="type" id="" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'
          onChange={handlerFilterChange}
          >
            <option value="" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'>Type</option>
            <option value="physical" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'>Physical</option>
            <option value="deigital" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'>Digital</option>
          </select>
            <input type="number" name='min' placeholder='Min Price' className='w-28  py-1 px-3 ring-1 ring-black rounded-2xl'
             onChange={handlerFilterChange}
            />
            <input type="number" name='max' placeholder='Max Price' className='w-28 py-1 px-3 ring-1 ring-black rounded-2xl'
             onChange={handlerFilterChange}/>
            <select name="size" id="" className='w-20 py-1 px-3 ring-1 ring-black rounded-2xl'
             onChange={handlerFilterChange}>
            <option value="" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'>Size</option>
            <option value="" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'></option>
            <option value="" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'></option>
          </select>
          <select name="" id="" className='w-28 py-1 px-3 ring-1 ring-black rounded-2xl'>
            <option value="" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'>Colors</option>
            <option value="" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'>Physical</option>
            <option value="" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'>Digital</option>
          </select>
          <select name="category" id="" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'
           onChange={handlerFilterChange}>
            <option value="" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'>Category</option>
            <option value="new arrival" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'>New Arrival</option>
            <option value="popular" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'>Popular</option>
          </select>
          <select name="" id="" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'>
            <option value="" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'>All Filters</option>
            <option value="" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'>Physical</option>
            <option value="" className='w-32 py-1 px-3 ring-1 ring-black rounded-2xl'>Digital</option>
          </select>
        </div>
        <div className="right h-9">
        <select name="sort" id="" className=' py-1 px-3 ring-1 ring-black rounded-2xl border-none'
         onChange={handlerFilterChange}>
            <option value="" className=' py-1 px-3 ring-1 ring-black rounded-2xl'>Sort By</option>
            <option value="asc price" className=' py-1 px-3 ring-1 ring-black rounded-2xl'>Price Low to Hight</option>
            <option value="desc price" className=' py-1 px-3 ring-1 ring-black rounded-2xl'>Price Hight to Low</option>
            <option value="asc lastUpdated" className=' py-1 px-3 ring-1 ring-black rounded-2xl'>Newest</option>
            <option value="desc lastUpdated" className=' py-1 px-3 ring-1 ring-black rounded-2xl'>Oldest</option>

          </select>
        </div>
    </div>
  )
}

export default Filter;