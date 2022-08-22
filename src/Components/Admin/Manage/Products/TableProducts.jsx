import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getDetail, DeleteItem, search, GetById } from '../../../../httpApiClientInterface/ApiProduct';
import { recordPerpage } from '../../../../Lib/Commomdata';
import { GetFromToPaging } from '../../../../Lib/CommondFunction';
import DetailProducts from './DetailProductsModal';
import EditProduct from './EditProductModal';
import { search as searchCate } from '../../../../httpApiClientInterface/ApiCategories';
import { modalConfirm } from '../../../ModalConfirm/ModalConfirm';
import {BookOpenIcon, TrashIcon,PencilAltIcon} from "@heroicons/react/outline"
import AddProducts from './AddProductsModal';
import DeleteProductModal from './DeleteProductModal';
const TableProducts = () => {
    const [totalRows,setTotalRow] = useState(0)
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage,setCurrentPage] = useState(1)
    const [categoriyList,setCategoryList] = useState()
    //
    const [table,setTable] = useState(false)
    const [detailModal,setDetailModal] = useState(false)
    const [deleteModal,setDeleteModal] = useState(false)
    const [editModal,setEditModal] = useState(false)
    const [tempProductInfo, setTempProductInfo] = useState({})
    const [keysearch,setKeySearch] = useState({
        name:"",
        brand:"",
        category_id:"",
        startus:"",
        min_price:"",
        max_price:""
    })
    const [products,setProducts]=useState([])
    const searchProducts = (currentPage)=>{
        var toRecord = 0
        let pageInfor = GetFromToPaging(currentPage,recordPerpage,toRecord)
        toRecord = pageInfor.toRecord
        let fromRecord = pageInfor._FromRecord
        let keySearch = Object.values(keysearch).join('|');
        search(keySearch,fromRecord,toRecord).then((data)=>{
            setTotalRow(data.totalRows)
            setProducts([...JSON.parse(data.jsonData)])
        })      
    }
    const handleInput =(e)=>{
        if(e.target.name === "category_id"){
            if(e.target.value === "[Tất cả]"){
                setKeySearch({
                    ...keysearch,
                    [e.target.name]:" "
                })
            }
            else{
                setKeySearch({
                    ...keysearch,
                    [e.target.name]: parseInt( e.target.options[e.target.selectedIndex].dataset.id )
                })
            }
        }
       else{
        setKeySearch({
            ...keysearch,
            [e.target.name]:e.target.value
        })
       }
       
        
    }
    useEffect(()=>{
        document.title = "Sản phẩm"
    },[])
    useEffect(()=>{       
        searchProducts(currentPage);
    },[currentPage])
    const handlePageClick = (event) => {
        const newOffset = (event.selected * recordPerpage) % totalRows;
        setItemOffset(newOffset);
        setCurrentPage(event.selected + 1)
      };
      useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + recordPerpage;
        setPageCount(Math.ceil(totalRows / recordPerpage));

        
      }, [totalRows, recordPerpage]);
    
    useEffect(()=>{
        searchCate("","","").then((data)=>{
            setCategoryList([...JSON.parse(data.jsonData )])
        })      
    },[])
    const handleSubmit = (e)=>{
       
        e.preventDefault()
        searchProducts(1)

    }
    return (
        <div>
        <div className='flex p-2 mt-3 bg-white border rounded-lg shadow'>
            <form className='flex flex-wrap items-center gap-4'>
                <div className='flex flex-row items-center gap-x-3 '>
                    <span>Tên</span>
                    <input onChange={handleInput} name="name"  type="text" placeholder='Tên sp' className='p-1 border rounded-lg border-mainColor' />
                </div>
                <div className='flex flex-row items-center gap-x-3'>
                    <span>Hãng</span>
                    <input name="brand"  onChange={handleInput} type="text" placeholder='Hãng' className='p-1 border rounded-lg border-mainColor' />
                </div>
                <div className='flex flex-row items-center gap-x-3'>
                    <span>Danh mục</span>
                    <select name="category_id" id="" className='p-1 border rounded-lg border-mainColor'  onChange={(e)=>handleInput(e)} placeholder='--Danh mục--'>
                            <option key={-1} data-id={''} >[Tất cả]</option>
                           {categoriyList && categoriyList.map((item,index)=>{
                               return (
                                   <option key={item.Id} data-id={item.Id} >{item.Name}</option>
                               )
                           })}
                       </select>
                </div>
                {/* <div className='flex flex-row items-center gap-x-3'>
                    <span>Trạng thái</span>
                    <select name="Caterogy_Name" id="" className='p-1 border rounded-lg border-mainColor' onChange={(e)=>handleInput(e)} placeholder='--Danh mục--'>
                            <option key={-1} data-id={''} >[Tất cả]</option>
                            <option key={2} data-id={'N'} >Còn hàng</option>
                            <option key={3} data-id={'Y'} >Hết hàng</option>
                       </select>
                </div> */}
                <div className='flex flex-row items-center gap-x-3'>
                    <span>Giá từ</span>
                    <input  name="min_price"   onChange={handleInput}  type="text" placeholder='vnđ' className='p-1 border rounded-lg border-mainColor' />
                </div>
                <div className='flex flex-row items-center gap-x-3'>
                    <span>Đến</span>
                    <input name="max_price" type="text"  onChange={handleInput} placeholder='vnđ' className='p-1 border rounded-lg border-mainColor' />
                </div>
                <div className='flex items-center '>   
                    <button className='px-2 py-2 mx-2 text-sm text-white rounded-lg bg-[#32CD32]' onClick={handleSubmit}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <span className='px-3 py-2 mx-2 cursor-pointer text-white rounded-lg bg-[#32CD32]' onClick={()=>setTable(true)}>Thêm mới</span>
                </div>
            </form>
        </div>
        <div className='mt-4 bg-white border rounded-lg shadow'>
            <div className='h-full overflow-x-auto'>
                <table className='min-w-full border-b table-auto '>
                    <thead  className='bg-gray-100 border-b '>
                        <tr className='border-b '>
                            <th className='px-6 py-4 text-sm font-medium text-center text-gray-900'>STT</th>
                            <th className='px-6 py-4 text-sm font-medium text-gray-900'>Tên</th>
                            <th className='px-6 py-4 text-sm font-medium text-gray-900'>Nguồn gốc</th>
                            <th className='px-6 py-4 text-sm font-medium text-gray-900'>Giá</th>
                            <th className='px-6 py-4 text-sm font-medium text-gray-900'>Đánh giá</th>
                            <th className='px-6 py-4 text-sm font-medium text-gray-900'>Người tạo</th>
                            <th className='px-6 py-4 text-sm font-medium text-gray-900'>Ngày tạo</th>
                            <th className='px-6 py-4 text-sm font-medium text-gray-900'>Chức năng</th>
                        </tr>
                    </thead>
                        <TableItems setDeleteModal={setDeleteModal}  searchProducts={searchProducts}  setTempProductInfo={setTempProductInfo} setEditModal={setEditModal} setDetailModal={setDetailModal} listData={products} ></TableItems>        
                    
                </table>
                {detailModal ? <DetailProducts setDetailModal={setDetailModal} tempProductInfo={tempProductInfo}></DetailProducts> : null}
                {editModal ?  <EditProduct   searchProducts = {searchProducts} setEditModal={setEditModal} tempProductInfo={tempProductInfo} products={products} ></EditProduct> : null}
                {table ? <AddProducts  searchProducts={searchProducts} setTable={setTable}></AddProducts> : null}      
                {deleteModal ? <DeleteProductModal searchProducts={searchProducts} pro_Id={tempProductInfo.Id} setDeleteModal={setDeleteModal}></DeleteProductModal> : null}                
            </div>
            <div className="p-1 m-3">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    className="pagination"
                />
            </div>
        </div>
        </div>
    );
};
export default TableProducts;

