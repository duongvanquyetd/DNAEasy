import api from "./api";
export const CreateHardResult =(hardresult)=>
{
    return api.post("/hardresult/create",hardresult)
}

export const CanConfirm =(hardresultid)=>{
    return api.get(`/hardresult/canconfirm/${hardresultid}`)
}

export const  UpdateHardResult = (hardresult)=>{
    return api.post("/hardresult/update",hardresult)
}