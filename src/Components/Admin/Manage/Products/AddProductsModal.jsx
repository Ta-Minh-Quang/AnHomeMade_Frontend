import React, { useEffect, useState } from 'react';
import { GetFromToPaging, GetIdByLinkShopee } from '../../../../Lib/CommondFunction';
import { GetDetailByIdItemIdshop } from '../../../../httpApiClientInterface/ApiShopeeHelper';
import { ProductsInsert, search } from '../../../../httpApiClientInterface/ApiProduct';
import { search as searchCate } from '../../../../httpApiClientInterface/ApiCategories';
import {  failedModal, successModal } from '../../../ModalConfirm/ModalAlert';
import Loading from '../../../loading/Loading';


const AddProducts = ({searchProducts,setTable})=>{
    const [loading,setLoading] = useState(false)
    const [loadingAdd,setLoadingAdd] = useState(false)
    const user = JSON.parse(sessionStorage.getItem("UserLogged"))
    const [categoriyList,setCategoryList] = useState()
  
    const [linkProduct,setlinkProduct] = useState("");
    const [productInfo,setProductInfo] = useState({
        Name:"",
        Origin:"",
        Brand:"",
        Price:0,
        Discount:0,
        Rating_Star:0,
        Created_By:user ? user.user_Name : "",
        Sold:0,
        Stock:0,
        Image:"",
        Images:"",
        Caterogy_Name:" ",
        Category_Id:"",
        Url_Item:""


    })
    const  GetInfoByLink= async (e)=> {
        setLoading(true)
        try{
            let user = JSON.parse(sessionStorage.getItem("UserLogged"))
            let products
            if(linkProduct === ""){
                failedModal("Lấy sản phẩm thất bại")
                setLoading(false)
                return
            }
            var idFromLink = GetIdByLinkShopee(linkProduct);
            await GetDetailByIdItemIdshop(user.token ,idFromLink.itemId, idFromLink.shopId).then((data)=>{
                products = JSON.parse(data.success)
                if(products.Name === null && products.Id === 0){
                    failedModal("Lấy sản phẩm thất bại")
                }
                else{
                    setProductInfo(products)
                    successModal("Lấy sản phẩm thành công")
                }
               
            })
            setLoading(false)
        }catch(err){
            setLoading(false)
           
        }
    }
    const handleChangeValue = (e)=>{   
     
        if(e.target.name === "Caterogy_Name"){
           
            setProductInfo({  
                ...productInfo,
                [e.target.name] :e.target.value,
                Category_Id : parseInt( e.target.options[e.target.selectedIndex].dataset.id )
            })   
        }
        else if(e.target.name === "Price" || e.target.name === "Sold" || e.target.name === "Stock" || e.target.name=== "Discount" || e.target.name === "Rating_Star"){
            setProductInfo({  
                ...productInfo,
                [e.target.name] : parseFloat(e.target.value),
               
            })
        }
        else{
            setProductInfo({  
                
                ...productInfo,
                [e.target.name] :e.target.value,
               
            })
        }
       
    }
    const handleAdddata = ()=>{
        if(productInfo.Origin === null || productInfo.Caterogy_Name === null  || productInfo.Brand=== null){
            failedModal("Điền thông tin vào các trường ")
            return
        }
        setLoadingAdd(true)
        let arrProducts = productInfo;
        arrProducts =Object.fromEntries(
            Object.entries(arrProducts).map((item)=>{
                return item.map((value)=>{
                    if(value === null)
                    return ""
                    return value
                })
            })
        )
        if(arrProducts.Discount > 0){
            arrProducts = {
                ...arrProducts,
                Price:arrProducts.Price * arrProducts.Discount
            }
        }
        arrProducts.Url_Item = linkProduct
        arrProducts.Created_By = user.user_Name
        ProductsInsert(user.token,arrProducts).then((data)=>{
            if(data>0){
                searchProducts(1)
                successModal("Thêm thành công")
                setTable(false)
                setLoadingAdd(false)
            }
            else{
                failedModal("Thêm thất bại")
                setLoadingAdd(false)
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
            <div className='absolute inset-0 bg-black bg-opacity-40' ></div>

             <div className='z-50 bg-white rounded-lg shadow-2xl form-add'>
                <div className='flex justify-between p-2 shadow modal-header'>
                    <h3 className='text-2xl font-bold text-center text-red-800'>Thêm sản phẩm</h3>
                    <div className='p-1 text-right '>
                        <button className='' onClick={()=>setTable(false)}>X</button>
                    </div>
                </div>
                <div className='flex flex-col mb-3 overflow-y-scroll modal-body w-[1100px] h-[500px] p-4'>
                    <label htmlFor="" className='mb-2'>Đặt hàng <span className='text-red-600 '>(*)</span></label>
                    <div className='flex items-center gap-x-3'>
                        <div className='flex-1 px-2 py-3 bg-gray-200 rounded-md'>
                            <input type="text" onChange={(e)=>setlinkProduct(e.target.value)}  name="Name"  className='w-full text-black bg-transparent outline-none ' placeholder="Điền link sản phẩm"/>                  
                        </div>
                        <button onClick={GetInfoByLink} className='right-0 px-5 py-3 text-white border rounded-lg bg-[#32CD32]'>{loading ? <Loading></Loading> : "Lấy thông tin"}</button>
                    </div>
                    <label htmlFor="" className='mb-2'>Danh mục <span className='text-red-600 '>(*)</span></label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                       <select name="Caterogy_Name" id="" className='w-full h-full bg-transparent outline-none' onChange={(e)=>handleChangeValue(e)}>
                            <option data-id=" "></option>
                           {categoriyList && categoriyList.map((item,index)=>{
                            
                               return (
                                   <option key={item.Id} data-id={item.Id} >{item.Name}</option>
                               )
                           })}
                       </select>
                    </div>
                    <label htmlFor="" className='mb-2'>Tên <span className='text-red-600 '>(*)</span></label>
                    <div className='px-2 py-3 mb-2 bg-gray-200 rounded-md'>
                        <input name="Name"  type="text" value={productInfo.Name || ""} onChange={(e)=>handleChangeValue(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Điền tên sản phẩm"/>
                    </div>
                    <label htmlFor="" className='mb-2'>Giá <span className='text-red-600 '>(*)</span></label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input name="Price"  type="text" value={ productInfo.Price || ""} onChange={(e)=>handleChangeValue(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Điền giá sản phẩm"/>
                    </div>
                    
                    <label htmlFor="" className='mb-2'>Giảm giá<span className='text-red-600 '>(*)</span></label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input name='Discount'  type="number" step="0.1" min="0" max="20" value={productInfo.Discount || 0} onChange={(e)=>handleChangeValue(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Dien ten san pham"/>
                    </div>
                    <label htmlFor="" className='mb-2'>Số lượng <span className='text-red-600 '>(*)</span></label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input  name='Stock' type="text"  value={productInfo.Stock || ""} onChange={(e)=>handleChangeValue(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Điền số lượng sản phẩm"/>
                    </div>
                    <label htmlFor="" className='mb-2'>Xuất xứ <span className='text-red-600 '>(*)</span></label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input name="Origin"  type="text" value={productInfo.Origin || ""} onChange={(e)=>handleChangeValue(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Điền xuất xứ sản phẩm"/>
                    </div>
                    <label htmlFor="" className='mb-2'>Hãng <span className='text-red-600 '>(*)</span></label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input name="Brand"  type="text" value={productInfo.Brand || ""} onChange={(e)=>handleChangeValue(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Điền hãng sản phẩm"/>
                    </div>
                    <label htmlFor="" className='mb-2'>Mô tả <span className='text-red-600 '>(*)</span></label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <textarea name='Description'  type="text" value={productInfo.Description || ""} onChange={(e)=>handleChangeValue(e)}   className='w-full h-[200px] text-black bg-transparent outline-none ' placeholder="Điền mô tả sản phẩm"/>
                    </div>
                    
                    
                    <label htmlFor="" className='mb-2'>Số lượng đã bán</label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input name='Sold' type="text" value={productInfo.Sold || ""} onChange={(e)=>handleChangeValue(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Điền số lượng đã bán"/>
                    </div>
                    
                    <label htmlFor="" className='mb-2'>Ảnh bìa</label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input name='Image'  type="text" value={productInfo.Image || ""} onChange={(e)=>handleChangeValue(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Ảnh bìa..."/>
                    </div>
                    <label htmlFor="" className='mb-2'>Ảnh chi tiết</label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input name='Images'  type="text" value={productInfo.Images || ""} onChange={(e)=>handleChangeValue(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Ảnh chi tiết..."/>
                    </div>
                    <label htmlFor="" className='mb-2'>Sao đánh giá</label>
                    <div className='px-2 py-3 bg-gray-200 rounded-md'>
                        <input name='Rating_Star' type="text" value={productInfo.Rating_Star || ""} onChange={(e)=>handleChangeValue(e)}   className='w-full text-black bg-transparent outline-none ' placeholder="Sao đánh giá"/>
                    </div>
                </div>
                <div  className='shadow-3xl footer modal-footer'>
                    <div className='p-2 text-right'>
                        <button onClick={handleAdddata} className='right-0 px-5 py-2 mr-1 text-white border rounded-lg bg-[#32CD32]'>{loadingAdd ? <Loading></Loading> : "Thêm"}</button>
                        <button className='right-0 px-5 py-2 mr-1 text-white border rounded-lg bg-[#32CD32]' onClick={()=>setTable(false)}>Quay lại</button>
                    </div>
                </div>
            </div>     
        </div>
       
    )
}

export default AddProducts;
