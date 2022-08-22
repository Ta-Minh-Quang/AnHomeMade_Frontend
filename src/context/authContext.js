import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
function AuthProvider(props){
    const [userInfo,setUserInfo] = useState({})
    const [active,setActive] = useState(false)
    const value = {userInfo,setUserInfo,active,setActive}
    return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>
}
function useAuth(){
    const context = useContext(AuthContext)
    if(typeof context === "undefined") throw new Error("useAuth must be used within authProvider")
    return context
}
export {AuthProvider,useAuth}