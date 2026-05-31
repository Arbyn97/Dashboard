
import Navbar from "./Navbar";
export default function Dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return ( 
        <>
        <div className="dashboard">
        
        
       <Navbar/>
        
       
        <div className="dynamicContent">
          dynamic content
        </div>
        layout dasboard
          {/* // اگر در فایل layout.tsx فراموش کرده باشی children رو رندر کنی، محتوای صفحه (page.tsx) هرگز نمایش داده نمی‌شه. */}
          <div>{children}</div>
          </div>
        </>
     );
}

