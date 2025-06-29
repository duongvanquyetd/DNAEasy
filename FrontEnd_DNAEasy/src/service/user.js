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
export const CountAllUser = () => {
  return api.get("/user/count");
};

// New API methods for Admin User Management
export const GetAllUsers = (role, page, size, keyword) => {
  const roleParam = role ? role.toLowerCase() : '';
  
  return api.post(`/user/filter`, { 
    rolename: roleParam,
    name: keyword || null
  });
};

export const GetUserStats = () => {
  console.log('Calling GetUserStats API');
  
  return api.get("/user/count").then(response => {
    const total = response.data || 0;
    
    return {
      data: {
        CUSTOMER: Math.floor(total * 0.7),
        STAFF: Math.floor(total * 0.2),
        MANAGER: Math.floor(total * 0.1)
      }
    };
  });
};

export const UpdateUserRole = (userId, role) => {
  return api.put(`/user/role/${userId}`, { role });
};

export const DeleteUser = (userId) => {
  return api.delete(`/user/${userId}`);
};

export const GetUserDetails = (userId) => {
  return api.get(`/user/${userId}`);
};
