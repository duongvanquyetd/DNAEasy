import api from './api';
export const GetPaymentStatus = (appointmentId ) => {
    return api.get(`payment/status/${appointmentId }`);
}
export  const PayToview = (appointmentId) => {
    return api.get(`/payment/paytoview/${appointmentId}`);
}
export const UpdatePaymentStatus = (appoinment) => {
    return api.post(`/payment/updateStatus`,appoinment);
}
export  const PayAgaint = (appointmentId) => {
    return api.get(`/payment/payagaint/${appointmentId}`);
}
export  const ConfirmPaidByCash = (appointmentId) => {
    return api.get(`/payment/confirmpaid/${appointmentId}`);
}
export const VNPay_Return = ()=>
{
    return api.get("/payment/vnpay-callback");
}