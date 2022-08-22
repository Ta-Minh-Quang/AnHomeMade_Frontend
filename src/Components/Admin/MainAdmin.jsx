import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainAdmin = () => {
    const navigate = useNavigate()
    const user = JSON.parse(sessionStorage.getItem("UserLogged"))
    useEffect(()=>{
        document.title = "Trang chủ"
        if(!user){
            navigate("/Admin/login")
        }
    },[])
    return (
        <div>
            
        </div>
    );
};

export default MainAdmin;