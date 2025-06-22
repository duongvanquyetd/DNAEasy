import api from './api';
export const CreateAppointment = (appoinment) => {
    return api.post('/appointment/create', appoinment);
}
export const GetYourAppointmentInProcess = () => {
    return api.get(`/appointment/getAppointmentInprocess`);
}
export const ProcesstheAppointment = (appointmentId) => {
    return api.get(`/processtesting/${appointmentId}`);
}
export const UpdateStatusAppointment = (appoinment) => {
    return api.post('/appointment/updateStatus', appoinment);
}
export const GetAppointmetnForStaff_Lab = () => {
    return api.get(`/appointment/getForStaffLab`);
}
export const GetHistoryAppointment = () => {
    return api.get(`/appointment/getAllCompleteFlowCurrentUser`);
}
export const GetAppointmetnForStaff_reception = () => {
    return api.get("/appointment/getforStaffReception");
}
export const CanRefund = (appointmentId) => {
    return api.get(`/appointment/canrefund/${appointmentId}`);
}