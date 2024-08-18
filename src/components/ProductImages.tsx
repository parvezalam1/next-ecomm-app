"use client"
import React, { useState } from 'react'
import Image from 'next/image';
export default  function ProductImages({item}:{item:any}) {
    // let images = [
    //     {
    //         id: 1,
    //         url: "https://images.pexels.com/photos/26629241/pexels-photo-26629241/free-photo-of-a-black-and-white-photo-of-a-store-front.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    //     },
    //     {
    //         id: 2,
    //         url: "https://images.pexels.com/photos/19607905/pexels-photo-19607905/free-photo-of-photos-and-insta-camera-on-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    //     },
    //     {
    //         id: 3,
    //         url: "https://images.pexels.com/photos/18306795/pexels-photo-18306795/free-photo-of-bottles-with-water-and-flower-near-curtain.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    //     },
    // ]
    let [urlIndex, setUrlIndex] = useState(1);

    return (

        <div className='md:w-1/2 w-full h-fit flex flex-col gap-3'>
            <div className='relative h-[370px]  w-full sm:mt-1 mt-5'>
                <Image src={item[urlIndex].image.url} alt='' fill className='object-fill rounded-xl' />
            </div>
            <div className='overflow-hidden '>
                <div className='flex justify-between gap-4 mt-2 overflow-x-scroll' id='product-images'>
                    {
                        item.map((items:any, index:number) =>
                            <div className='relative shrink-0 sm:w-40 sm:h-36 w-32 h-28 cursor-pointer' onClick={(() => setUrlIndex(index))} key={items._id}>

                                <Image src={items.image.url} alt='' fill className='rounded-md ' />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
