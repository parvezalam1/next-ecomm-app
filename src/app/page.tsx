
import CategoryList from "@/components/CategoryList"
import ProductList from "@/components/ProductList"
import Slider from "@/components/Slider"
import { useWixClient } from "@/hooks/useWixClient"
import { wixClientServer } from "@/liberary/wixClientServer"
import { Suspense, useEffect } from "react"
const HomePage = async() => {

  // useEffect(()=>{
  //   const getProducts=async()=>{
  //     const items  = await wixClient.products.queryProducts().find();

  //   }
  //   getProducts();
  // },[wixClient])
  return (
    <div className='w-full '>
      <Slider />
      <h1 className='container mx-auto py-3 px-10 text-blue-500 font-extrabold lg:text-3xl text-xl'>Featured Products</h1>
<Suspense fallback={"loading"}>
      <ProductList categoryId={"fb03995e-c3a4-2fbc-262d-0ef20cbdac14"} limit={3} />
</Suspense>
<Suspense>

      <CategoryList />
</Suspense>
      <h1 className='container mx-auto py-2 px-10 bg-slate-200 text-fuchsia-400 text-3xl font-extrabold'>New Products List</h1>
    <ProductList categoryId={"fb03995e-c3a4-2fbc-262d-0ef20cbdac14"} />
    </div>
  )
}

export default HomePage