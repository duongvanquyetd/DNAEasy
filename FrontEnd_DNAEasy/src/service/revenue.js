import api from './api';

// Get revenue statistics summary
export const GetStatistics = (startPeriod, endPeriod) => {
  // Use current month as default if not provided
  if (!startPeriod || !endPeriod) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    startPeriod = `${year}-${month}`;
    endPeriod = startPeriod;
  }
  
  const body = { 
    startPeriod: startPeriod,
    endPeriod: endPeriod
  };
  
  console.log("CALLING API WITH:", JSON.stringify(body));
  
  // Check the absolute URL being called
  const fullUrl = `${api.defaults.baseURL}/appointment/statistics`;
  console.log("FULL API URL:", fullUrl);
  
  return api.post("/appointment/statistics", body, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    console.log("API SUCCESS RESPONSE:", response);
    console.log("API SUCCESS RESPONSE STATUS:", response.status);
    console.log("API SUCCESS RESPONSE DATA:", response.data);
    console.log("API SUCCESS RESPONSE DATA TYPE:", typeof response.data);
    
    if (response.data) {
      console.log("API SUCCESS RESPONSE DATA REVENUE:", response.data.revenue);
      console.log("API SUCCESS RESPONSE DATA TOTAL EXPENSE:", response.data.totalExpense);
      console.log("API SUCCESS RESPONSE DATA REMAIN:", response.data.remain);
    }
    
    // Kiểm tra nhiều trường hợp dữ liệu từ API
    if (response && response.data) {
      console.log("STATISTICS ENDPOINT DETAILS:");
      console.log("Response status:", response.status);
      console.log("Response data type:", typeof response.data);
      console.log("Response data full:", JSON.stringify(response.data));
      
      // Nếu response.data là string, thử parse JSON
      let data = response.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
          console.log("Successfully parsed string data:", data);
        } catch (e) {
          console.warn("Failed to parse string data:", e);
        }
      }
      
      // Kiểm tra nếu data là null, undefined hoặc không phải object
      if (!data || typeof data !== 'object') {
        console.warn("Invalid data format - not an object:", data);
        return {
          data: {
            revenue: 0,
            totalExpense: 0,
            remain: 0
          }
        };
      }
      
      // Trường hợp data là array
      if (Array.isArray(data)) {
        console.warn("Data is an array instead of object:", data);
        // Nếu có phần tử đầu tiên và nó là object, dùng nó
        if (data.length > 0 && typeof data[0] === 'object') {
          data = data[0];
        } else {
          return {
            data: {
              revenue: 0,
              totalExpense: 0,
              remain: 0
            }
          };
        }
      }
      
      // Kiểm tra và đảm bảo các trường cần thiết
      const hasRequiredFields = 
        data.revenue !== undefined && 
        data.totalExpense !== undefined && 
        data.remain !== undefined;
      
      if (!hasRequiredFields) {
        console.warn("WARNING: Statistics response missing expected fields");
        
        // Tìm kiếm các trường có thể có tên khác nhưng cùng ý nghĩa
        const revenue = data.revenue || data.totalRevenue || data.income || data.totalIncome || 0;
        const expense = data.totalExpense || data.expense || data.expenses || data.totalExpenses || 0;
        const remain = data.remain || data.profit || data.netIncome || data.netProfit || 0;
        
        return {
          data: {
            revenue: revenue,
            totalExpense: expense,
            remain: remain
          }
        };
      }
      
      // Trả về dữ liệu hợp lệ
      return {
        data: {
          revenue: data.revenue,
          totalExpense: data.totalExpense,
          remain: data.remain
        }
      };
    }
    
    // Nếu không có response hoặc không có data
    console.warn("No valid response or data");
    return {
      data: {
        revenue: 0,
        totalExpense: 0,
        remain: 0
      }
    };
  })
  .catch(error => {
    console.error("API ERROR:", error);
    // Return zeros if API fails
    return {
      data: {
        revenue: 0,
        totalExpense: 0,
        remain: 0
      }
    };
  });
};

// Get appointment statistics by status
export const GetAppointmentStats = () => {
  console.log("DEBUG-API: Calling appointment stats API");
  
  return api.get("/appointment/stats")
    .then(response => {
      console.log("DEBUG-API: Appointment stats raw response:", response);
      return response;
    })
    .catch(error => {
      console.error("DEBUG-API: Appointment stats error:", error);
      // Return empty data if API fails
      return { 
        data: {
          total: 0,
          completed: 0,
          inProgress: 0,
          cancelled: 0,
          refunded: 0
        }
      };
    });
};

// Get top booked services
export const GetTopServices = (startPeriod, endPeriod) => {
  console.log("DEBUG-API: Calling top services API with", startPeriod, endPeriod);
  
  const body = { startPeriod, endPeriod };
  
  return api.post("/appointment/topservice", body)
    .then(response => {
      console.log("DEBUG-API: Top services raw response:", response);
      return response;
    })
    .catch(error => {
      console.error("DEBUG-API: Top services error:", error);
      // Return empty array if API fails
      return { data: [] };
    });
};

// Get revenue by categories
export const GetRevenueByCategories = (startPeriod, endPeriod) => {
  console.log("DEBUG-API: Calling revenue by categories API with", startPeriod, endPeriod);
  
  const body = { startPeriod, endPeriod };
  
  return api.post("/revenue/categories", body)
    .then(response => {
      console.log("DEBUG-API: Revenue categories response:", response);
      return response;
    })
    .catch(error => {
      console.error("DEBUG-API: Revenue categories error:", error);
      // Return empty array if API fails
      return { data: [] };
    });
};

export const GetRevenueForOverview = (data) => {
  return api.post("/appointment/statistics", data)
}

export const FetchRevenueRefundStats = (startPeriod, endPeriod) => {
  return api.post("appointment/revenue-stats", {
    type: "day",
    from: startPeriod,
    to: endPeriod
  });
}



