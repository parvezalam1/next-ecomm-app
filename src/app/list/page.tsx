"use server"
import React, { Suspense } from 'react'
import Filter from '../../components/Filter';
import { collections } from '@wix/stores';
import { wixClientServer } from '@/liberary/wixClientServer';
import ProductList from '@/components/ProductList';
export default async function page({searchParams}:{searchParams:any}) {
  console.log('search ',searchParams)
  const wixClient=await wixClientServer();
  // const items  = await wixClient.collections.queryCollectionBySlug(searchParams.cat || "all_product");
  const cat= await wixClient.collections.getCollectionBySlug(searchParams.cat || "all-products");
  return (
    <div className='md:p-5 '>
      <div className='mx-auto w-full md:w-2/3 md:p-5 p-2 bg-stone-200 h-60 flex justify-center items-center flex-col gap-4'>
        <div className="title text-slate-600 font-extrabold sm:text-4xl text-2xl">Get 50% OFF Any Products Now Start Buy</div>
        <button className='bg-white rounded-2xl ring-1 ring-black border-none hover:text-white transition-opacity ease duration-700 hover:bg-red-400 text-black py-1 px-5 font-bold'>Buy Now</button>
      </div>
      <Filter />

      {/* Product list */}

      <Suspense fallback={"loading..."}>
        <ProductList categoryId={cat?.collection?._id || "00000000-000000-000000-000000000001"} 
        searchParam={searchParams} />
      </Suspense>
    </div>
  )
}
