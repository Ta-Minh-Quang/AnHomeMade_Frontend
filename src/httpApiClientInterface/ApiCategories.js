import { BaseHttpsService } from '../Lib/Commomdata';
import 'react-confirm-alert/src/react-confirm-alert.css' 

export const  CategoriesInsert = async (data,token)=>{
    let _result = -1
    await fetch(`${BaseHttpsService}/api/categories/insert`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then((data) => {
        _result = data.success  
    }).catch((e)=>{
        console.log(e)
        _result = -1101
    })
    return _result
}
export const DeleteItem = async (id,modified_by,token)=>{ 
        let _result = -1
        await fetch(`${BaseHttpsService}/api/categories/delete?id=${id}&modifiedBy=${modified_by}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
        }) 
        .then(res => res.json()).then((data) => {
            _result = data.success
        }).catch((e)=>{
            console.log(e)
            _result = -1101
       
        })
    return _result
}

export const GetById = async (id)=>{ 
    let responseSearch
    await fetch(`${BaseHttpsService}/api/categories/get-by-id?id=${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }) 
    .then(res => res.json())
    .then((data) => {
        responseSearch = data
    }).catch((e)=>{
        console.log(e) 
    })
    return responseSearch
}

   
export const search= async (keySearch,startRow,endRow,orderBy="")=>{
    let responseSearch
    await fetch(`${BaseHttpsService}/api/categories/search?keySearch=${keySearch}&startRow=${startRow}&endRow=${endRow}&orderBy=${orderBy}`)
    .then(res => res.json())
    .then((data) => {
        responseSearch = data
        return data   
    })
    .catch((e)=>{
        console.log(e)
        return null;
    })
    return responseSearch
}

export const categoriesItemEdit= async (data,token)=>{
    let _result = -1
    await fetch(`${BaseHttpsService}/api/categories/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }) 
    .then(res => res.json())
    .then((data) => {
        _result = data.success
    }).catch((e)=>{
        console.log(e)
        _result = -1101
   })
    return _result
}