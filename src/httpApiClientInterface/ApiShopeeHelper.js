import { BaseHttpsService } from '../Lib/Commomdata';
export const GetDetailByIdItemIdshop = async (token,itemId ,shopId) =>{
    let content
    await fetch(`${BaseHttpsService}/api/products/get-by-itemid-shopid?idItem=${itemId}&idShop=${shopId}`,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(res => res.json())
    .then((data) => {
        content = data
        return data
    })
    .catch((e)=>{
        console.log(e)
        return null;
    })
    return content
}