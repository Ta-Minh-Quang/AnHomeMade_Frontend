export const GetFromToPaging = (currentPage,reCordPerPage,toRecord)=>{
    try{
        let _FromRecord = reCordPerPage * (currentPage -1) + 1;
        toRecord = reCordPerPage * currentPage
        return {_FromRecord ,toRecord}
    }
    catch(error){
       console.log(error)
       toRecord = -1
       return -1
    }
}

export const GetIdByLinkShopee = (linkItem)=>{
    try{
        var totalID = linkItem.slice(linkItem.indexOf("-i.") + 3, linkItem.indexOf("?sp_atk")).split('.');
        return {itemId : totalID[1], shopId : totalID[0]}
    }
    catch(error){
       console.log(error)
       return {itemId : 0, shopId : 0}
    }
}