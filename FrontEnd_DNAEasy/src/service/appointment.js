import api from './api';
export const CreateAppointment = (appoinment) => {
    return api.post('/appointment/create', appoinment);
}
export const GetYourAppointmentInProcess = (page,size,key) => {
    return api.get(`/appointment/getAppointmentInprocess?page=${page}&size=${size}&keysearch=${key}`);
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
export const GetHistoryAppointment = (page,size,key) => {
    return api.get(`/appointment/getAllCompleteFlowCurrentUser?page=${page}&size=${size}&keysearch=${key}`);
}
export const GetAppointmetnForStaff_reception = () => {
    return api.get("/appointment/getforStaffReception");
}
export const CanRefund = (appointmentId) => {
    return api.get(`/appointment/canrefund/${appointmentId}`);
}

export const GetAppointForManagerAssign=(page,size)=>{
    return api.get("/appointment/managershift?"+"page="+page+"&size="+size)
}
export const AssignForAppoint=(AssigneStaff)=>{
    return api.post("/appointment/assignStaff",AssigneStaff)
} 

// Thêm API để lấy thống kê số lượng cuộc hẹn
export const GetAppointmentCounts = () => {
  return api.get("/appointment/count");
};

// Thêm API để lấy báo cáo cuộc hẹn theo khoảng thời gian
export const GetAppointmentReport = (dateRange) => {
  return api.get("/appointment/reports", { params: dateRange });
};