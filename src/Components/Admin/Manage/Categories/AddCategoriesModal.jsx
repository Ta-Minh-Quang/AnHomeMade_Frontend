import React, { useState } from 'react';
import { CategoriesInsert } from '../../../../httpApiClientInterface/ApiCategories';
import {  failedModal, successModal } from '../../../ModalConfirm/ModalAlert';
import { currentPageDefault } from '../../../../Lib/Commomdata';
import Loading from '../../../loading/Loading';

const AddCategories= ({setmodalAddCate, searchCategory})=>{
    const [loading,setLoading] = useState(false)
    const user = JSON.parse(sessionStorage.getItem("UserLogged")) || ""
    const [data,setData] = useState({
        name:"",
        note:"",
        created_By: user.user_Name || "",
        created_Date:new Date() || "",
        modified_By: user.user_Name || "",
        modified_Date:new Date(),
        deleted: 0
    })
    const handleInput=(e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit=()=>{
        if(data.name === "" || data.note === ""){
            failedModal("Điền thông tin vào các trường ")
            return
        }
        setLoading(true)
        var user = JSON.parse(sessionStorage.getItem("UserLogged"))
        const isEmptyObject = (obj) => {
            return Object.keys(obj).length === 0 && obj.constructor === Object;
        }
        let checkEmpty = isEmptyObject(data)
        if(checkEmpty){
            failedModal("Hãy điền đầy đủ")
            setLoading(false)
        }
        else{ 
            CategoriesInsert(data,user.token).then((data)=>{
                if(data>0){
                    successModal("Thêm thành công")
                    setmodalAddCate(false)
                    searchCategory(currentPageDefault)
                }
                else{
                    failedModal("Thêm thất bại")
                }
            })
            setLoading(false)
        }
        
    }
    return (
        <div className='fixed inset-0 flex items-center justify-center'>
            <div className='absolute inset-0 bg-black bg-opacity-40'></div>
            
            <div className='z-50 bg-white rounded-lg shadow-2xl form-add'>
                <div className='flex justify-between p-2 shadow modal-header'>
                    <h3 className='text-2xl font-bold text-center text-red-800'>Thêm danh mục</h3>
                    <div className='p-1 text-right '>
                        <button className='' onClick={()=>setmodalAddCate(false)}>X</button>
                    </div>
                </div>
                <div className='flex flex-col mb-3 overflow-y-scroll modal-body w-[1100px] h-[300px] p-4'>
                    <label htmlFor="" className='mb-2'>Tên danh mục</label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input name='name' onChange={handleInput} type="text" className='w-full text-black bg-transparent outline-none ' placeholder="Hãy nhập tên"/>
                    </div>
                 
                    <label htmlFor="" className='mb-2'>Mô tả</label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <textarea name='note' onChange={handleInput} type="text" className='w-full text-black bg-transparent outline-none ' placeholder="Hãy nhập mô tả"/>
                    </div>

                </div> 
                <div  className='shadow-3xl footer modal-footer'>
                    <div className='p-2 text-right'>
                        <button onClick={handleSubmit} className='right-0 px-5 py-2 mr-1 text-white border rounded-lg bg-[#32CD32]'>{loading ? <Loading></Loading> : "Thêm"}</button>
                        <button className='right-0 px-5 py-2 mr-1 text-white border rounded-lg bg-[#32CD32]' onClick={()=>setmodalAddCate(false)}>Quay lại</button>
                    </div>
                </div>
            </div>
        </div>
             
    )
}

export default AddCategories;


