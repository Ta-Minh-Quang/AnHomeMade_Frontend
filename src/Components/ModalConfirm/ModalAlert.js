import { toast } from "react-toastify"

export const successModal = (success)=>{
    toast.success(success,{
        pauseOnHover:false,
        delay:0
    })      
}
export const failedModal = (failed)=>{
    toast.error(failed,{
        pauseOnHover:false,
        delay:0
    })
}