import React, { useState } from 'react';
import { categoriesItemEdit } from '../../../../httpApiClientInterface/ApiCategories';
import {  failedModal, successModal } from '../../../ModalConfirm/ModalAlert';
import { currentPageDefault } from '../../../../Lib/Commomdata';
import Loading from '../../../loading/Loading';


const EditCategories = ({setEditModal,category_Info,searchCategory}) => {
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState(JSON.parse(category_Info))
    const handleEdit = (e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }

    const handleEditApi=()=>{
        if(data.name === "" || data.note === ""){
            failedModal("Điền thông tin vào các trường ")
            return
        }
        setLoading(true)
        const user = JSON.parse(sessionStorage.getItem("UserLogged"))
       
        setData({
            ...data,
            Modified_By : user.user_Name,
            Modified_Date : new Date()
        })
        const isEmptyObject = (obj) => {
            return Object.keys(obj).length === 0 && obj.constructor === Object;
        }
        
        let checkEmpty = isEmptyObject(data)
        if(checkEmpty){
            setLoading(false)
            failedModal("Hãy điền đầy đủ")
        }
        else{
                categoriesItemEdit(data,user.token).then((data)=>{
                    if(data > 0){
                        setEditModal(false)
                        searchCategory(currentPageDefault)
                        successModal("Chỉnh sửa thành công!")
                    }
                    else{
                        failedModal("Chỉnh sửa thất bại!")
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
                    <h3 className='text-2xl font-bold text-center text-red-800'>Cập nhật danh mục</h3>
                    <div className='p-1 text-right '>
                        <button className='' onClick={()=>setEditModal(false)}>X</button>
                    </div>
                </div>
                <div className='flex flex-col mb-3 overflow-y-scroll modal-body w-[1100px] h-[300px] p-4'>
                    <label htmlFor="" className='mb-2'>Tên danh mục</label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input onChange={handleEdit} name='Name' value={data.Name || ""}   type="text"  className='w-full text-black bg-transparent outline-none ' placeholder="Tên danh mục"/>
                    </div>
                 
                    <label htmlFor="" className='mb-2'>Mô tả</label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <textarea onChange={handleEdit} name='Note'  value={data.Note || ""}   type="text"  className='w-full text-black bg-transparent outline-none ' placeholder="Mô tả"/>
                    </div>

                </div> 
                <div  className='shadow-3xl footer modal-footer'>
                    <div className='p-2 text-right'>
                        <button onClick={handleEditApi} className='right-0 px-5 py-2 mr-1 text-white border rounded-lg bg-[#32CD32]'>{loading ? <Loading></Loading> : "Lưu"}</button>
                        <button className='right-0 px-5 py-2 mr-1 text-white border rounded-lg bg-[#32CD32]' onClick={()=>setEditModal(false)}>Quay lại</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCategories;