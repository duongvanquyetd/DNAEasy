import api from './api';

export const getALlServies = () => {
    return api.get('/service');
}
export const getServiceById = (id) => {
    return api.get(`/service/${id}`);
}