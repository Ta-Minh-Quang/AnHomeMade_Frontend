import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSkeleton from '../loading/LoadingSeleton';

const ProductsCard = ({item}) => {
    let dollarVnLocale = Intl.NumberFormat('en-VN');
    const navigate = useNavigate();
    if(!item){
        return
    }
    return (
        <div  onClick={()=>navigate(`/products/${item.Id}`)} className='flex flex-col border  p-3 transition-all mb-10  bg-white rounded-lg cursor-pointer select-none product-card hover:shadow-2xl'>
            <div>
                <img src={`https://cf.shopee.vn/file/${item.Image}?fbclid=${item.Image}`}/>
            </div> 
            <div className='flex flex-col flex-1 p-3'>
                <h3 className='mb-3  text-lg font-bold text-black truncate ...'>{item.Name}</h3>
                <div className='flex justify-between'>
                    <span className='block text-center text-black'>{dollarVnLocale.format(item.Price)} ₫</span>
                    <span className='block text-center text-black'>Đã bán: {item.Sold}</span>
                </div>
                 {/* <button className='w-full py-2 text-white transition-opacity rounded-lg bg-secondColor hover:opacity-80 flex-1'>Xem</button> */}      
            </div>
        </div>
    );
};

export default ProductsCard;

export const ProductCartSkeleton = ()=>{
    return (
        <div className='flex flex-col border  p-3 transition-all mb-10  bg-[main-color] rounded-lg cursor-pointer select-none product-card hover:shadow-2xl'>
        <div>
            <LoadingSkeleton width="100%" height="200px"></LoadingSkeleton>
        </div> 
        <div className='flex flex-col flex-1 p-3'>
            <h3 className='mb-3  text-lg font-bold text-black truncate ...'>
                <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton> 
            </h3>
            <div className='flex justify-between'>
                <span className='block text-center text-black'>
                    <LoadingSkeleton width="50px" height="20px"></LoadingSkeleton>
                </span>
                <span className='block text-center text-black'>
                    <LoadingSkeleton width="30px" height="20px"></LoadingSkeleton>
                </span>
            </div>
            
        
           
        </div>
    </div>
    )
}