'use client'
import { useEffect, useState } from "react"

export default function ManageUsers () {
  const [show,setShow]=useState('hidden')
  type User = {
  id: number;
  name: string;
  age: number;
};
  const [data,setData]=useState<User[]>([]);
  const [searchByCategory,setSearchByCategory]=useState('')
  const [symblN,setSymblN]=useState('')
    const [symblA,setSymblA]=useState('')
  const [Addname,setAddName]=useState('')
  const [AddAge,setAddAge]=useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [editUserName,setEditUserName]=useState('');
  const [editUserAge,setEditUserAge]=useState('');
  const [userID,setUserID]=useState<number>(0)
  const [result,setResult]=useState<User[]>([]);
  const [checknull,setChecknull]=useState<number>(0)
// 

////فراخوانی کل کاربران
useEffect(() => {
  if (typeof window !== 'undefined') {
    const loadData = localStorage.getItem('user');
    if (loadData) {
      try {
        setData(JSON.parse(loadData));
      } catch (err) {
        console.error("خطا در parse داده‌ها:", err);
      }
    }
  }
}, []);
/////حدف کاربر
  const deleteUser=(t:number)=>{
    setData(data.filter(d=>d.id!==t))
  }
  const editUser=(id:number)=>{
   setShow('visible')
   setUserID(id)
  }


  //////ویرایش
  const saveUserChange=()=>{
    if(!editUserName.trim()|| !editUserAge.trim()){
        alert("لطفاً نام و سن را وارد کنید!");
    return; 
    }
    setData(data.map(user=>user.id===userID?{...user,name:editUserName,age:Number(editUserAge)}:user))
  setEditUserAge('');
  setEditUserName('')
  setShow('hidden')
  }
  const sortByname=()=>{
//     ه‌روزرسانی state در React غیرهم‌زمان (asynchronous) هست.
// یعنی بعد از setSortOrder()، مقدار sortOrder بلافاصله تغییر نمی‌کنه.

// پس اگه بعد از setSortOrder() بخوای از sortOrder استفاده کنی (مثل setSymbl(...))،
// مقدار قدیمی رو می‌گیری.
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    //...data     یعنی یه کپی از اراده میگیریم
    const sortedDate=[...data].sort((a,b)=>    sortOrder === 'asc'
      ? a.name.localeCompare(b.name, 'fa')
      : b.name.localeCompare(a.name, 'fa'))
    setData(sortedDate)
     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
     setSymblN(newOrder==='asc'? '↑':'↓')
     //↑ ↓ 
     
  }
  const sortByAge=()=>{
      const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      const sortedData=[...data].sort((a,b)=>sortOrder === 'asc'?a.age-b.age:b.age-a.age)
      setData(sortedData)
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
     setSymblA(newOrder==='asc'? '↑':'↓')
  }
 useEffect(() => {
  if (typeof window !== 'undefined' && data.length > 0) {
    localStorage.setItem('user', JSON.stringify(data));
  }
}, [data]);
///////اضافه کردن کاربر
  const Adduser=()=>{
    if(!Addname.trim()|| !AddAge.trim()){
       alert("لطفاً نام و سن را وارد کنید!");
    return;
    }
    const newUser={
      id:data.length+1,
      name:Addname,
      age:Number(AddAge)
    }
setData([...data,newUser]);
// localStorage.setItem('user',JSON.stringify(data))
setAddName('');
setAddAge('');
if (show){
  setShow('hidden')
}

  }
        const searchItem=(i:string)=>{
          if (!searchByCategory) {
  alert("لطفاً دسته‌بندی جستجو را انتخاب کنید!");
  return;
}
          if (!i.trim()) {
         setResult([]);
         
           return; 
          }
          let searched:any[]=[];
          switch(searchByCategory){
            case 'id':
               searched=data.filter(user=>user.id=== Number(i));
               
              break;
              case 'age':
               searched=data.filter(user=>user.age=== Number(i));
              break;
              case 'name':
               searched=data.filter(user=>user.name.toLowerCase().includes(i.toLowerCase()));
              break;
              default:searched= data;
          }
          if(searched.length>0)  {
              setResult(searched);
              setChecknull(0)
          }
          else{
             setResult([]);
            setChecknull(1)
          }
          
        }
       
    return (  
      <div className="flex  flex-col justify-center m-3 ">
        <div className=" flex flex-row justify-center  items-center">
          <input type="text" className="bg-pink-100 rounded-2xl pl-3 focus:outline-none" onChange={(e)=>searchItem(e.target.value)} placeholder="جستجو"/>
          <select name="category" value={searchByCategory} onChange={(e)=>setSearchByCategory(e.target.value)} >
            <option value="" disabled>جستجو بر اساس</option>
            <option value='name'>
              نام
            </option>
            <option value='age'>
              سن
            </option>
            <option value='id'>
              شناسه
            </option>
          </select>
         
        </div>
        <table className=" text-center  ">
        
          <thead className="border-b-2 border-b-pink-300 ">
            
            <tr>
            <th onClick={()=>sortByname() } className="hover:cursor-pointer">
              {symblN}نام</th>
            <th  onClick={()=>sortByAge()} className="hover:cursor-pointer">
             {symblA} سن</th>
             <th>عملیات</th>
            </tr>
            
          </thead>
          <tbody >
           
{checknull?(
    <tr>
      <td colSpan={3} className="text-gray-500 py-4">
        هیچ موردی یافت نشد
      </td>
    </tr>
  ):(result.length>0?result: data).map((t)=>{
  return<tr key={t.id} >
    <td >{t.name}</td>
    <td>{t.age}</td>
    <td className="flex flex-row gap-2 ">  
        <button onClick={()=>deleteUser(t.id)} className="text-red-400">حذف</button>
    <button onClick={()=>editUser(t.id)} className="text-blue-500">ویرایش</button></td>
    </tr>
    
})}
          <tr>
            <td><input type="text" value={Addname} onFocus={()=>setShow('hidden')} className="w-24 bg-pink-200 rounded-xl m-2" onChange={(e)=>setAddName(e.target.value)}/></td>
            <td><input type="text" value={AddAge} onFocus={()=>setShow('hidden')} className="w-24 bg-pink-200 rounded-xl m-2" onChange={(e)=>setAddAge(e.target.value)}/></td>
            <td><button onClick={()=>Adduser() }>افزودن</button></td>
          </tr>
          </tbody>
        </table>
        <div className={`${show} flex flex-row gap-2 items-center`}>
        نام<input type="text" className="w-24 bg-pink-200 rounded-xl m-2"
        onChange={(e)=>setEditUserName(e.target.value)} value={editUserName}/>
             سن<input type="text" className="w-24 bg-pink-200 rounded-xl m-2"
              onChange={(e)=>setEditUserAge(e.target.value)} value={editUserAge}/>
              <button  className="text-green-500 hover:cursor-pointer" onClick={()=>saveUserChange()}>ذخیره</button>
              <button className="text-red-500 hover:cursor-pointer" onClick={()=>setShow('hidden')}>لفو</button>
        </div>
      </div>
    );
}

