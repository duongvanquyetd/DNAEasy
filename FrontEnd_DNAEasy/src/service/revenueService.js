import * as revenueAPI from './revenue';

import { GetStatistics } from './revenue';
import { api } from './api';

/**
 * Lấy dữ liệu biểu đồ doanh thu
 * @param {string} year Năm (YYYY)
 * @param {string} month Tháng (1-12)
 * @returns {Promise<Array>} Dữ liệu biểu đồ
 */
export const GetRevenueChartData = async (year, month) => {
  try {
    console.log(`GetRevenueChartData called with: year=${year}, month=${month}`);
    
    // Format dates for API request
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); // Last day of month
    
    const startDateStr = formatDate(startDate);
    const endDateStr = formatDate(endDate);
    
    console.log(`Using date range: ${startDateStr} to ${endDateStr}`);

    // Gọi API thật để lấy dữ liệu
    const response = await revenueAPI.GetRevenueChart(startDateStr, endDateStr);
    console.log("API Response:", response);
    
    // Check for empty response or no data
    if (!response || !response.data || !Array.isArray(response.data) || response.data.length === 0) {
      console.warn("Empty or invalid data format from API, returning empty array");
      return [];
    }
    
    // Format dữ liệu API trả về để phù hợp với định dạng biểu đồ
    const formattedData = response.data.map(item => {
      // Handle null or undefined values
      if (!item || !item.date) {
        return null;
      }
      
      const dateObj = new Date(item.date);
      // Convert revenue to number, default to 0 if not a number
      const revenueValue = item.revenue !== undefined ? Number(item.revenue) : 0;
      const revenue = isNaN(revenueValue) ? 0 : revenueValue;
      
      // Convert refund to number, default to 0 if not a number
      const refundValue = item.refund !== undefined ? Number(item.refund) : 0;
      const refund = isNaN(refundValue) ? 0 : refundValue;
      
      return {
        date: item.date,
        revenue: revenue,
        Revenue: revenue, // Trường này cần thiết cho biểu đồ
        refund: refund,
        Refund: refund, // Trường này cần thiết cho biểu đồ
        formattedDate: dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        formattedRevenue: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'VND',
          maximumFractionDigits: 0
        }).format(revenue)
      };
    }).filter(item => item !== null); // Remove any null items
    
    console.log("Formatted API data for chart:", formattedData.length, "points");
    return formattedData;
  } catch (error) {
    console.error("Error in GetRevenueChartData:", error);
    return [];
  }
};



// Format a date object to YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Lấy thống kê số lượng cuộc hẹn theo trạng thái
 * @returns {Promise<Object>} Dữ liệu thống kê
 */
export const GetAppointmentCountsByStatus = async () => {
  console.log('Fetching appointment counts by status');
  
  try {
    const response = await revenueAPI.GetAppointmentStats();
    console.log("GetAppointmentCountsByStatus API response:", response);
    
    if (response && response.data) {
      return response.data;
    } else {
      console.warn("Invalid data format from GetAppointmentStats API");
      return {
        total: 0,
        completed: 0,
        inProgress: 0,
        cancelled: 0,
        refunded: 0
      };
    }
  } catch (error) {
    console.error('Error in GetAppointmentCountsByStatus:', error);
    // Trả về giá trị 0 khi có lỗi
    return {
      total: 0,
      completed: 0,
      inProgress: 0,
      cancelled: 0,
      refunded: 0
    };
  }
};

/**
 * Lấy thống kê dòng tiền (thu, chi, lợi nhuận)
 * @param {number|string} month Tháng (1-12)
 * @param {number|string} year Năm
 * @returns {Promise<Object>} Dữ liệu dòng tiền
 */
export const GetRevenueFlowStats = async (month, year) => {
  // Format tháng và năm cho API
  const currentDate = new Date();
  const currentMonth = month ? String(parseInt(month)).padStart(2, '0') : String(currentDate.getMonth() + 1).padStart(2, '0');
  const currentYear = year ? String(parseInt(year)) : String(currentDate.getFullYear());

  console.log(`Fetching revenue flow stats for ${currentMonth}/${currentYear}`);
  
  // Format theo yêu cầu của API: YYYY-MM
  const startPeriod = `${currentYear}-${currentMonth}`;
  const endPeriod = startPeriod; // Cùng tháng
  
  try {
    const response = await revenueAPI.GetStatistics(startPeriod, endPeriod);
    console.log("GetRevenueFlowStats API response:", response);
    
    // Kiểm tra phản hồi API
    if (response && response.data) {
      console.log("GetRevenueFlowStats raw API data:", response.data);
      
      // Sử dụng giá trị trực tiếp từ API
      return {
        total: response.data.revenue || 0,
        income: response.data.revenue || 0,
        expenses: response.data.totalExpense || 0,
        profit: response.data.remain || 0
      };
    } else {
      console.warn("Invalid data format from GetStatistics API");
      return {
        total: 0,
        income: 0,
        expenses: 0,
        profit: 0
      };
    }
  } catch (error) {
    console.error('Error in GetRevenueFlowStats:', error);
    // Trả về giá trị 0 khi có lỗi
    return {
      total: 0,
      income: 0,
      expenses: 0,
      profit: 0
    };
  }
};

/**
 * Lấy top 10 dịch vụ được đặt nhiều nhất
 * @param {number|string} month Tháng (1-12)
 * @param {number|string} year Năm
 * @returns {Promise<Array>} Danh sách dịch vụ
 */
// Lấy dữ liệu thống kê từ API
export const getRevenueStatistics = async (month, year) => {
  try {
    // Định dạng tham số cho API
    const currentDate = new Date();
    const currentMonth = month ? String(parseInt(month)).padStart(2, '0') : String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentYear = year ? String(parseInt(year)) : String(currentDate.getFullYear());
    
    // Format theo yêu cầu của API: YYYY-MM
    const startPeriod = `${currentYear}-${currentMonth}`;
    const endPeriod = startPeriod; // Cùng tháng
    
    console.log(`RevenueService: Calling GetStatistics API for period ${startPeriod}`);
    const response = await GetStatistics(startPeriod, endPeriod);
    console.log("RevenueService: API response:", response);
    
    if (response && response.data) {
      // Chuyển đổi các giá trị thành số
      const revenue = typeof response.data.revenue === 'string' ? parseInt(response.data.revenue.replace(/[^\d]/g, '')) : (parseInt(response.data.revenue) || 0);
      const totalExpense = typeof response.data.totalExpense === 'string' ? parseInt(response.data.totalExpense.replace(/[^\d]/g, '')) : (parseInt(response.data.totalExpense) || 0);
      const remain = typeof response.data.remain === 'string' ? parseInt(response.data.remain.replace(/[^\d]/g, '')) : (parseInt(response.data.remain) || 0);
      
      return {
        income: revenue,
        expenses: totalExpense,
        profit: remain
      };
    } else {
      console.warn("RevenueService: Invalid data format from API");
      return {
        income: 0,
        expenses: 0,
        profit: 0
      };
    }
  } catch (error) {
    console.error("RevenueService: Error fetching statistics:", error);
    // Trả về giá trị 0 trong trường hợp lỗi
    return {
      income: 0,
      expenses: 0,
      profit: 0
    };
  }
}; 



