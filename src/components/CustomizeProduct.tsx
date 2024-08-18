"use client"
import { products } from '@wix/stores';
import React, { useEffect, useState } from 'react'
import Add from './Add';
const CustomizeProduct = (
    {   productId, productVariants, productOptions }
        :
        {
            productId:any,
            productVariants: products.Variant[],
            productOptions: products.ProductOption[]
        }
) => {
    // console.log(productVariants)

    const isVarientInStock = (choices: { [key: string]: string }) => {
        return productVariants.some((varient) => {
            const varientChoice = varient.choices;
            if (!varientChoice) return false;

            return (
                Object.entries(choices).every(
                    ([key, value]) => varientChoice[key] === value
                ) && varient.stock?.inStock && (
                    varient.stock.quantity && varient.stock.quantity > 0
                )
            );
        });
    };

    let [selectOption, setSelectOption] = useState<{ [key: string]: string; }>({});
    let [selectedVarient,setSelectedVarient]=useState<products.Variant>();

    useEffect(()=>{
        const varient=productVariants.find((v)=>{
            const varientChoice=v.choices;
            if(!varientChoice) return false;
            return Object.entries(selectOption).every(([key,value])=>varientChoice[key]===value);
        });
        setSelectedVarient(varient);
    },[selectOption,productVariants])

    const handleOptionSelected = (optionType: string, choice: string) => {
        setSelectOption(prev => ({ ...prev, [optionType]: choice }))
    }
    return (
        <div className=' p-2 h-fit mt-2 w-full bg-slate-300'>

            <div className='space-y-3 '>
                {
                    productOptions.map((option) =>
                        <div key={option.name} className=''>
                            <h2 className='text-2xl font-semibold text-red-700 '>{option.name}</h2>
                            <div className='flex gap-3'>

                           
                            {
                                
                                
                                option.choices?.map((choice) => {
                            
                                    let disabled = !isVarientInStock({ ...selectOption, [option.name!]: choice.description! });
                                    let handlerClick=disabled?
                                    undefined:()=>handleOptionSelected(option.name!,choice.description!)
                                    let selected = selectOption[option.name!] === choice.description
                                
                                    return option.name === "Color" ? (


                                            <div className={`relative w-8 h-8 rounded-full  cursor-pointer`}
                                                style={{border:selected?"2px solid black":""}}
                                            >
                                                <div className='w-6 h-6 rounded-full absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%]'
                                                    style={{ backgroundColor: choice.description,cursor:disabled?"not-allowed":"pointer" ,
                                                }} 
                                                    onClick={handlerClick}></div>
                       {disabled && <div className='w-9 h-1 transform rotate-45 bg-red-600 absolute top-1/2 -translate-x-[2px] -translate-y-[2px]'></div>}

                                            </div>



                                        // <div key={choice.description}
                                        // className='cursor-pointer bg-slate-300 mt-2' 
                                        // onClick={()=>handleOptionSelected(option.name!,choice.description!)}>
                                        // {choice.description}
                                        // {disabled && "disabled"}
                                        // {selected && "selected"}
                                        // </div>

                                        
                                    ) 
                                
                                    : (
                                        <span className='w-fit py-1 px-3 rounded-md text-emerald-50 font-medium text-sm'
                                        style={{cursor:disabled?"not-allowed":"pointer",backgroundColor:disabled?
                                        "#666":selected?"lime":"#222"}}
                                    onClick={handlerClick} >
                                            {choice.description}
                                        </span>

                                    
                                    )
                                })}
                                 </div>
                        </div>
                    )}
            </div>
            <Add productId={productId} variantId={selectedVarient?._id ||
                 "0000000000000000000"}
                  stockNumbers={selectedVarient?.stock?.quantity || 0} />
            {/* <div className="colors flex flex-col gap-4  p-2">
                <h2 className='text-2xl font-semibold text-red-700'>Colours</h2>
                <div className='flex gap-3'>

                    <div className='relative w-8 h-8 rounded-full ring-1 ring-black cursor-pointer'>
                        <div className='w-6 h-6 bg-red-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%]'></div>
                    </div>
                    <div className='relative w-8 h-8 rounded-full cursor-pointer'>
                        <div className='w-6 h-6 bg-blue-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%]'></div>
                    </div>
                    <div className='relative w-8 h-8 rounded-full bg-green-500 cursor-not-allowed'>
                        <div className='w-9 h-1 transform rotate-45 bg-black absolute top-1/2 -translate-x-[2px] -translate-y-[2px]'></div>
                    </div>
                </div>
            </div>

            <div className="sizes flex flex-col gap-4 mt-4 p-2">
                <h2 className='text-2xl font-semibold text-red-700'>Sizes</h2>
                <div className='flex gap-4 p-2'>
                    <span className='w-fit py-1 px-3 rounded-md text-emerald-50 font-medium text-sm bg-green-400 ring-1 ring-zinc-400 cursor-pointer'>Small</span>
                    <span className='w-fit py-1 px-3 rounded-md text-indigo-300 font-medium text-sm ring-1 ring-zinc-400 bg-red-200 cursor-not-allowed disabled:bg-red-200 disabled:text-green-100'>Medium</span>
                    <span className='w-fit py-1 px-3 rounded-md text-white font-medium text-sm bg-zinc-700  ring-1 ring-zinc-400 cursor-pointer'>Large</span>
                </div>
            </div> */}
        </div>
    )
}

export default CustomizeProduct;