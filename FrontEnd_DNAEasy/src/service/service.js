
import axios from 'axios';

export const GetALlServies = () => {
    return axios.get('http://localhost:8080/api/service');
}
export const getServiceById = (id) => {
    return axios.get(`http://localhost:8080/api/service/${id}`);
}

export const SearchAndGet = (search,page,size) => {
    return axios.post(`http://localhost:8080/api/service/search?size=${size}&page=${page}`,search);
}