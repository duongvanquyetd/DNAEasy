import api from "./api";

export const  GetMyInfor = ()=>
{
return api.get("user/myinfor")
}

export const UpdateInfor = (user) =>{
    return api.post("/user/update",user)
}

export const GetStaffForAppoint = (appointmentId,size,page,keyword)=>{
    return api.get(`/appointment/staffs/${appointmentId}?size=`+size+"&page="+page+"&keyword="+keyword)
}