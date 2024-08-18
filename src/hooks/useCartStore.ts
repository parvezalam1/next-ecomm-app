import { create } from 'zustand'
import { currentCart } from '@wix/ecom'
import { WixClient } from '@/context/wixContext'
 type cartState={
cart:currentCart.Cart,
isLoading:boolean,
counter:number,
getCart:(wixClient:WixClient)=>void,
addItem:(wixClient:WixClient,productId:string,variantId:string,quantity:number)=>void,
removeItem:(wixClient:WixClient,itemId:string)=>void

 }

export const useCartStore = create<cartState>((set) => ({
cart:[],
isLoading:true,
counter:0,
getCart:async(wixClient)=>{
    try{
        const cart=await wixClient.currentCart.getCurrentCart();
        set({cart:(cart || []),isLoading:false,counter:cart?.lineItems.length || 0})
    }catch(err){
        console.log(err)
    }

},
addItem:async(wixClient,productId,variantId,quantity)=>{
set((state)=>({...state,isLoading:true}))
const response = await wixClient.currentCart.addToCurrentCart({
            
    lineItems:[
                    {
                        catalogReference:{
                            appId:"215238eb-22a5-4c36-9e7b-e7c08025e04e",
                            catalogItemId:productId,
                            ...(variantId && {options:{variantId}}),
    
                        },
                        quantity:quantity,
                    },
                ],
            });
set({cart:response.cart,counter:response.cart?.lineItems.length,isLoading:false})
},

removeItem:async(wixClient,itemId)=>{
    set((state)=>({...state,isLoading:true}))
    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);
    set({cart:response.cart,counter:response.cart?.lineItems.length,isLoading:false})
}
}))
