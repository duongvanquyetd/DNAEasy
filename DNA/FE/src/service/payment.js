import api from './api';

export const GetPaymentList = (data,pagesize,currentpage) => {
  return api.post(`/payment/list?page=${currentpage}&size=${pagesize}`, data);
};

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

export const  CreateRefund = (appoinment) =>{
    return api.post("payment/create",appoinment)
}

export const ChartOverview = (data)=>{
    return api.post("/appointment/revenue_chart",data)
}
export const GetRevenueForOverview = (data) => {
  return api.post("/payment/statistics", data)
}

export const  FetchRevenueRefundStats = (data) => {
  return api.post("/payment/revenue-stats",data);
}
