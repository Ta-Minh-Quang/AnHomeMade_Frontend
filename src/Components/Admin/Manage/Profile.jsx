import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({setProfile}) => {
    const userName = JSON.parse(sessionStorage.getItem("UserLogged")) || "";
    const navigate = useNavigate()
    const handleLogout=()=>{
        sessionStorage.clear()
        navigate("/Admin/login")
    }
    return (
        <div className='fixed inset-0 flex items-center justify-center'>
             <div onClick={()=>setProfile(false)} className='absolute inset-0 bg-black bg-opacity-40'></div>
            <div className='form-add  w-[300px] h-[400px]  z-50 bg-white rounded-lg shadow-2xl p-3'>
                <h1 className='mb-10 text-3xl font-semibold text-center text-gray-800'>Quan ly San pham</h1>
                <h3 className='mb-6 text-center text-gray-800'>{userName.user_Name || "anhomemade"}</h3>
                <div className='flex justify-center'>
                     <button onClick={handleLogout} className='w-[100px] py-2 text-white transition-opacity rounded-lg bg-secondColor hover:opacity-80'>Log Out</button>
                </div>
               
            </div>
        </div>
    );
};

export default Profile;