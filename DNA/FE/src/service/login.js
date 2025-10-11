import axios from "axios";

export const LoginAPI =  (userlogin) => {  return axios.post("/api/auth/login", userlogin)};
export const RegisterAPI =  (userregister) =>  {  return  axios.post("/api/auth/register", userregister,{
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})};
    

export const Logout =(token)=> {
  return axios.post("/api/auth/logout",token);
}

    