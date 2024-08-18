import { NextRequest,NextResponse } from "next/server";
import { OAuthStrategy, createClient } from "@wix/sdk";

export  const middleware=async(request:NextRequest)=>{
const cookies=request.cookies;
let res=NextResponse.next();
if(cookies.get("refreshToken")){
return res;
}

const wixClient=createClient({
    auth:OAuthStrategy({clientId:"7de303c0-918c-4e32-b3e2-b52e02b1ba0a"}),
});
const tokens=await wixClient.auth.generateVisitorTokens()
res.cookies.set("refreshToken",JSON.stringify(tokens.refreshToken),{
    maxAge:60 * 60 *24 * 30
});
return res;
}