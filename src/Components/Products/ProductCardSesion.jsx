import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {search} from '../../httpApiClientInterface/ApiProduct'
const ProductSesionList = ({products}) => {
    return (
        <div className='md:grid md:grid-cols-4  hidden grid-cols-1 sm:grid-cols-2 mx-10 gap-y-5 lg:mx-0 lg:h-[360px] mb-20 gap-x-4'>
        {products && products.length > 0 && products.slice(0,4).map((item)=>{
            return (
                <ProductSesionItem key={item.Id} item={item}></ProductSesionItem>
            )
        })}
        </div>
       
    );
};

export default ProductSesionList;
const ProductSesionItem = ({item})=>{
    const navigate = useNavigate();
    return (
        <div className='relative overflow-hidden transition-all border shadow-2xl cursor-pointer select-none group product-card'>
            <div className="absolute inset-0 z-3  bg-gradient-to-t overlay from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.2)]"></div>
            <div className='w-full h-full'>
                <img src={`https://cf.shopee.vn/file/${item.Image}?fbclid=${item.Image}`} className="object-contain"/>
            </div> 
            <div className='absolute inset-0 transition-all opacity-0 group-hover:opacity-100 '>
                <button onClick={()=>navigate(`/products/${item.Id}`)} className="absolute z-20 p-4 text-white rounded-lg -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 bg-secondColor">Xem sản phẩm</button>
                <div className="w-full h-full bg-black bg-opacity-40 "></div>
            
            </div>
        </div>
    )
}