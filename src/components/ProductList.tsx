import { wixClientServer } from '@/liberary/wixClientServer';
import { media } from '@wix/sdk';
import { collections, products } from '@wix/stores';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DOMPurify from 'isomorphic-dompurify';
import Pagination from './Pagination';
const Product_per_page=4;
export default async function ProductList({categoryId,limit,searchParam}:{categoryId:string;limit?:number,
searchParam?:any}) {
    let wixClient= await wixClientServer();
    let cat:any;
    if(searchParam?.category){

        cat= await wixClient.collections.getCollectionBySlug(searchParam?.category || "all-products");
    }

    
    const productQuery= wixClient.products
    .queryProducts()
    .startsWith("name",searchParam?.name || "")
    .hasSome("productType",[searchParam?.type || "physical" , "digital"])
    .eq("collectionIds",[cat?.collection?._id || categoryId])
    // .eq("name",searchParam?.category)
    .lt("priceData.price",searchParam?.max || 999999)
    .gt("priceData.price",searchParam?.min | 0)

    // .exists("category.categoryName",searchParam?.category)
    .limit(limit || Product_per_page)
    .skip(searchParam?.page ? parseInt(searchParam.page) * (limit || Product_per_page ):0);
//     if(searchParam?.category){
// productQuery.eq("collectionIds",cat?.collection?._id)
//     }else{
// productQuery.eq("collectionIds",categoryId)
        
//     }
    if(searchParam?.sort){
        const [sortType,sortBy]=searchParam.sort.split(" ");

        if(sortType==="asc"){
            productQuery.ascending(sortBy)
        }
        if(sortType==='desc'){
            productQuery.descending(sortBy)
        }
    
}
    const res=await productQuery.find();
    return (
        <>
            <div className='w-full h-fit  flex justify-center items-center flex-wrap gap-4'>
                {
                    res.items.map((product:products.Product)=>

                        <Link href={`/`+product.slug} className='w-full lg:container p-2 space-y-2 lg:w-[22%] sm:w-[45%]' key={product._id}>
                    <div className='relative w-full h-80'>

                         <Image 
                        src={product.media?.mainMedia?.image?.url || "/profile.png"}
                        alt=''
                        sizes='25vw'
                        fill
                        className='absolute rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500'
                        /> 
                        {
                            product.media?.items &&
                         <Image 
                         src={product.media.items[1].image?.url || "/profile.png"}
                         alt=''
                         sizes='25vw'
                         fill
                         className='absolute rounded-md'
                         />
                        }
                    </div>
                    <div className='flex justify-between'>
                        <div>{product.name}</div>
                        <div>${product.priceData?.price}</div>
                    </div>
                     {product.additionalInfoSections && (
                    <div className='' dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(

                           
                            product.additionalInfoSections.find((section:any)=>section.title==="shortDescription")?.description || ""
                           
                    )}}>
                        </div>
                        )}  
                    
                    <button className='py-1 px-3 border-none text-red-900  rounded-2xl transition-colors ease duration-500 ring-1 ring-gray-400 hover:text-emerald-50 font-bold hover:bg-red-500 bg-slate-200'>Add to Cart</button>
                </Link>
               
               )}
       {
        searchParam?.cat || searchParam?.name?
        <Pagination 
        currentPage={res.currentPage || 0}
        hasPrev={res.hasPrev()} 
        hasNext={res.hasNext()} />:null
    }  
        </div>
        </>
    )
}
