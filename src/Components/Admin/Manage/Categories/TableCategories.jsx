import React, {  useEffect, useState } from 'react';
import { search, GetById } from '../../../../httpApiClientInterface/ApiCategories';
import { recordPerpage, currentPageDefault } from '../../../../Lib/Commomdata';
import { GetFromToPaging } from '../../../../Lib/CommondFunction';
import DetailCategoryModal from './DetailCategoriesModal';
import EditCategoryModal from './EditCategoriesModal';
import DeleteCategoryModal from './DeleteCategoryModal';
import AddCategories from './AddCategoriesModal';
import {BookOpenIcon, TrashIcon,PencilAltIcon} from "@heroicons/react/outline"

import ReactPaginate from 'react-paginate';

const TableCategories = ({}) => {
    //paging param
    const [currentPage,setCurrentPage] = useState(currentPageDefault)
    console.log(currentPage)
    const [pageCount, setPageCount] = useState(0);
    const [totalRows,setTotalRow] = useState(0)
    const [itemOffset, setItemOffset] = useState(0);
    //modal
    const [modalAddCate,setmodalAddCate] = useState(false)
    const [detailModal,setDetailModal] = useState(false)
    const [editModal,setEditModal] = useState(false)
    const [deleteModal,setDeleteModal] = useState(false)
    const [tempCategoryInfo,setTempCategoryInfo] = useState({})

    //search param
    const [keysearch,setKeySearch] = useState("")
    const [categories,setCategories]=useState([])


    const searchCategory = (currentPage)=>{
        var toRecord = 0
        let pageInfor = GetFromToPaging(currentPage,recordPerpage,toRecord)
        toRecord = pageInfor.toRecord
        let fromRecord = pageInfor._FromRecord
        search(keysearch,fromRecord,toRecord).then((data)=>{
            setTotalRow(data.totalRows)
            setCategories([...JSON.parse(data.jsonData )])
        })      
    }
    useEffect(()=>{
        document.title = "Danh mục"
    },[])
    useEffect(()=>{     
        searchCategory(currentPage);
    },[currentPage])
    
    const handleInput = (e)=>{
        setKeySearch(e.target.value)
    }

    const ChangePage = async (event) => {
        const newOffset = (event.selected * recordPerpage) % totalRows;
        setItemOffset(newOffset);
        setCurrentPage(event.selected + 1)
      };

    useEffect(() => {
        const endOffset = itemOffset + recordPerpage;
        setPageCount(Math.ceil(totalRows / recordPerpage));
    }, [totalRows, itemOffset]);
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        searchCategory(currentPageDefault)
    }
    return (
        <div>
         <div className='flex gap-2 p-2 mt-3 bg-white border rounded-lg shadow'>
             <form className='flex flex-wrap items-center'>
                <div className='flex items-center gap-x-3'>
                    <span>Tên</span>
                    <input onChange={handleInput} type="text" placeholder='Tim kiem' className='p-1 border rounded-lg border-mainColor' />
                </div>
                <div className='flex items-center '>  
                    <button onClick={handleSubmit} className='px-2 py-1 mx-2 text-sm text-white rounded-lg bg-[#32CD32]'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </form>
            <button className='px-4 py-2 mx-2 text-sm text-white rounded-lg bg-[#32CD32]' onClick={()=>setmodalAddCate(true)}>Thêm mới</button>
            
         </div>
            

            <div className='mt-4 bg-white border rounded-lg shadow'>
                <div className='h-full overflow-x-auto'>
                    <table className='min-w-full border-b table-auto '>
                        <thead className='bg-gray-100 border-b '>
                            <tr>
                                <th className='px-6 py-4 text-sm font-medium text-left text-gray-900'>STT</th>
                                <th className='px-6 py-4 text-sm font-medium text-left text-gray-900'>Tên</th>
                                <th className='px-6 py-4 text-sm font-medium text-left text-gray-900'>Mô tả</th>
                                <th className='px-6 py-4 text-sm font-medium text-left text-gray-900'>Người tạo</th>
                                <th className='px-6 py-4 text-sm font-medium text-left text-gray-900'>Ngày tạo</th>
                                <th className='px-6 py-4 text-sm font-medium text-left text-gray-900'>Chức năng</th>
                            </tr>
                        </thead>
                            <TableBody setTempCategoryInfo={setTempCategoryInfo} listData={categories} setEditModal={setEditModal} setDetailModal={setDetailModal} setDeleteModal={setDeleteModal}></TableBody>
                    </table>
                    {modalAddCate ? <AddCategories searchCategory={searchCategory} setmodalAddCate={setmodalAddCate}></AddCategories> : null}
                    {detailModal ? <DetailCategoryModal setDetailModal={setDetailModal} category_Info={tempCategoryInfo}></DetailCategoryModal> : null}
                    {editModal ? <EditCategoryModal searchCategory={searchCategory} category_Info={tempCategoryInfo} setEditModal={setEditModal}></EditCategoryModal> : null}   
                    {deleteModal ? <DeleteCategoryModal searchCategory={searchCategory} cate_Id={tempCategoryInfo.Id} setDeleteModal={setDeleteModal}></DeleteCategoryModal> : null}           
                </div>
            
            <div className="p-1 m-3">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={ChangePage}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={""}
                    className="pagination"
                />
            </div>
            </div>
        </div>
    );
};
export default TableCategories;

const TableBody = ({listData,setTempCategoryInfo,setDetailModal,setEditModal,setDeleteModal})=>{
    const showModalDetail=(cate_Id)=>{
        GetById(cate_Id).then((respone)=>{
            setTempCategoryInfo(respone.jsonData)
            setDetailModal(true)
        })  
    }
    const showModalEdit = (cate_Id)=>{
        GetById(cate_Id).then((respone)=>{
            setTempCategoryInfo(respone.jsonData )
            setEditModal(true)
        }) 
    }

    const showModalDelete = (cate_Id)=>{
        setTempCategoryInfo({
            Id : cate_Id
        })
        
        setDeleteModal(true)
    }
  
    return (
      <tbody>
          {listData && listData.length > 0 && listData.map((item,index)=>{
                return (
                    <tr className="bg-white border-b cursor-pointer hover:bg-gray-100" key={item.Id}>
                        <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">{item.STT}</td>
                        <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">{item.Name}</td>
                        <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">{item.Note || ""}</td>
                        <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">{item.Created_By}</td>
                        <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">{new Date(item.Created_Date ).toLocaleDateString()}</td>
                        <td className="flex justify-start px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap gap-x-2">
                            <button className='text-secondColor' onClick={()=>showModalDetail(item.Id)}>         
                               <BookOpenIcon className='w-6 h-6'></BookOpenIcon>
                            </button>
                            <button className='text-green-500' onClick={()=>showModalEdit(item.Id)}>
                                <PencilAltIcon className='w-6 h-6'></PencilAltIcon>
                            </button>
                            <button className='text-red-500' onClick={()=>showModalDelete(item.Id)}>
                                <TrashIcon className='w-6 h-6'></TrashIcon>
                            </button>
                        </td>
                    </tr>
                  
                )
                
          })}
    
              
      </tbody>
    )
}