import api from './api';
export const GetcurentOrderProcess = (appointmentId) => {
    return api.get(`processtesting/getcurentOrderProcess/${appointmentId}`);
}