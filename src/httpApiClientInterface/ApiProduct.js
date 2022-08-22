import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { BaseHttpsService } from '../Lib/Commomdata';
export const ProductsInsert = async (token,data) => {
    let _result = -1
    await fetch(`${BaseHttpsService}/api/products/insert`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
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

export const search= async (keySearch,startRow=1,endRow=20,orderBy="")=>{
    console.log(`${BaseHttpsService}/api/products/search?keySearch=${keySearch}&startRow=${startRow}&endRow=${endRow}&orderBy=${orderBy}`)
    let responseSearch
    await fetch(`${BaseHttpsService}/api/products/search?keySearch=${keySearch}&startRow=${startRow}&endRow=${endRow}&orderBy=${orderBy}`)
    .then(res => res.json())
    .then((data) => {
        responseSearch = data
        console.log(data)
        return data 
    })
    .catch((e)=>{
        console.log(e)
        return null;
    })
    return responseSearch
}
export const DeleteItem = async (data,modified_by,token)=>{
        let _result = -1
        await fetch(`${BaseHttpsService}/api/products/delete?id=${data}&modifiedBy=${modified_by}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify()
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
   

export const getDetail = async (id,token)=>{
    let detailList = {}
    await fetch(`${BaseHttpsService}/api/products/get-by-id?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify()
    }) 
    .then(res => res.json())
    .then((data) => {
        detailList=JSON.parse(data.jsonData)
    }).catch((e)=>{console.log(e)})
    return detailList
}
export const productItemEdit= async (data,token)=>{
    let _result = -1
    await fetch(`${BaseHttpsService}/api/products/update`, {
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
        _result = -1101
    })

    return _result
}
export const GetById = async (id)=>{ 
    let responseSearch
    await fetch(`${BaseHttpsService}/api/products/get-by-id?id=${id}`, {
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