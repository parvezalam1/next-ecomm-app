// "use client"
import ProductImages from '@/components/ProductImages';
import React, { useState } from 'react';
import CustomizeProduct from '@/components/CustomizeProduct';
import { products } from '@wix/stores';
import Add from '@/components/Add';
import { wixClientServer } from '@/liberary/wixClientServer';
import { notFound } from 'next/navigation';
const singlePage = async({params}:{params:{slug:any}}) => {
  let wixClient= await wixClientServer();
  let products=await wixClient.products
  .queryProducts()
  .eq("slug",params.slug)
  .find();
  if(!products.items[0]){
    return notFound();
  }
  let product=products.items[0]

  return (
    <div className='p-2 flex md:flex-row flex-col md:gap-3 gap-5'>
    
      <ProductImages item={product.media?.items} />
    
      <div className='p-2 md:w-1/2 w-full'>
        <h1 className='py-1 px-10 text-blue-500  font-semibold text-3xl'>{product.name}</h1>
        <div className="description p-2 sm:text-md text-sm text-neutral-500 font-medium">
      {product.description}
        </div>
        <div className='h-1 bg-slate-300'></div>
        <div className='p-2 bg-zinc-100'>
        
         
      {
        product.priceData?.price && (
          product.priceData.price===product.priceData.discountedPrice?
          <span className='text-green-900 text-2xl font-semibold'>${product.priceData.price}</span>:
          <div>
             
            <span className='text-slate-700  line-through text-2xl font-semibold'>${product.priceData.discountedPrice}</span>
             &nbsp;<span className='text-green-900 text-2xl font-semibold'>${product.priceData.price}</span>
          </div>


        )
      }
      
    
            
            </div>
        <div className='h-1 bg-slate-300'></div>
      {product.variants && product.productOptions ? (<CustomizeProduct 
        productId={product._id}
         productVariants={product.variants} 
        productOptions={product.productOptions} />
      ):(
        <Add 
        productId={product._id}
        variantId="00000000000000000"
          stockNumbers={product.stock?.quantity || 0}/>

      )}

        <div className='p-2 h-fit mt-2 flex flex-col gap-5 bg-fuchsia-200'>
          {
            product.additionalInfoSections?.map((section)=>
            <div key={section.title}>

          <h1 className='text-3xl text-blue-900 font-semibold'>{section.title}</h1>
          <div className="des p-2 sm:text-md text-sm text-neutral-500 font-medium">
           {section.description}
          </div>
        </div>
            )}
            </div>
      </div>


    </div>
  )
}

export default singlePage;


