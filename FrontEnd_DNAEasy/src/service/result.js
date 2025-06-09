import api from './api';
export const CreateResult = (appoinmentId) => {
    return api.post('/result/create', appoinmentId);
}
export const UpdateResult = (appointmentId) => {
    return api.post('/result/updateResult', appointmentId);
}
export const GetResultByAppointmentId = (appointmentId) => {
    return api.post(`/result/getResult`,appointmentId);
}