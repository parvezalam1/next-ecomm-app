"use client"
import { WixClientContext ,WixClient} from '@/context/wixContext';
import { useCartStore } from '@/hooks/useCartStore';
import { useWixClient } from '@/hooks/useWixClient';
import { useEffect } from 'react';
import {media as wixMedia} from "@wix/sdk"
import { currentCart } from '@wix/ecom';
import React from 'react'

const CartModel = () => {
const wixClient=useWixClient() 
  const { cart, isLoading,removeItem} = useCartStore();
  
  const handleCheckout=async() =>{
    try{

      const checkout= await wixClient.currentCart.createCheckoutFromCurrentCart({
        channelType:currentCart.ChannelType.WEB,
      });
      const {redirectSession} = await wixClient.redirects.createRedirectSession({
        ecomCheckout:{checkoutId:checkout.checkoutId},
        callbacks:{
          postFlowUrl:window.location.origin,
          thankYouPageUrl:`${window.location.origin}/success`
        }
      });
      if(redirectSession?.fullUrl){
        window.location.href=redirectSession.fullUrl;
      }
    }
    catch(err){
      console.log(err)
    }

  }
  return (
    <div className='z-10 fixed  top-[67px] right-1 lg:right-10 flex flex-col space-y-3 px-3 w-72 h-fit bg-slate-300 rounded-md p-1'>
        {isLoading?"Loading...":!cart.lineItems?<h1 className='bg-gray-100 text-center text-black font-semibold text-xl p-1'>Cart is Empty</h1>:
        <>
            <div className="title font-extrabold text-xl">Shipping Cart</div>
           {cart.lineItems?.map((item)=>
             <div className='flex w-fit justify-center gap-2' key={item._id}>
            {item.image &&  <img src={wixMedia.getScaledToFillImageUrl(item.image,70,90,{})} 
            alt="" className='w-20 h-24' />}
              <div className='space-y-3 text-fuchsia-700'>
                <div className='flex justify-between gap-2 w-44'>
                  <div className="product whitespace-nowrap">{item.productName?.original}</div>
                  {
                    item.quantity!>1?(
                              <div className='whitespace-nowrap'>
                      <div className="price whitespace-nowrap">{item.quantity}*${item.price?.amount}</div>

                              </div>
                    ):
                    (
                      <div className="price whitespace-nowrap">${item.price?.amount}</div>

                    )
                    
                  }
                </div>
                <div className="status text-sm">{item.availability?.status}</div>
                <div className='w-44 flex justify-between '>
                  <div className="qty">Qty {item.quantity}</div>
                  <button className='hover:bg-slate-400 hover:text-white text-red-600 py-1 px-2'
                  onClick={()=>removeItem(wixClient,item._id!)}>Remove</button>
                </div>
              </div>
            </div>
          )} 
            <div className='flex justify-between py-1'>
              <button className='bg-orange-200 hover:bg-lime-300 text-sm text-blue-500 py-1 px-2'>View Cart</button>
              <button className='bg-orange-200 hover:bg-lime-300 text-sm text-blue-500 py-1 px-2'
              onClick={handleCheckout}>Checkout</button>
            </div>
                </> 
}
          </div >
  )
}

export default CartModel;
