import React, { useState, useEffect, useCallback } from "react";
import "./../css/AdminRevenue.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { FaChartLine, FaDollarSign, FaWallet, FaArrowUp, FaArrowDown, FaMoneyBillWave, FaHandHoldingUsd, FaCalendarAlt, FaSync } from "react-icons/fa";


import { FetchRevenueRefundStats, GetRevenueForOverview } from "../../service/revenue";
import AdminHeader from "../AdminHeader";


// const getTimeRange = () => {
//   let from = '';
//   let to = '';

//   if (filter === 'day') {
//     from = fromDate;
//     to = toDate;
//   } else if (filter === 'month') {
//     from = `${selectedYear}-01-01`;
//     to = `${selectedYear}-12-31`;
//   } else if (filter === 'year') {
//     from = `${startYear}-01-01`;
//     to = `${currentYear}-12-31`;

//   }

//   return { from, to };
// };



// Set default stats data structure

const AdminRevenue = () => {
  const defaultStatsData = {
    total: { value: 0, change: 0, isUp: true },
    income: { value: 0, change: 0, isUp: true },
    expenses: { value: 0, change: 0, isUp: true },
    profit: { value: 0, change: 0, isUp: true }
  };

  const FILTERS = {
    day: { label: 'Ngày' },
    month: { label: 'Tháng' },
    year: { label: 'Năm' }
  };

  const [timeRangeDisplay, setTimeRangeDisplay] = useState('');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('day');

  const [statsData, setStatsData] = useState();
  const [fromDate, setFromDate] = useState(new Date().toISOString().slice(0, 10));
  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10));
  const currentYear = new Date().getFullYear();
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [profit, setProfit] = useState(0);



  useEffect(() => {
    const loadRevenueAndStats = async () => {
      try {
        const data = DateRequest();
        console.log("Date", data)

        // Gọi API biểu đồ
        const revenueChartRes = await FetchRevenueRefundStats(data);
        console.log("Reponse ", revenueChartRes.data)
        const chartData = revenueChartRes.data.map(item => ({
          date: item.date || item.name,
          revenue: item.revenue,
          refund: item.refund
        }));
        setChartData(chartData);
      } catch (error) {
        // console.error("Lỗi khi gọi API", error);
        setChartData([]);
        setStatsData(defaultStatsData);
      }
    };

    loadRevenueAndStats();
  }, [filter, toDate, fromDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Chuẩn bị dữ liệu theo định dạng API yêu cầu
        let startPeriod, endPeriod;

        if (filter === 'day') {
          // Chuyển từ YYYY-MM-DD sang YYYY-MM
          startPeriod = fromDate ? fromDate.substring(0, 7) : new Date().toISOString().substring(0, 7);
          endPeriod = toDate ? toDate.substring(0, 7) : startPeriod;
        } else if (filter === 'month') {
          // Nếu chọn theo tháng, lấy cả năm
          const currentYear = new Date().getFullYear();
          startPeriod = `${currentYear}-01`;
          endPeriod = `${currentYear}-12`;
        } else { // filter === 'year'
          // Nếu chọn theo năm, lấy 5 năm gần đây
          const currentYear = new Date().getFullYear();
          const startYear = currentYear - 4;
          startPeriod = `${startYear}-01`;
          endPeriod = `${currentYear}-12`;
        }

        console.log(`Fetching revenue stats: ${startPeriod} to ${endPeriod}, filter: ${filter}`);

        // Gọi API với payload chuẩn
        const res = await GetRevenueForOverview({
          startPeriod: startPeriod,
          endPeriod: endPeriod
        });

        console.log("Revenue Overview API response:", res);
        const data = res.data;

        // Cập nhật state với dữ liệu mới
        setIncome(Number(data.revenue) || 0);
        setExpenses(Number(data.totalExpense) || 0);
        setProfit(Number(data.remain) || 0);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu thống kê:", err);
      }
    };

    fetchData();
  }, [filter, fromDate, toDate]); // Thêm dependencies để cập nhật khi thay đổi


  function DateRequest() {
    let date;
    if (filter.includes("day")) {
      date = {
        type: "day",
        from: fromDate,
        to: toDate
      }
    } else if (filter.includes("month")) {
      date = {
        type: "month",
      }
    }
    else {
      date = {
        type: "year",
      }
    }
    return date;
  }

  // Format date for display
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (

    <div className="style-dashboard">
      {/* Sidebar Header */}
      <AdminHeader />

      <div className="admin-revenue-dashboard">
        <div className="dashboard-header" style={{ marginBottom: 20, padding: '24px 32px 16px 32px' }}>
          <FaChartLine size={30} style={{ marginRight: 10, color: '#fff', filter: 'drop-shadow(0 2px 8px #3a6ff8)' }} />
          <h2 style={{ fontSize: '2rem', margin: 0, letterSpacing: 0.5 }}>Admin Revenue Dashboard</h2>
        </div>

        <div className="dashboard-main">
          <div className="time-period-indicator">
            <FaCalendarAlt size={16} />
            <span>{timeRangeDisplay}</span>
          </div>

          <div className="dashboard-row stats-row" style={{ gap: 20, marginBottom: 18 }}>
            {/* Income (Revenue) card */}
            <div className="dashboard-card income-card sleep-card">
              <div className="card-title">{<FaDollarSign size={22} style={{ color: '#16c784' }} />} Thu nhập</div>
              <div className="income-placeholder" style={{ fontWeight: 700, fontSize: 22, color: '#0a1d56', opacity: 0.9 }}>
                <p>{income.toLocaleString()} đ</p>

              </div>
            </div>

            {/* Expenses card */}
            <div className="dashboard-card expenses-card sleep-card">
              <div className="card-title">{<FaWallet size={22} style={{ color: '#f8c63a' }} />} Chi phí</div>
              <div className="expenses-placeholder" style={{ fontWeight: 700, fontSize: 22, color: '#0a1d56', opacity: 0.9 }}>
                <p>{expenses.toLocaleString()} đ</p>
              </div>
            </div>

            {/* Profit (Remain) card */}
            <div className="dashboard-card profit-card sleep-card">
              <div className="card-title">{<FaHandHoldingUsd size={22} style={{ color: '#9c27b0' }} />} Lợi nhuận</div>
              <div className="profit-placeholder" style={{ fontWeight: 700, fontSize: 22, color: '#0a1d56', opacity: 0.9 }}>
                <p>{profit.toLocaleString()} đ</p>
              </div>
            </div>
          </div>

          <div className="dashboard-row">
            <div className="dashboard-card chart-card" style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
                <div className="card-title"><FaChartLine size={22} /> Thống kê doanh thu, hoàn tiền</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <div className="date-filter-label" style={{ fontWeight: 600, fontSize: 14, color: '#3a6ff8' }}>Chọn khoảng thời gian:</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <select
                      value={filter}
                      onChange={e => {
                        setFilter(e.target.value);
                      }}
                      style={{ padding: '6px 14px', borderRadius: 8, border: '1.5px solid #e0e6f7', fontWeight: 600, fontSize: 15, color: '#0a1d56', background: '#f5f8ff', outline: 'none', boxShadow: '0 2px 8px rgba(58,111,248,0.04)' }}

                    >
                      <option value="day">By Day</option>
                      <option value="month">By Month</option>
                      <option value="year">By Year</option>
                    </select>


                    {filter === 'day' && (
                      <div className="date-range-selector">
                        <input
                          type="date"
                          value={fromDate}
                          onChange={e => setFromDate(e.target.value)}
                          className="date-input"
                        />

                        <span style={{ margin: '0 4px', fontWeight: 600 }}>đến</span>


                        <input
                          type="date"
                          value={toDate}

                          onChange={e => setToDate(e.target.value)}
                          className="date-input"
                        />
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* asdas ===============================*/}
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `${value.toLocaleString()} đ`} />
                    <Tooltip formatter={(value) => `${value.toLocaleString()} đ`} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#82ca9d" name="Doanh thu (VND)" />
                    <Line type="monotone" dataKey="refund" stroke="#ff6961" name="Hoàn tiền (VND)" />

                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};


export default AdminRevenue; 