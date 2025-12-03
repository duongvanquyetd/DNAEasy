import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL
export const LoginAPI =  (userlogin) => {  return axios.post(baseUrl+"/auth/login", userlogin)};
export const RegisterAPI =  (userregister) =>  {  return  axios.post(baseUrl+"/auth/register", userregister,{
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})};
    

export const Logout =(token)=> {
  return axios.post(baseUrl+"/auth/logout",token);
}

    