"use client"
import { useCartStore } from '@/hooks/useCartStore';
import { useWixClient } from '@/hooks/useWixClient';
import React, { useState } from 'react'

const Add = ({productId,variantId,stockNumbers}:{productId:any,variantId:any,stockNumbers:any}) => {
    let [quantity, setQuantity] = useState(0);
    // let totalQuantity=4;
    const quantityInDe=(type: "i" | "d")=>{
        if(type==='d' && quantity>1){
            setQuantity((prev)=>prev-1)
        }
        if(type==='i' && quantity<stockNumbers) 
        {
            setQuantity((prev)=>prev+1)

        }
    }

    const wixClient=useWixClient();
    const {addItem,isLoading}=useCartStore();
//     const addItem=async()=>{
//         const response = await wixClient.currentCart.addToCurrentCart({
            
// lineItems:[
//                 {
//                     catalogReference:{
//                         appId:"215238eb-22a5-4c36-9e7b-e7c08025e04e",
//                         catalogItemId:productId,
//                         ...(variantId && {options:{variantId}}),

//                     },
//                     quantity:quantity,
//                 },
//             ],
//         });
//         console.log('response',response)
//         console.log('product id',productId)
//     }
    return (
        <>
            <h1 className='p-2 text-red-900 font-semibold text-2xl'>Quantity</h1>
            <div className='p-2 bg-slate-200 rounded-xl flex justify-between items-center  sm:flex-row flex-col gap-1 sm:gap-3'>
                <div className="left  w-full flex justify-center items-center">
                    <button className='text-3xl px-3 font-extrabold rounded-l-xl bg-slate-500 w-10'
                    onClick={()=>quantityInDe('d')}
                    >-</button>
                    <div className='text-3xl font-semibold w-fit text-white  text-center bg-slate-500'>{quantity}</div>
                    <button className='text-3xl px-3 font-extrabold rounded-r-xl w-10 bg-slate-500'
                     onClick={()=>quantityInDe('i')}
                    >+</button>
                  {
                    stockNumbers<1?(
                        <div className='ml-9'>Product Not Availble Currently</div>
                    ):(

                        <div className='ml-9'>Only <span className='text-green-800 text-xs sm:text-xl font-semibold'>{stockNumbers} Items </span>You buy</div>
                    )
                  }  
                </div>
                <div className="right flex justify-center sm:mt-0 mt-4 w-full">
                    <button className='py-1 sm:px-6 px-2 sm:w-32 w-full whitespace-nowrap border-none ring-1 disabled:bg-indigo-200 disabled:cursor-not-allowed disabled:text-black ring-gray-600 rounded-xl hover:bg-red-300 hover:text-white'
                    onClick={()=>addItem(wixClient,productId,variantId,quantity)} disabled={isLoading}>{isLoading?"Please Wait...":"Add to Card"}</button>
                </div>
            </div>
        </>
    )
}

export default Add;
