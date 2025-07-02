import api from './api';


export const GetRevenueForOverview = (data) => {
  return api.post("/appointment/statistics", data)
}

export const  FetchRevenueRefundStats = (data) => {
  return api.post("appointment/revenue-stats",data);
}



