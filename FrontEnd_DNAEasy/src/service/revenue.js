import api from './api';

export const GetRevenueChart = (startPeriod, endPeriod) => {
  return api.post("/appointment/revenue_chart", {
    startPeriod,
    endPeriod
  });
};

export const GetStatistics = (startPeriod, endPeriod) => {
  return api.post("/appointment/statistics", {
    startPeriod,
    endPeriod
  });
};

export const GetAppointmentStats = () => {
  return api.get("/appointment/stats");
};

export const GetTopServices = (startPeriod, endPeriod) => {
  return api.post("/appointment/topservice", {
    startPeriod,
    endPeriod
  });
};

export const GetRevenueByCategories = (startPeriod, endPeriod) => {
  return api.post("/appointment/revenue_by_categories", {
    startPeriod,
    endPeriod
  });
}; 