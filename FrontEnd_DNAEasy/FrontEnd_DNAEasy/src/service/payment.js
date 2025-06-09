import api from './api';
export const GetPaymentStatus = (appointmentId ) => {
    return api.get(`payment/status/${appointmentId }`);
}
export  const PayToview = (appointmentId) => {
    return api.get(`/payment/paytoview/${appointmentId}`);
}
export const UpdatePaymentStatus = (appointmentId) => {
    return api.post(`/payment/updateStatus/${appointmentId}`);
}