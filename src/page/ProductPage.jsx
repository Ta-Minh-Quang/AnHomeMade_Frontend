import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProductsCard,{ProductCartSkeleton} from '../Components/Products/ProductsCard';
import { search } from '../httpApiClientInterface/ApiProduct';
import { search as searchCate } from '../httpApiClientInterface/ApiCategories';
import { recordPerpage } from '../Lib/Commomdata';
import { GetFromToPaging } from '../Lib/CommondFunction';
import {v4} from "uuid" //lay id random
const ProductPage = () => {
    const [loading,setLoading] = useState(false)
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [totalRows,setTotalRow] = useState(0)
    const [currentPage,setCurrentPage] = useState(1)
    const [products,setProducts]=useState([])
    const [keysearch,setKeySearch] = useState({
        name:"",
        brand:"",
        category_id:"",
        startus:"",
        min_price:"",
        max_price:""
    })
  
    const [categories,setCategories] = useState()
    const [categorieOption,setCategotieOption] = useState("")
    const searchProducts = (currentPage,keysearch = {})=>{
        var toRecord = 0
        let pageInfor = GetFromToPaging(currentPage,recordPerpage,toRecord)
        toRecord = pageInfor.toRecord
        let fromRecord = pageInfor._FromRecord
        let keySearch = Object.values(keysearch).join('|');
        search(keySearch,fromRecord,toRecord).then((data)=>{
            setTotalRow(data.totalRows)
            setProducts([...JSON.parse(data.jsonData)])
            setLoading(true)
        })      
    }
    useEffect(()=>{
        searchProducts(currentPage,keysearch)
    },[keysearch,currentPage])
    useEffect(()=>{
        searchCate("","","").then((data)=>{
            setCategories([...JSON.parse(data.jsonData)])
        })
    },[])
    useEffect(()=>{
        document.title = "Danh sách sản phẩm"
    },[])
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
      const handleSearchNorMal=(e)=>{
          if(e.key === "Enter"){
          
            setKeySearch({
                 ...keysearch,
                 name:e.target.value
             })
          }

      }
      const handleChangeCateOption = (e)=>{
        console.log(e.target.value)
        if(e.target.value === "Tùy Chọn"){
            setKeySearch({
                ...keysearch,
                category_id:""
            })
        }
        else{
            setKeySearch({
                ...keysearch,
                category_id:e.target.value
            })
        }
        
      }
      const handleChangePrice = (e)=>{
        switch(e.target.value){
            case "Dưới 100.000đ":
                {
                    setKeySearch({
                        ...keysearch,
                        min_price:0,
                        max_price:100000
                    })
                    break
                }
            case "100.000đ-500.000đ":
                {
                    setKeySearch({
                        ...keysearch,
                        min_price:100000,
                        max_price:500000
                    })
                    break
                }
            case "Trên 500.000đ":
                    {
                        setKeySearch({
                            ...keysearch,
                            min_price:500000,
                            max_price:null
                        })
                        break
                    }
            default:
                {
                    setKeySearch({
                        ...keysearch,
                        min_price:null,
                        max_price:null
                    })
                    break
                }
        }
      }
    return (
        <div className='w-full lg:max-w-[1280px] max-w-[400px] sm:max-w-[680px] flex md:flex-row flex-col mx-auto mb-[60px] text-center'>
            <div className='flex flex-col gap-5 px-5 mb-10 md:p-0'>
                <div className='flex items-center text-sm  h-[20px] items-center gap-5'>
                    <input type="text" className={` text-sm flex-1 h-full md:block bg-transparent outline-none w-full"} `} placeholder="Tìm kiếm...." onKeyDown={handleSearchNorMal} />
                    <span className='cursor-pointer' >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                </div>
                <div className='w-full h-[1px] bg-[#eee]'></div>
                <select name="" id="" className='outline-none' onChange={(e)=>handleChangeCateOption(e)}>
                    <option>Tùy Chọn</option>
                    {categories && categories.length > 0 && categories.map((item)=>{
                        return (
                            <option value={item.Id} key={item.Id} dataid={item.id}>{item.Name}</option>
                            
                            
                        )
                    })}
                </select> 
                <div className='w-full h-[1px] bg-[#eee]'></div>
                <div className='flex flex-col gap-3'>
                <label  className='flex items-center gap-5'>
                        <input type="radio" name='price' value="Tất cả" onChange={(e)=>handleChangePrice(e)}/>
                        <span>Tất cả</span>
                    
                    </label>
                    <label  className='flex items-center gap-5'>
                        <input type="radio" name='price' value="Dưới 100.000đ" onChange={(e)=>handleChangePrice(e)}/>
                        <span>Dưới 100.000đ</span>
                    
                    </label>
                    <label className='flex items-center gap-5'>
                        <input type="radio"  name='price' value="100.000đ-500.000đ"  onChange={(e)=>handleChangePrice(e)}/>
                        <span>100.000đ-500.000đ</span>
                    </label>
                    <label className='flex items-center gap-5' >
                        <input type="radio" name="price" value="Trên 500.000đ"  onChange={(e)=>handleChangePrice(e)}/>
                        <span>Trên 500.000đ</span>
                    </label>
                </div>
            </div>
            <div className='flex-1 px-10'>
                <div className='grid grid-cols-1 gap-6 mb-20 lg:grid-cols-3 sm:grid-cols-2'>
                {!loading && new Array(Number(recordPerpage)).fill(0).map(()=>{
                        return (
                            <ProductCartSkeleton key={v4()}></ProductCartSkeleton>
                        )
                })}
                {loading && products.length > 0 && products.map((item)=>{
                    return(
                        <ProductsCard key={item.Id} item={item}></ProductsCard>
                    )    
                })}
                </div>
                <div className="p-1 m-3">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< Prev"
                        renderOnZeroPageCount={null}
                        className="pagination user"
                        
                    />
                </div>
            </div>
           
        </div>
    );
};

export default ProductPage;

