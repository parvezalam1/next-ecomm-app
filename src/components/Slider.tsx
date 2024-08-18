"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
// import { setInterval } from 'timers/promises'
let slider = [
    {

        id: 1,
        title: "lorem ipsum dolor sit amet",
        discription: "lorem ipsum dolor sit amet lorem fdkfj",
        img: "https://images.pexels.com/photos/18595564/pexels-photo-18595564/free-photo-of-vases-with-flowers-on-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        url: "/",
        bg_linear: "bg-gradient-to-r from-gray-300"
    },
    {

        id: 2,
        title: "lorem ipsum dolor sit amet",
        discription: "lorem ipsum dolor sit amet lorem fdkfj",
        img: "https://images.pexels.com/photos/10515653/pexels-photo-10515653.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        url: "/",
        bg_linear: "bg-gradient-to-r from-gray-300"
    },
    {

        id: 3,
        title: "lorem ipsum dolor sit amet",
        discription: "lorem ipsum dolor sit amet lorem fdkfj",
        img: "https://images.pexels.com/photos/26098755/pexels-photo-26098755/free-photo-of-sleeping-penguin.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        url: "/",
        bg_linear: "bg-gradient-to-r from-gray-300"
    },
    {

        id: 4,
        title: "lorem ipsum dolor sit amet",
        discription: "lorem ipsum dolor sit amet lorem fdkfj",
        img: "https://images.pexels.com/photos/11379609/pexels-photo-11379609.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        url: "/",
        bg_linear: "bg-gradient-to-r from-gray-300"
    },
]
const Slider = () => {
    let [current, setCurrent] = useState(0);
    // useEffect(()=>{
    //     const clearInter=setInterval(()=>{

    //         setCurrent((prev)=>prev===slider.length-1?0:prev+1)
    //     },3000)
    // return()=>{
    //     clearInterval(clearInter)
    // }
    // },[])
    return (
        <div className='h-[calc(100vh-64px)] overflow-hidden '>
            <div className={` w-max h-full flex  transition-all duration-1000 ease-in `}
                style={{ transform: `translateX(-${current * 100}vw)` }}>
                {
                    slider.map((items) =>


                        <div className={`w-screen h-full flex lg:flex-row flex-col`} key={items.id}>

                            <div className=' lg:w-1/2 w-full  lg:h-full h-1/2 flex justify-center gap-5 items-center flex-col'>
                                <div className="title lg:text-5xl px-5 text-center text-3xl">{items.title}</div>
                                <div className="desc lg:text-4xl px-10 text-center text-2xl">{items.discription}</div>
                                <Link href={items.url} className='hover:bg-zinc-400 transition-all bg-slate-400 py-1 px-3 rounded-md text-white font-semibold'>Learn More</Link>
                            </div>


                            <div className='relative lg:w-1/2 w-full lg:h-full h-1/2'>
                                <Image src={items.img} alt="" fill sizes='100%' className='absolute bg-cover' />
                            </div>

                        </div>

                    )}
            </div>

            <div className='absolute w-full bottom-4 flex justify-center items-center gap-4'>
                {
                    slider.map((circleBtn, index) =>
                        <div key={circleBtn.id} className={`w-3 h-3 rounded-full ring-1 ring-black cursor-pointer flex justify-center items-center ${current === index ? "scale-150" : ""}`}
                            onClick={() => setCurrent(index)}>
                            {current === index ? <div className='w-2 h-2 bg-green-800 rounded-full'></div> : null}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Slider;
