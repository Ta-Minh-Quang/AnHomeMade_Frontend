
import { confirmAlert } from 'react-confirm-alert';
import {  failedModal, successModal } from './ModalAlert';

export const modalConfirm = (ApiFunction,data,token,success,failed) => {
    confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>
              <h1>Bạn có chắc muốn xóa trường này?</h1>
              <div>
                <button className='btn-accept' onClick={() => {
                    ApiFunction(data,token).then((data)=>{
                      if(data > 0){
                        successModal(success)     
                      }
                      else{
                        failedModal(failed)
                      }
                    })
                  onClose()
                }}>Đồng ý</button>
                <button className='btn-reject' onClick={onClose}>Hủy</button>
              </div>
            </div> 
          
          )
        }
    })
};

