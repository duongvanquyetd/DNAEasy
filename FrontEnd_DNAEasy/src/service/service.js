import api from './api';

export const getALlServies = () => {
    return api.get('/services');
}