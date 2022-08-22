import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../httpApiClientInterface/ApiUser';
import { useAuth } from '../../../context/authContext';
import Loading from '../../loading/Loading';
import { toast } from 'react-toastify';



const Form = ({setisLoggedIn}) => {
    const [loading,setLoading] = useState(false)  
    const {active,setActive} = useAuth()
    const [userName,setUserName] = useState("");//anhomemade
    const [Password,setPassword] = useState("");//3184728e9eda3f101c39f3ebc65730c7(admin)
    const [check,setCheck] = useState(false)
    const navigate = useNavigate();
    const submitLogin = (e) => {
        setLoading(true)
        e.preventDefault()
        login({userName,Password}).then((user)=>{
            setLoading(false)
            if(user !== undefined){
                if(user.user_Name !== null ){       
                    setCheck(false)
                    setisLoggedIn(true)
                     navigate('/admin/home'); 
                    //lưu người dùng sau khi đăng nhập thành công
                    sessionStorage.setItem("UserLogged", JSON.stringify(user));  
                    
                    toast.success("Đăng nhập thành công!",{
                        pauseOnHover:false,
                        delay:0
                    })            
                }else{
                    setisLoggedIn(false)
                    toast.error("Sai tài khoản hoặc mật khẩu!",{
                        pauseOnHover:false,
                        delay:0
                    })
                    setCheck(true)   
                }
            }else{
                toast.error("Lỗi đăng nhập không thành công!",{
                    pauseOnHover:false,
                    delay:0
                })
            }
            
        })
    }
    
    return (
        <div className='flex items-center justify-center h-screen justif bg-gradient-to-r from-purple-500 to-pink-500'>
            <div  className = "w-[300px] p-3  bg-white rounded-lg shadow-2xl">
                 <form onSubmit={submitLogin} action="" className='p-3'>
                    <h3 className='mb-4 text-2xl font-semibold'>Đăng nhập</h3>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="" className='mb-1 text-sm'>Tài khoản</label>
                        <div className='bg-gray-200 rounded-md'>
                            <input type="text" placeholder='Nhập tài khoản'  onChange={(e)=>setUserName(e.target.value)} className="p-2 text-sm bg-transparent outline-none"/>
                        </div>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="" className='mb-1 text-sm'>Mật khẩu</label>
                        <div className='bg-gray-200 rounded-md'>
                            <input type="password"  placeholder='Nhập mật khẩu' onChange={(e)=>setPassword(e.target.value)} className="p-2 text-sm bg-transparent outline-none"/>
                        </div>
                    </div>
                    <div>
                        <button className='w-full py-2 text-white transition-opacity rounded-lg bg-secondColor hover:opacity-80'>
                            {loading ? <Loading></Loading> : "LOGIN"}
                        </button>
                    </div>
                </form>
            </div>
               
        </div>
    );
};

export default Form;

