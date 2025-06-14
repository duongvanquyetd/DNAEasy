import api from './api';

export const GetALlServies = () => {
    return api.get('/service');
}
export const getServiceById = (id) => {
    return api.get(`/service/${id}`);
}
