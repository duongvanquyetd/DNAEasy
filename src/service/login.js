import axios from "axios";
export const LoginAPI =  (userlogin) => {  return axios.post("http://localhost:8080/api/auth/login", userlogin)};
export const RegisterAPI =  (userregister) =>  {  return  axios.post("http://localhost:8080/api/auth/register", userregister,{
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})};
    