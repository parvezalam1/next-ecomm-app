import { OAuthStrategy, createClient } from "@wix/sdk";
import { products,collections } from "@wix/stores";
import {cookies} from 'next/headers';
import { currentCart } from "@wix/ecom";
export const wixClientServer=async()=>{

    
    let refreshToken;
    try{
        
        const cookiesStore=cookies();
        refreshToken=JSON.parse(cookiesStore.get("refreshToken")?.value || "{}")
    }
catch{}

 const wixClient = createClient({
    modules: {
            products,
            collections,
            currentCart,
        },
        auth: OAuthStrategy({
            clientId:"7de303c0-918c-4e32-b3e2-b52e02b1ba0a",
            tokens: {
                refreshToken,
                accessToken:{value:"",expiresAt:0}
            }
        })
    })
    return wixClient;
}
