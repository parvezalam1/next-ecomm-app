"use client"
import { createClient,OAuthStrategy } from "@wix/sdk"
import { products,collections } from "@wix/stores"
import Cookies  from "js-cookie"
import { currentCart } from "@wix/ecom"
import { createContext ,ReactNode} from "react"
import { redirects } from "@wix/redirects";
const refreshToken=JSON.parse(Cookies.get("refreshToken") || "{}")
const wixClient = createClient({
    modules: {
      products,
      collections,
      currentCart,
      redirects,
    //   services
    },
    auth: OAuthStrategy({
      clientId:"7de303c0-918c-4e32-b3e2-b52e02b1ba0a",
      tokens: {
     refreshToken,
     accessToken:{value:"",expiresAt:0}
      }
    })
  })

  export type WixClient =typeof wixClient
  export const WixClientContext=createContext<WixClient>(wixClient);

  export const WixClientContextProvider=({
    children,
  }:{
    children:ReactNode;
  })=>{
return(
    <WixClientContext.Provider value={wixClient}>
      {children}
      </WixClientContext.Provider>
)
  }