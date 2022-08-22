import React from 'react';
import {SwiperSlide,Swiper} from "swiper/react"
import "swiper/css"
import { Link } from 'react-router-dom';
const SlideItem = [
    {
        id:1,
        img:"https://cdn.dribbble.com/users/790924/screenshots/16440843/media/3c1432b30b7e1f1d82f8992715b500c4.jpg?compress=1&resize=1200x900&vertical=top"
    },
    {
        id:2,
        img:"https://cdn.dribbble.com/users/790924/screenshots/16440843/media/244dfaad16c8ac76e6b538fcfee19440.jpg?compress=1&resize=800x600&vertical=top"
    }
]
const Banner = () => {
    return (
        <section className="banner h-[290px] md:h-screen bg-tranparent page-container mb-5 overflow-hidden">
             <Swiper grabCursor={"true"} slidesPerView={"auto"}>
             {SlideItem && SlideItem.length > 0 && SlideItem.map((item)=>{
                 return (
                    <SwiperSlide key={item.id}>
                        <Banneritem  data={item}></Banneritem>
                    </SwiperSlide>
                 )
             })}
               
                
             </Swiper>
        </section>
    );
};

export default Banner;
function Banneritem({data}){
    console.log(data.img)
    return (
        <div className="relative w-full h-full">
            <div className="absolute inset-0   bg-gradient-to-t overlay from-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.4)]"></div>
            <img src={data.img} alt="" className="object-center w-full h-full " />
            <div className="absolute md:w-[50%] w-[80%] md:top-[40%] text-white md:left-1/4 md:-translate-x-1/4 top-[50%] -translate-y-1/4 md:-translate-y-0 text-center md:text-left left-[50%] -translate-x-2/4 ">
                <h2 className="mb-3 text-3xl font-bold md:mb-5 md:text-8xl banner-text">AN_HOMEMADE</h2>
                <div className="flex items-center justify-center mb-4 text-xs md:block md:text-2xl md:mb-8 gap-x-3">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                   </p>
                </div>
                <button className="w-auto shadow-2xl px-6 py-3 md:text-xl font-medium text-white bg-[#D7A86E] rounded-lg " >
                    <Link to="/products">Mua hàng</Link>
                </button>
            </div>
      </div> 
    )
}