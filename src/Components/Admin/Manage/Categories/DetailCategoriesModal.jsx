import React, { useState } from 'react';

const DetailCategories = ({setDetailModal, category_Info}) => {

    const [data,setData] = useState(JSON.parse(category_Info))
    return (
//         
        <div className='fixed inset-0 flex items-center justify-center'>
            <div className='absolute inset-0 bg-black bg-opacity-40'></div>
            
            <div className='z-50 bg-white rounded-lg shadow-2xl form-add'>
                <div className='flex justify-between p-2 shadow modal-header'>
                    <h3 className='text-2xl font-bold text-center text-red-800'>Thông tin chi tiết</h3>
                    <div className='p-1 text-right '>
                        <button className='' onClick={()=>setDetailModal(false)}>X</button>
                    </div>
                </div>
                <div className='flex flex-col mb-3 overflow-y-scroll modal-body w-[1100px] h-[300px] p-4'>
                    <label htmlFor="" className='mb-2'>Tên danh mục</label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input readOnly name='Name' value={data.Name || ""}   type="text"  className='w-full text-black bg-transparent outline-none ' placeholder="Tên danh mục"/>
                    </div>
                 
                    <label htmlFor="" className='mb-2'>Mô tả</label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <textarea readOnly  name='Note'  value={data.Note || ""}   type="text"  className='w-full text-black bg-transparent outline-none ' placeholder="Mô tả"/>
                    </div>
                    <label htmlFor="" className='mb-2'>Người tạo</label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input readOnly  name='Name' value={data.Created_By || ""}   type="text"  className='w-full text-black bg-transparent outline-none ' placeholder="Người tạo"/>
                    </div>
                    <label htmlFor="" className='mb-2'>Ngày tạo</label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input readOnly name='Name' value={new Date(data.Created_Date).toLocaleDateString()|| ""}   type="text"  className='w-full text-black bg-transparent outline-none ' placeholder="Ngày tạo"/>
                    </div>
                    <label htmlFor="" className='mb-2'>Người sửa</label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input readOnly name='Name' value={data.Modified_By || ""}   type="text"  className='w-full text-black bg-transparent outline-none ' placeholder="Người sửa"/>
                    </div>
                    <label htmlFor="" className='mb-2'>Ngày sửa</label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input readOnly name='Name' value={new Date(data.Modified_Date).toLocaleDateString() || ""}   type="text"  className='w-full text-black bg-transparent outline-none ' placeholder="Ngày sửa"/>
                    </div>

                </div> 
                <div  className='shadow-3xl footer modal-footer'>
                    <div className='p-2 text-right'>
                        <button className='right-0 px-5 py-2 mr-1 text-white border rounded-lg bg-secondColor' onClick={()=>setDetailModal(false)}>Thoát</button>
                    </div>
                </div>
            </div>
        </div>

   
    );
};

export default DetailCategories;