import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='w-full p-5 h-fit  bg-indigo-400'>
      {/* top */}
      <div className='w-full py-3 flex sm:flex-row flex-col sm:gap-2 gap-4'>
        <div className='w-full sm:w-1/2 lg:w-[25%] flex justify-center items-center  flex-col gap-3'>
          <div className="name text-2xl text-red-700 font-bold">PARVEZ ALAM</div>
          <div className="venue text-center text-md font-medium text-slate-800">Daniyalpur Lalgopal Ganj Allahabad U.P 229413</div>
          <div className="email text-md font-medium text-slate-800">info@gmail.com</div>
          <div className="contact text-md font-medium text-slate-800">+9100000000</div>
          <div className="relative w-full h-10 links flex justify-center items-center gap-5">
            <Link href="#" className='bg-zinc-200 hover:bg-white p-1 rounded-md'><img src="/facebook.png" alt="" className=' w-5 h-5 rounded-sm' /></Link>
            <Link href="#" className='bg-zinc-200 hover:bg-white p-1 rounded-md'><img src="/instagram.png" alt="" className='w-5 h-5 rounded-sm' /></Link>
            <Link href="#" className='bg-zinc-200 hover:bg-white p-1 rounded-md'><img src="/youtube.png" alt="" className='w-5 h-5 rounded-sm' /></Link>
          </div>
        </div>
      

       
        <div className='w-full lg:w-[15%] sm:hidden flex lg:flex justify-center items-center flex-col gap-3'>
          <div className="name text-2xl text-red-700 font-bold">COMPANY</div>
          <Link href="#" className="text-center about-us  text-md font-medium text-slate-800">About Us</Link>
          <Link href="#" className="careers  text-md font-medium text-slate-800">Careers</Link>
          <Link href="#" className="affiliates  text-md font-medium text-slate-800">Affiliates</Link>
          <Link href="#" className="blog  text-md font-medium text-slate-800">Blog</Link>
          <Link href="#" className="contact-us  text-md font-medium text-slate-800">Contact Us</Link>

        </div>
        <div className='w-full lg:w-[15%] sm:hidden flex lg:flex justify-center items-center flex-col gap-3'>
          <div className="shop text-2xl text-red-700 font-bold">SHOP</div>
          <Link href="#" className="new-arrivals text-md font-medium text-slate-800">New Arrivals</Link>
          <Link href="#" className="text-center accessories text-md font-medium text-slate-800">Accessories</Link>
          <Link href="#" className="men text-md font-medium text-slate-800">Men</Link>
          <Link href="#" className="women text-md font-medium text-slate-800">Women</Link>
          <Link href="#" className="all-products text-md font-medium text-slate-800">All Products</Link>
        </div>
        <div className='w-full lg:w-[15%] sm:hidden flex lg:flex justify-center items-center flex-col gap-3'>
          <div className="text-2xl text-red-700 font-bold">HELP</div>
          <Link href="#" className=" text-md font-medium text-slate-800">Customer Services</Link>
          <Link href="#" className="text-center my-account text-md font-medium text-slate-800">My Account</Link>
          <Link href="#" className="find-store text-md font-medium text-slate-800">Find a Store</Link>
          <Link href="#" className="legal-privacy text-md font-medium text-slate-800">Legal & Privacy</Link>
          <Link href="#" className="gift-card text-md font-medium text-slate-800">Gift Card</Link>
        </div>
        
        <div className='w-full sm:w-1/2 lg:w-[30%] flex justify-center items-center flex-col gap-3'>
          <div className="text-2xl text-red-700 font-bold">SUBSCRIBE</div>
          <Link href="#" className="text-center text-md font-medium text-slate-800">Lorem, ipsum dolor sit </Link>
          <div className=' px-2'><input type="email" placeholder='Info@gmail.com' className='border-none outline-none text-center lg:w-[250p] p-1 w-3/4' />
            <button className='p-1 bg-red-500'>JOIN</button></div>
          <Link href="/" className="secure-payment text-md font-medium text-slate-800">Secure Payment</Link>
          <Link href="#" className="payment text-md font-medium text-slate-800">Paytm PhonePay</Link>
          <Link href="#" className="visa flex justify-center items-center gap-4">
            <img src="./visa.png" alt="" className='w-7 h-7' />
            <img src="./mastercard.png" alt="" className='w-7 h-7' />
          </Link>

        </div>
      </div>
      {/* bottom */}
      <div className='container mx-auto p-4 flex sm:flex-row flex-col gap-4 justify-between items-center'>
    <div className="left text-justify font-extrabold">&copy; 2024 PARVEZ ALAM</div>
    <div className="right text-justify font-extrabold">Languages India | Hindi Urdu English</div>
      </div>
    </div>
  )
}
