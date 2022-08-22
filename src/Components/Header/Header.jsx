import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Menu from '../Menu/Menu';

const Header = () => {
    const location = useLocation();
    const checkLocate = location.pathname === "/";
    const [show,setShow] = useState(false)
    const [search,setSearch] = useState(true)
    const [scroll,setScroll] = useState(false)
    useEffect(()=>{
      const scrollEvent = () =>{
        if(window.scrollY > 0){
          setScroll(true)
        }
        else{
          setScroll(false)
        }
      }
      window.addEventListener('scroll',scrollEvent)
      return ()=>{
        window.removeEventListener('scroll',scrollEvent)
      }
    })
    return (
        <div className={`top-0 z-50 text-sm transition-colors duration-300 flex items-center justify-between w-full   p-4  uppercase ${checkLocate ? "fixed text-white" : "relative text-black border bg-white mb-20"} ${scroll && location.pathname === "/" ? "bg-[#B0A171] shadow-2xl rounded-b-2xl" : "bg-transparent"}`} >
              <Link to="/">
                <div className="flex items-center gap-x-4">
                
                <img className="w-10 h-10" src="/Img/logo.png" alt="" />
                <h3 className='hidden  md:block'>AN_HOMEMADE</h3>

              </div>
              </Link>  
            
            <Menu show={show} checkLocate={checkLocate} setShow={setShow}></Menu>
            <div className='block ml-3 cursor-pointer md:hidden' onClick={()=>setShow(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
            </div>  
        </div>
    );
};

export default Header;