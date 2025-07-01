import * as revenueAPI from './revenue';
import { GetUserRoleStats } from './user';

/**
 * Lấy dữ liệu biểu đồ doanh thu
 * @param {string} startPeriod Ngày bắt đầu định dạng YYYY-MM-DD
 * @param {string} endPeriod Ngày kết thúc định dạng YYYY-MM-DD
 * @returns {Promise<Array>} Dữ liệu biểu đồ
 */
export const GetRevenueChartData = async (startPeriod, endPeriod) => {
  console.log(`Fetching revenue chart data from ${startPeriod} to ${endPeriod}`);

  try {
    const response = await revenueAPI.GetRevenueChart(startPeriod, endPeriod);
    console.log("GetRevenueChartData API response:", response);
    return response;
  } catch (error) {
    console.error('Error in GetRevenueChartData:', error);
    // Trả về mảng rỗng khi có lỗi
    return { data: [] };
  }
};

/**
 * Lấy thống kê số lượng cuộc hẹn theo trạng thái
 * @returns {Promise<Object>} Dữ liệu thống kê
 */
export const GetAppointmentCountsByStatus = async () => {
  console.log('Fetching appointment counts by status');
  
  try {
    const response = await revenueAPI.GetAppointmentStats();
    console.log("GetAppointmentCountsByStatus API response:", response);
    return response;
  } catch (error) {
    console.error('Error in GetAppointmentCountsByStatus:', error);
    // Trả về giá trị 0 khi có lỗi
    return {
      data: {
        total: 0,
        completed: 0,
        inProgress: 0,
        cancelled: 0,
        refunded: 0
      }
    };
  }
};

/**
 * Lấy thống kê dòng tiền (thu, chi, lợi nhuận)
 * @param {number} month Tháng (1-12)
 * @param {number} year Năm
 * @returns {Promise<Object>} Dữ liệu dòng tiền
 */
export const GetRevenueFlowStats = async (month, year) => {
  // Format tháng và năm cho API
  const currentDate = new Date();
  const currentMonth = month ? parseInt(month) : currentDate.getMonth() + 1;
  const currentYear = year ? parseInt(year) : currentDate.getFullYear();

  console.log(`Fetching revenue flow stats for ${currentMonth}/${currentYear}`);
  
  const startPeriod = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
  const endPeriod = `${currentYear}-${String(currentMonth + 1 > 12 ? 1 : currentMonth + 1).padStart(2, '0')}`;
  
  try {
    const response = await revenueAPI.GetStatistics(startPeriod, endPeriod);
    console.log("GetRevenueFlowStats API response:", response);
    
    if (response && response.data) {
      return {
        data: {
          total: response.data.revenue || 0,
          income: response.data.revenue || 0,
          expenses: response.data.totalExpense || 0,
          profit: response.data.remain || 0
        }
      };
    }
    return response;
  } catch (error) {
    console.error('Error in GetRevenueFlowStats:', error);
    // Trả về giá trị 0 khi có lỗi
    return {
      data: {
        total: 0,
        income: 0,
        expenses: 0,
        profit: 0
      }
    };
  }
};

/**
 * Lấy top 10 dịch vụ được đặt nhiều nhất
 * @param {number} month Tháng (1-12)
 * @param {number} year Năm
 * @returns {Promise<Array>} Danh sách dịch vụ
 */
export const GetTopBookedServices = async (month, year) => {
  console.log(`Fetching top booked services for ${month}/${year}`);
  
  // Tạo khoảng thời gian từ đầu năm đến cuối năm hiện tại để lấy đủ dữ liệu
  const startPeriod = `${year || new Date().getFullYear()}-01`;
  const endPeriod = `${year || new Date().getFullYear()}-12`;
  
  try {
    const response = await revenueAPI.GetTopServices(startPeriod, endPeriod);
    console.log("GetTopBookedServices API response:", response);
    return response;
  } catch (error) {
    console.error('Error in GetTopBookedServices:', error);
    // Trả về mảng rỗng khi có lỗi
    return { data: [] };
  }
}; 