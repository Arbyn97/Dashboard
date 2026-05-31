'use client'
import { useEffect,useState } from "react";
export default  function Home() {
    type Goods={
          goodname:string;
          id:Number;
          category:string;
          off:Number;
          description:string;
          url:string;
          price:Number
      }
  const [goodsList,setGoodsList]=useState<Goods[]>([]);
  useEffect(()=>{
      async function Getdata() {
        const res=await fetch("/api/products");
        const data= await res.json();
        setGoodsList(data)
  
      }
       Getdata();
     
  },[])
  return (
    <div className="grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  border-amber-300 border-2 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {goodsList.map((item)=>
              <div  className="p-10  w-60 felx-2 border-2 border-fuchsia-400 m-5 " >{item.goodname}
             
              </div>)} 
    </div>
  );
}
