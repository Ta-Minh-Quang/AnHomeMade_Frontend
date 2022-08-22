import React from 'react';
import { SwiperSlide , Swiper } from 'swiper/react';
import "swiper/css"
import ProductsCard from './ProductsCard';
import ProductCardSesion from './ProductCardSesion';

var array1 = [1,2,3,4,5,6,7,8,9]
const ProductsList = () => {
    return (
        <div className='product-list'>
           <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
           {array1.map((item,index)=>{
               return (
                <SwiperSlide key={index}>
                    
                </SwiperSlide>
               )
           })}
             
                       
                    
                
           </Swiper>  
        </div>
    );
};

export default ProductsList;