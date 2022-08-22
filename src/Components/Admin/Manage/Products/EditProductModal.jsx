import React, { useEffect, useState } from 'react';
import { productItemEdit } from '../../../../httpApiClientInterface/ApiProduct';
import { search as searchCate } from '../../../../httpApiClientInterface/ApiCategories';
import { failedModal, successModal } from '../../../ModalConfirm/ModalAlert';
import Loading from '../../../loading/Loading';

const EditProduct = ({setEditModal,tempProductInfo,searchProducts}) => {
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState(JSON.parse(tempProductInfo))
    const [categoriyList,setCategoryList] = useState()
    const handleEditProducts = (e)=>{        
        if(e.target.name === "Price"){
            setData({
                ...data, 
                [e.target.name]:parseFloat(e.target.value)?parseFloat(e.target.value): 0})     
        }
        else if(e.target.name === "Rating_Star"){
            setData({
                ...data, 
                [e.target.name]:parseInt(e.target.value)?parseFloat(e.target.value): 0})     
        }
        else{
            setData({
                ...data, 
                [e.target.name]:e.target.value})   
        }
        
    }
    const  handleEditdata = ()=>{
        if(data.Origin === null || data.Caterogy_Name === null ||  data.Brand === null){
            failedModal("Điền thông tin vào các trường ")
            return
        }
        setLoading(true)
        if(parseFloat(data.Discount) !== 0){
            const newPrice = parseFloat(data.Discount)*data.Price
            setData({
                ...data, 
                Price:newPrice,
                Discount:parseFloat(data.Discount)}
        )}
        const user = JSON.parse(sessionStorage.getItem("UserLogged"))
        let arrProducts = data;
        arrProducts = Object.fromEntries(
            Object.entries(arrProducts).map((item)=>{
                return item.map((value)=>{
                    if(value === null)
                    return " "
                    return value
                })
            })
        )
        productItemEdit(arrProducts,user.token).then((success)=>{
            if(success > 0)
            {
               successModal("Cập nhật sản phẩm thành công! ")
                setEditModal(false)
                searchProducts(1)
                setLoading(false)
            }else{
                failedModal("Cập nhật sản phẩm không thành công!")
                setLoading(false)
            }
        })
    } 

    useEffect(()=>{
        searchCate("","","").then((data)=>{
            setCategoryList([...JSON.parse(data.jsonData )])
        })      
    },[])
    return (
        <div className='fixed inset-0 flex items-center justify-center'>
            <div className='absolute inset-0 bg-black bg-opacity-40'></div>

             <div className='z-50 bg-white rounded-lg shadow-2xl form-add'>
                <div className='flex justify-between p-2 shadow modal-header'>
                    <h3 className='text-2xl font-bold text-center text-red-800'>Cập nhật</h3>
                    <div className='p-1 text-right '>
                        <button className='' onClick={()=>setEditModal(false)}>X</button>
                    </div>
                </div>
                <div className='flex flex-col mb-3 overflow-y-scroll modal-body w-[1100px] h-[500px] p-4'>
                    <label htmlFor="" className='mb-2'>Danh mục <span className='text-red-600 '>(*)</span></label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                       <select name="Caterogy_Name" id="" className='w-full h-full bg-transparent outline-none' onChange={(e)=>handleEditProducts(e)}>
                           {categoriyList && categoriyList.map((item,index)=>{
                               return (
                                   <option key={item.Id} data-id={item.Id} >{item.Name}</option>
                               )
                           })}
                       </select>
                    </div>
                    <label htmlFor="" className='mb-2'>Tên SP <span className='text-red-600 '>(*)</span></label>
                    <div className='px-2 py-3 mb-2 bg-gray-200 rounded-md'>
                        <input name="Name"  type="text" value={data.Name} onChange={(e)=>handleEditProducts(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Dien ten san pham"/>
                    </div>
                    <label htmlFor="" className='mb-2'>Giá <span className='text-red-600 '>(*)</span></label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input name="Price"  type="text" value={data.Price} onChange={(e)=>handleEditProducts(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Dien ten san pham"/>
                    </div>
                    
                    <label htmlFor="" className='mb-2'>Giảm giá<span className='text-red-600 '>(*)</span></label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input name='Discount'  type="text" value={data.Discount} onChange={(e)=>handleEditProducts(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Dien ten san pham"/>
                    </div>
                    <label htmlFor="" className='mb-2'>Số lượng <span className='text-red-600 '>(*)</span></label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input  name='Stock' type="text" value={data.Stock} onChange={(e)=>handleEditProducts(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Dien ten san pham"/>
                    </div>
                    <label htmlFor="" className='mb-2'>Xuất xứ <span className='text-red-600 '>(*)</span></label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input name="Origin"  type="text" value={data.Origin} onChange={(e)=>handleEditProducts(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Dien ten san pham"/>
                    </div>
                    <label htmlFor="" className='mb-2'>Hãng <span className='text-red-600 '>(*)</span></label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input name="Brand"  type="text" value={data.Brand} onChange={(e)=>handleEditProducts(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Dien ten san pham"/>
                    </div>
                    <label htmlFor="" className='mb-2'>Mô tả <span className='text-red-600 '>(*)</span></label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <textarea name='Description'  type="text" value={data.Description} onChange={(e)=>handleEditProducts(e)}   className='w-full h-[200px] text-black bg-transparent outline-none ' placeholder="Dien ten san pham"/>
                    </div>
                    
                    <label htmlFor="" className='mb-2'>Số bán</label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input name='Sold' type="text" value={data.Sold} onChange={(e)=>handleEditProducts(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Dien ten san pham"/>
                    </div>
                    
                    <label htmlFor="" className='mb-2'>Sao đánh giá</label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input name='Rating_Star' type="text" value={data.Rating_Star} onChange={(e)=>handleEditProducts(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Dien ten san pham"/>
                    </div>
                </div>
                <div  className='shadow-3xl footer modal-footer'>
                    <div className='p-2 text-right'>
                        <button onClick={handleEditdata} className='right-0 px-5 py-2 mr-1 text-white border rounded-lg bg-[#32CD32]'>{loading ? <Loading></Loading> : "Lưu"}</button>
                        <button className='right-0 px-5 py-2 mr-1 text-white border rounded-lg bg-[#32CD32]' onClick={()=>setEditModal(false)}>Quay lại</button>
                    </div>
                </div>
            </div>     
        </div>
    );
};

export default EditProduct;