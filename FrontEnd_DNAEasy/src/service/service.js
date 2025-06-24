import axios from 'axios';
import api from './api';

export const GetALlServies = () => {
    return axios.get('http://localhost:8080/api/service');
}
export const getServiceById = (id) => {
    return axios.get(`http://localhost:8080/api/service/${id}`);
}

export const SearchAndGet = (search,page,size) => {
    return axios.post(`http://localhost:8080/api/service/search?size=${size}&page=${page}`,search);
}


//CRUD
// export const createService = (serviceData) => {
//     return axios.post('http://localhost:8080/api/service', serviceData);
// }

// export const updateService = (id, serviceData) => {
//     return axios.put(`http://localhost:8080/api/service/${id}`, serviceData);
// }

// export const deleteService = (id) => {
//     return axios.delete(`http://localhost:8080/api/service/${id}`);
// }

export const Report=()=>{
    return api.get('/service/report')
}