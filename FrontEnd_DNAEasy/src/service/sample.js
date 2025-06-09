import api from "./api";
export const CreateSampleByAppointmentID = (appointmentId) => {
    return api.post('/sample/create',appointmentId);
}
export const AllowConfimAppointment = (appointmentId) => {
    return api.post(`/sample/nextStatusAndAllow`,appointmentId);
}
export const GetSampleByAppointmentId = (appointmentId) => {
    return api.get(`/sample/getbyappoinmenid/${appointmentId}`);
}
export const ConfirmSample = (sample) => {
    return api.post('/sample/confirmhaveForm', sample);
}