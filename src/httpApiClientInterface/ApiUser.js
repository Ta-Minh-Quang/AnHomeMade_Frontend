import md5 from "md5";
import {BaseHttpsService} from "../Lib/Commomdata"
export const login = async ({userName,Password})=>{
    let UserInfo
    var PasswordDecript = md5(userName + Password);
    await fetch(`${BaseHttpsService}/api/users/do-login?username=${userName}&password=${PasswordDecript}`)
    .then(res => res.json())
    .then((data) => {   
       UserInfo = data      
    })
    .catch((e)=>{
        console.log(e) 
    })
    
    return UserInfo
}
