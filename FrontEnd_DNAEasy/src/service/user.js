import api from "./api";

export const GetMyInfor = ()=>
{
return api.get("user/myinfor")
}

export const UpdateInfor = (user) =>{
    return api.post("/user/update",user)
}

export const GetStaffForAppoint = (appointmentId,size,page,keyword)=>{
    return api.get(`/appointment/staffs/${appointmentId}?size=${size}&page=${page}&keyword=${keyword}`)
}

export const UpdateUserRole = (data) => {
  return api.put(`/user/update-user`,data);
};

export const DeleteUser = (userId) => {
  return api.get(`/user/delete/${userId}`);

};

export const GetUserDetails = (userId) => {
  return api.get(`/user/${userId}`);
};
export const ActiveUser=(id)=>{
  return api.get(`/user/active/${id}`)


}
export const ReportUser= ()=>{

  return api.get("/user/count-by-role")
}
export const GetAllUsers = ( page, size, datasearch) => {
  return api.post(`/user/filter?page=${page}&size=${size}`,datasearch)
}
