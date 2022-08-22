import React from 'react';
import { Link } from 'react-router-dom';
const MenuContent = [
    {
        id:1,
        title:"Trang chủ",
        path:"/"
    },
    {
        id:2,
        title:"Sản Phẩm",
        path:"/products"
    },
    {
        id:3,
        title:"AN_HOMEMADE",
        path:"/products"
    }

]
const Menu = ({show,setShow,checkLocate }) => {
    return (
        <div className={`${show ? "" : "hidden"} md:block`}>
            <div className={`fixed inset-0 z-20 bg-black bg-opacity-30 block md:hidden`}  onClick={()=>setShow(false)}></div>

            <div className={`fixed top-0 right-0 md:relative bg-white   md:bg-transparent  z-30 bottom-0 md:p-0 px-5 py-8 w-[40%] md:w-auto ${checkLocate ? "md:text-white" :"md:text-black"}`}>
                <div className='z-30 block text-right text-black cursor-pointer md:hidden'  onClick={()=>setShow(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </div>
                <ul className='flex flex-col justify-between mt-8 md:items-center gap-y-4 md:gap-y-0 gap-x-6 md:flex-row md:mt-0'>
                    {MenuContent && MenuContent.length > 0 && MenuContent.map((item)=>{
                        return (
                            <Link to={item.path} key={item.id}  className='text-sm cursor-pointer md:text-sm'>{item.title}</Link>
                        )
                    })}  
                </ul> 
            </div>
            
        </div>
    );
};

export default Menu;