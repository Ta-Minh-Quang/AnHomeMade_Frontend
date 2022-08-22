import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import CategoryBox from './Categories/CategoryBox';
import ProductsBox from './Products/ProductsBox';
import Profile from './Profile';

const ContentManage = () => {
    const userName = JSON.parse(sessionStorage.getItem("UserLogged"));
    const [products,setProducts] = useState(true)
    const [profile,setProfile] = useState(false)
    return (
        <div className='relative w-full h-screen'>
            <div className={`top-0 right-0 left-0 w-full flex items-center justify-between px-3 text-[#36454F] bg-white border shadow-lg `}>
                <div className="flex items-center mb-1 gap-x-4">                 
                    <ul className='flex items-center'>
                        <NavLink   className={ ({isActive}) => (isActive ? "text-white bg-secondColor px-3 py-2 text-lg font-semibold border-r cursor-pointer hover:opacity-70" : "px-3 py-2 text-lg font-semibold border-r cursor-pointer hover:opacity-70")} to="/Admin/home">Trang chủ</NavLink>
                        <NavLink   className={ ({isActive}) => (isActive ? "text-white bg-secondColor px-3 py-2 text-lg font-semibold border-r cursor-pointer hover:opacity-70" : "px-3 py-2 text-lg font-semibold border-r cursor-pointer hover:opacity-70")} to="/Admin/products">Sản phẩm</NavLink>
                        <NavLink  className={ ({isActive}) => (isActive ? "text-white bg-secondColor px-3 py-2 text-lg font-semibold border-r cursor-pointer hover:opacity-70" : "px-3 py-2 text-lg font-semibold border-r cursor-pointer hover:opacity-70")} to="/Admin/category">Danh Mục</NavLink>
                        <li onClick={()=>setProfile(true)}  className='px-3 py-2 text-lg font-semibold border-r cursor-pointer hover:opacity-70'>Thông tin</li>
                    </ul>  
                </div>
                 <div className='flex items-center gap-x-3'> 
                    <img className="w-10 h-10" src="/Img/logo.png" alt="" />
                    <h3 className='text-black '>AN_HOMEMADE</h3>
                 </div>
               
            </div>
            <Outlet></Outlet>
            {/* {products ?  <ProductsBox show={show} setShow={setShow}></ProductsBox> : <CategoryBox show={show} setShow={setShow}></CategoryBox>} */}
            {profile ? <Profile setProfile={setProfile} ></Profile> : null}
        </div>
    );
};

export default ContentManage;