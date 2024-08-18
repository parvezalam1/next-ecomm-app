import { wixClientServer } from '@/liberary/wixClientServer';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { collections } from '@wix/stores';

const CategoryList =async() => {
  let wixClient= await wixClientServer();
  let cats=await wixClient.collections
  .queryCollections()
.find();
  return (
    <>
      <h1 className='p-2 text-3xl font-extrabold text-red-400 container mx-auto'>Category List</h1>
      <div id='cat-scrollbar' className=' px-4 overflow-x-scroll'>
        <div className='flex gap-4 md:gap-8'>
      {
        cats.items?.map((cat)=>
        
          <Link href={`/list?cat=${cat.slug}`} className='shrink-0 w-full xl:w-1/6 md:w-1/4 sm:1/2' key={cat._id}>
            <div className='relative w-full h-80'>

              <Image src={cat.media?.mainMedia?.image?.url || "/woman.png"}
                alt=''
                fill
                sizes=''
                className='absolute rounded-md' />
                </div>
                <div>{cat.name}</div>
          </Link>
                ) }
 
        </div>
      </div>
    </>
  )
}

export default CategoryList;