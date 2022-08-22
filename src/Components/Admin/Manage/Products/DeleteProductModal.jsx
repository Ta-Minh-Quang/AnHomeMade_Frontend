import React from 'react';
import { DeleteItem } from '../../../../httpApiClientInterface/ApiProduct';
import {  failedModal, successModal } from '../../../ModalConfirm/ModalAlert';
const DeleteProductModal = ({setDeleteModal, pro_Id, searchProducts}) => {
    const DeletePro=()=>{
        var user = JSON.parse(sessionStorage.getItem("UserLogged"))

        DeleteItem(pro_Id, user.user_Name, user.token).then((success)=>{
            if(success > 0){
                setDeleteModal(false)
                searchProducts(1)
                successModal("Xóa sản phẩm thành công!")
            }
            else{
                failedModal("Xóa sản phẩm thất bại!")
            }
        })
    }
    return (
        <div className='fixed inset-0 flex items-center justify-center'>
        <div className='absolute inset-0 bg-black bg-opacity-40'></div>
        <div className='z-50 bg-white rounded-lg shadow-2xl form-add'>
            <div className='flex justify-between p-2 modal-header'>
                <h3 className='text-2xl font-bold text-center text-red-800'>Cảnh báo!</h3>
                <div className='p-1 text-right '>
                    <button className='' onClick={()=>setDeleteModal(false)}>X</button>
                </div>
            </div>
            <div className='flex flex-col mb-3 modal-body p-4'>
            <p>Bạn có chắc nhắn muốn xóa sản phẩm này?</p>
            </div> 
            <div  className='footer modal-footer'>
                <div className='p-2 text-right'>
                    <button onClick={DeletePro} className='right-0 px-5 py-2 mr-1 text-white border rounded-lg bg-[#32CD32]'>Đồng ý</button>
                    <button className='right-0 px-5 py-2 mr-1 text-white border rounded-lg bg-[#32CD32]' onClick={()=>setDeleteModal(false)}>Hủy</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default DeleteProductModal;