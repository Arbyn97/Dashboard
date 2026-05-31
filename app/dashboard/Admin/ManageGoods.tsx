'use client'
import React, { useState,useEffect } from "react";

export default function MangeGoods() {
    type Goods={
        goodname:string;
        id:number;
        category:string;
        off:number;
        description:string;
        url:string;
        price:number
    }
    const [editingId, setEditingId] = useState<number | null>(null);
     const [show,setShow]=useState('hidden')
const [goodsList,setGoodsList]=useState<Goods[]>([]);
const [createGood,setCreateGood]=useState<Goods>({
    goodname: "",
  id: 0,
  category: "",
  off: 0,
  description: "",
  url: "",
  price: 0
});
const [visibility,setVisibility]=useState(false)
useEffect(()=>{
    async function Getdata() {
      const res=await fetch("/api/products");
      const data= await res.json();
      setGoodsList(data)

    }
     Getdata();
   
},[])
 const saveProductList=async()=>{
    try{
        const res=await fetch("/api/products",{
            headers: { "Content-Type": "application/json" },
            method:"POST",
            body:JSON.stringify(createGood)
        })
        
        const newItem=await res.json();
        setGoodsList(prev => [...prev, newItem]);
        setCreateGood({} as Goods);
        
    }
   catch(err){
    console.log("error",err)
   }
  

}

//اینجوری نیازی نیست صدتا متغیر تعریف کنیم.
const AddGood=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
const {name,value}=e.target;
if(!value.trim())
{
    alert("لطفا مقادیر فیلدها را پر نمایید")
}
else{
    
    setCreateGood(prev => ({ ...prev,id:goodsList.length+1, [name]: value })); 
}
  
}
const deleteGood=async (id:Number)=>{
      try {
    const res = await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      console.log("Error removing product");
      return;
    }

    // حذف از state
    setGoodsList(prev => prev.filter(item => item.id !== id));
  } catch (err) {
    console.log("error:", err);
  }
    
}
//////ویرایش
  const editProduct=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
   const value=e.target.value;
   const field=e.target.dataset.field as string;
   const id=Number(e.target.dataset.id);
// if(!value.trim())
// {
//   return
// }
// else{
    
    setGoodsList(goodsList.map(good=>good.id===id?{...good,[field]:value}:good))
// }
//    e.target.blur();
//    از حالت فوکوس درمیادinput
  changeProduct(id,field,value)
  
  }
  const changeProduct=async(id:number, field:string, value:string | number)=>{
  
    
   try {
        const res = await fetch("/api/products", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, field, value })
        });

        if (!res.ok) {
            console.log("Error updating product");
        }
    } catch (err) {
        console.log("error:", err);
    }
  }


    return ( 
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          
           
              {goodsList.map((item)=>
              <div className="border-2 border-green-400 p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                   <img/>
                   {/* goodname */}
                <input type="text" value={item.goodname}  data-field="goodname" data-id={item.id} onChange={editProduct} className="border p-2 rounded w-full mb-2"/>
                  <input type="text" value={item.description}  data-id={item.id} data-field="description" onChange={editProduct} className="border p-2 rounded w-full mb-2"/>
                 <input type="text" value={item.off}   data-id={item.id} data-field="Off" onChange={editProduct} className="border p-2 rounded w-full mb-2"/>
                  <input type="text" value={item.price} onChange={editProduct}  data-id={item.id} data-field="price" className="border p-2 rounded w-full mb-2"/>
                <div>
              <button 
                    className="text-red-400 m-3 hover:cursor-pointer hover:text-red-600"
                    onClick={()=>deleteGood(item.id)}>
                     حذف</button>
             
                      </div>
                   

              </div>)} 
            
           
        
        </div>
        <button  onClick={()=>setVisibility(!visibility)}>
                افزودن کالا
        </button>
        {visibility&&<div className="goods flex flex-col border-cyan-400 border-2 p-4 m-3 rounded-lg">
           
           <div>
            <span>نام کالا: </span>
            <input name="goodname" type="text" placeholder="type something..." value={createGood.goodname} onChange={AddGood}/>
           </div>
             <p>قیمت کالا:  </p>
            <input name="price" type="number" placeholder="type something..." value={createGood.price} onChange={AddGood}/>
            
          
             <p>توضیحات کالا:  </p>
             <textarea name="description" placeholder="type something..." value={createGood.description} onChange={AddGood}/>     
         
             <p> تخفیف:</p>
             <input name="off" type="number" placeholder="type something..." value={createGood.off} onChange={AddGood}/>    
             
           
             <p>دسته بندی : </p>
             <input name="category" type="text" placeholder="type something..." value={createGood.category} onChange={AddGood}/>    
             
           
             <p>تصویر :</p>
             {/* <input type="text" placeholder="type something..." value={createGood.url} onChange={AddGood}/>     */}
             
           
            <button className="border-2 border-green-400 rounded-2xl p-2 hover:cursor-pointer" onClick={()=>saveProductList()}>دخیره</button>
            </div>}
        </>
     );
}