const TableItems = ({listData, setTempProductInfo,setDetailModal,setEditModal,searchProducts,setDeleteModal})=>{
    let dollarVnLocale = Intl.NumberFormat('en-VN');
    const user = JSON.parse(sessionStorage.getItem("UserLogged"))
    const token = user ? user.token : ""
    const showModalDetail=(pro_id)=>{
        GetById(pro_id).then((response)=>{
            setTempProductInfo(response.jsonData)
             setDetailModal(true)
        })

        
    }
    const showModalEdit = (pro_id)=>{
        GetById(pro_id).then((response)=>{
            setTempProductInfo(response.jsonData)
            setEditModal(true)
        })
        
    }
    const showModalDel = (pro_Id)=>{
        setTempProductInfo({
            Id : pro_Id
        })
        setDeleteModal(true)
    }
    return (
        <>
        <tbody>
          {listData && listData.length > 0 && listData.map((item,index)=>{
                return (
                    <tr className="bg-white border-b cursor-pointer hover:bg-gray-100" key={item.Id}>
                        <th className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap w-18">{item.STT}</th>
                        <th className="px-6 py-4 text-sm font-light text-left text-gray-900 whitespace-nowrap w-50">{item.Name}</th>
                        <th className="px-6 py-4 text-sm font-light text-left text-gray-900 whitespace-nowrap">{item.Origin || ""}</th>
                        <th className="px-6 py-4 text-sm font-light text-left text-gray-900 whitespace-nowrap">{dollarVnLocale.format(item.Price)}</th>
                        <th className="px-6 py-4 text-sm font-light text-left text-gray-900 whitespace-nowrap">{item.Rating_Star}</th>
                        <th className="px-6 py-4 text-sm font-light text-left text-gray-900 whitespace-nowrap">{item.Created_By}</th>
                        <th className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">{new Date(item.Created_Date).toLocaleDateString()}</th>
                        <th className="flex justify-center px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap gap-x-2">
                            <button className='text-secondColor' onClick={()=>showModalDetail(item.Id)}>
                                <BookOpenIcon className='w-6 h-6'></BookOpenIcon>
                            </button>
                            <button className='text-red-500' onClick={()=>showModalDel(item.Id)}>
                                <TrashIcon className='w-6 h-6'></TrashIcon>
                            </button>
                            <button className='text-green-500' onClick={()=>showModalEdit(item.Id)}>         
                                <PencilAltIcon className='w-6 h-6'></PencilAltIcon>
                            </button>
                        </th>
                    </tr>
                )
                
          })}
      </tbody>
        </>
   
    )
}