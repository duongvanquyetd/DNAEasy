import axios from 'axios';
import api from './api';
const baseUrl = import.meta.env.VITE_API_URL
export const GetALlServies = () => {
    return axios.get(baseUrl+'/service');
}
export const getServiceById = (id) => {
    return axios.get(baseUrl+`/service/${id}`);
}

export const SearchAndGet = (search,page,size,active,sortcolumn,modesort) => {
    return axios.post(baseUrl+`/service/search?size=${size}&page=${page}&active=${active}&sortcolumn=${sortcolumn}&sortmode=${modesort}`,search);
}

export const CreateService = (serviceData) => {
    return api.post("/service/create",serviceData)
}

export const UpdateService = (id, serviceData) => {
    return api.put(`/service/update/${id}`, serviceData);
}

export const DeleteService = (id) => {
    return  api.delete(`/service/delete/${id}`)
}
export const Report=()=>{
    return api.get('/service/report')
}
export const ActiveSerive=(id)=>{

    return api.post(`/service/active/${id}`)
}
export const ServiceReportCommnent=(id)=>{
    return axios.get(baseUrl+`/service/starAndNumber/${id}`)
}

export const GetTop5Service = () => {
    return api.get(`/appointment/topservice`)
}

export const CanModifi = (id) => {
    return api.get(`/service/canmodifi/${id}`)
}