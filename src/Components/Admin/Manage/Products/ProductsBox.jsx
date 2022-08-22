import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddProducts from './AddProductsModal';
import TableProducts from './TableProducts';

const ProductsBox = ({show,setShow}) => {
    const navigate = useNavigate()
    const user = JSON.parse(sessionStorage.getItem("UserLogged"))
    useEffect(()=>{
        if(!user){
            navigate("/Admin/login")
        }
    },[])
    return (
        <div className="p-5 bg-gray-50">
            <div>
                <div className='px-5 py-3'>
                    <h3 className='pb-3 text-2xl font-semibold text-left text-red-800'>Quản lý sản phẩm</h3>
                    <div >
                        <TableProducts></TableProducts>    
                    </div>
                </div>
            </div>
            
        </div>
    );
};


export default ProductsBox;

