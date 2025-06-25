import axios from 'axios';
import api from './api';

export const GetALlServies = () => {
    return axios.get('http://localhost:8080/api/service');
}
export const getServiceById = (id) => {
    return axios.get(`http://localhost:8080/api/service/${id}`);
}

export const SearchAndGet = (search,page,size,active) => {
    return axios.post(`http://localhost:8080/api/service/search?size=${size}&page=${page}&active=${active}`,search);
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