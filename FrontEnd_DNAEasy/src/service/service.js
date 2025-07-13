import axios from 'axios';
import api from './api';

export const GetALlServies = () => {
    return axios.get('http://localhost:8080/api/service');
}
export const getServiceById = (id) => {
    return axios.get(`http://localhost:8080/api/service/${id}`);
}

export const SearchAndGet = (search,page,size,active,sortcolumn,modesort) => {
    return axios.post(`http://localhost:8080/api/service/search?size=${size}&page=${page}&active=${active}&sortcolumn=${sortcolumn}&sortmode=${modesort}`,search);
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
    return axios.get(`http://localhost:8080/api/service/starAndNumber/${id}`)
}

export const GetTop5Service = () => {
    return api.get(`/appointment/topservice`)
}

export const CanModifi = (id) => {
    return api.get(`/service/canmodifi/${id}`)
}