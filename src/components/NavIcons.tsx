"use client"
import Link from 'next/link';
import React, { useState ,useEffect} from 'react'
import CartModel from './CartModel';
import { useWixClient } from '@/hooks/useWixClient';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useCartStore } from '@/hooks/useCartStore';
export default function NavIcons() {
  let [isProfileOpen, setIsProfileOpen] = useState(false);
  let [isCartOpen, setIsCartOpen] = useState(false);

  // temporary
  // let isLoggedIn=false;
  const pathName=usePathname();
  const wixClient = useWixClient();
  const isLoggedIn=wixClient.auth.loggedIn();
let router=useRouter() 
const handleProfile=() =>{
  if(!isLoggedIn) return router.push('/login'); 
  setIsProfileOpen(prev => !prev)
}

  // AUTH WITH WIX-MANAGED AUTH
  // const login=async()=>{
  //   const loginRequestData = wixClient.auth.generateOAuthData(
  //     "http://localhost:3000"
  //   );
  //   console.log('loginrequestdata',loginRequestData)
  //   sessionStorage.setItem('data','bye');
  //   localStorage.setItem("oAuthRediredData",JSON.stringify(loginRequestData));
  //   const {authUrl}=await wixClient.auth.getAuthUrl(loginRequestData)
  //   window.location.href=authUrl;
  //   console.log(loginRequestData)
  // }
  
  // handle logout
  let [isLogout,isSetLogout]=useState(false)
  const handleLogout=async()=>{
    isSetLogout(true)
    Cookies.remove('refreshToken')
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    isSetLogout(false)
    setIsProfileOpen(false)
    router.push(logoutUrl)
  }

  const {cart,counter,getCart}=useCartStore();
  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);
  return (
    <div>
      <div className='relative flex space-x-5  h-16 items-center'>
        <img src="profile.png" alt="" className='w-5 h-5 cursor-pointer'
         onClick={handleProfile} 
        // onClick={login}
         />
        {
          isProfileOpen && (
            <div className='z-10 absolute bg-zinc-200 top-[67px] right-[-16px] lg:right-[-60px] px-3 w-fit h-fit p-1 shadow-[0px_0px__3px_rgb(0,0,20)] rounded-md flex items-center space-y-1 flex-col'>
              <Link href="#" className='md:text-xl xl:w-32 text-center text-md  font-medium text-indigo-400 hover:text-black bg-indigo-200 hover:bg-green-300 px-5'>Profile</Link>
              <Link href="#" className='md:text-xl xl:w-32 text-center text-md whitespace-nowrap font-medium text-indigo-400 hover:text-black bg-indigo-200 hover:bg-green-300 px-5'
              onClick={handleLogout}>{isLogout?"Logging out...": "LogOut"}</Link>
            </div>
          )
        }
        <img src="notification.png" alt="" className='w-5 h-5 cursor-pointer' />
        <div className=' relative'>
          <img src="cart.png" alt="" className='w-5 h-5 cursor-pointer' onClick={() => setIsCartOpen(prev => !prev)} />
          <span className='absolute left-2 -top-5  w-6 h-6 rounded-full bg-cyan-500 flex justify-center items-center text-white'>
            {counter}</span>
        </div>
        {
          isCartOpen &&
         <CartModel />
        }

      </div>
    </div>
  )
}
