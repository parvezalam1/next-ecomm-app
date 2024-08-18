"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const Pagination=({currentPage,hasPrev,hasNext}:{currentPage:number,hasPrev:boolean,hasNext:boolean})=>{
    const pathname=usePathname();
    const searchParams=useSearchParams();
    const {replace}=useRouter();
    const createPageUrl=(pageIndex:number)=>{
      const params=new URLSearchParams(searchParams);
      console.log('pagenumber',pageIndex);
      params.set("page",pageIndex.toString())
      console.log('page',params)
      replace(`${pathname}?${params.toString()}`)
    }
  return (
    <div className='container mx-auto p-2 flex justify-between'>
    <button className='py-1 px-2 border-none rounded-md text-white bg-red-400 text-xl font-semibold disabled:bg-red-200'
     disabled={!hasPrev} onClick={()=>createPageUrl(currentPage-1)}>Preview</button>
    <button className='py-1 px-2 border-none rounded-md text-white bg-red-400 text-xl font-semibold disabled:bg-red-200'
    disabled={!hasNext} onClick={()=>createPageUrl(currentPage+1)}>Next</button>
    </div>
  )
}

export default Pagination;