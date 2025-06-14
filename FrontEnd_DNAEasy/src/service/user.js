import api from "./api";

export const  GetMyInfor = ()=>
{
return api.get("user/myinfor")
}

export const UpdateInfor = (user) =>{
    return api.post("/user/update",user)
}