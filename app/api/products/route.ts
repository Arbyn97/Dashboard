import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

//                                جایی که فایل json قرار داره
const filepath=path.join(process.cwd(),'app','lib','data.json');
//         مسیر اصلی پروژه رو برمیگردونه






////خواندن فایل json 
//و تبدیل آن به فایل متنی به صورت ارایه جاوااسکریپت
function readData(){
    const data=fs.readFileSync(filepath,'utf-8');
    return JSON.parse(data);
}

////نوشتن داده ها
function writeData(data:any){
    fs.writeFileSync(filepath,JSON.stringify(data,null,2))
}

///دریافت کالاها
export async function GET(){
    const products=readData();
    return NextResponse.json(products)
}

export async function POST(req:Request) {
  const body = await req.json();
  const products = readData(); 

  // ذخیره در آرایه
  products.push(body);
writeData(products);  
  // باید حتماً JSON برگردانی
  return NextResponse.json(body);
}


export async function DELETE(req: Request) {
  const { id } = await req.json();

  const data = JSON.parse(fs.readFileSync(filepath, "utf8"));

  const newList = data.filter((item: any) => item.id !== id);

  fs.writeFileSync(filepath, JSON.stringify(newList, null, 2));

  return NextResponse.json({ message: "deleted", id });
}


export async function PUT(req: Request) {
  const { id, field, value } = await req.json();
  const products = readData();

  const index = products.findIndex((p: any) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  products[index][field] = value;
  writeData(products);

  return NextResponse.json(products[index]);
}