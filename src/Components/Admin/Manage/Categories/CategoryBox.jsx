import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableCategories from './TableCategories';
const CategoryBox = ({show,setShow}) => {
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
                <div>
                    <div className='px-5 py-3'>
                    <h3 className='pb-3 text-2xl font-semibold text-left text-red-800'>Quản lý danh mục</h3>
                        <div>
                            <TableCategories></TableCategories>
                        </div>
                    </div>
                </div>
            </div>
           

        </div>
    );
};

export default CategoryBox;
