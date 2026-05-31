"use client"
import { useState,useEffect } from "react";
import DarkMode from "./DarkMode";
export default function Navbar() {
    const [time,setTime]=useState(new Date())
    useEffect(()=>{
 const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer); // پاک کردن تایمر هنگام خروج از کامپوننت
    },[])
    return (  
        <div className="navbar">
            <span>user name(amin,customers,...)
           {time.toLocaleString("fa-IR")}</span> 
          {/* چون سمت کلاینت میخوایم اجرا بشه و هر ثانیه باید تغییر کنه
          اگر قرار بود زمان ورود رو نمایش بدیم این کار رو باید موقع ساخته شدن صفحه در سمت سرور انجام میدادیم */}
       
       <DarkMode/>
        </div>
    );
}

