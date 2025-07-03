import React, { useState, useEffect, useCallback } from "react";
import "./../css/AdminRevenue.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { FaChartLine, FaDollarSign, FaWallet, FaArrowUp, FaArrowDown, FaMoneyBillWave, FaHandHoldingUsd, FaCalendarAlt, FaSync } from "react-icons/fa";

import { FetchRevenueRefundStats, GetRevenueForOverview } from "../../service/revenue";


import { GetPaymentList } from "../../service/payment";


import AdminHeader from "../AdminHeader";


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

  
  // Payment list state
  const [paymentData, setPaymentData] = useState({
    payments: [],
    totalElements: 0,
    totalPages: 0,
    currentPage: 0
  });
  
  // Payment filter state
  const [paymentFilter, setPaymentFilter] = useState({
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    page: 0,
    size: 10
  });
  
  // Fetch payment data
  const fetchPaymentData = async () => {
    try {
      setLoading(true);
      const response = await GetPaymentList(paymentFilter);
      console.log("Payment list response:", response.data);
      setPaymentData(response.data);
    } catch (error) {
      console.error("Error fetching payment list:", error);
      setError("Không thể tải dữ liệu thanh toán");
    } finally {
      setLoading(false);
    }
  };
  
  // Load payment data when filter changes
  useEffect(() => {
    fetchPaymentData();
  }, [paymentFilter.page]); // Only reload when page changes
  
  // Handle filter apply
  const handleFilterApply = () => {
    // Reset to page 0 when applying new filters
    setPaymentFilter(prev => ({ ...prev, page: 0 }));
    fetchPaymentData();
  };


  useEffect(() => {
    const loadRevenueAndStats = async () => {
      try {
        const data = DateRequest();
        const revenueChartRes = await FetchRevenueRefundStats(data);
        const chartData = revenueChartRes.data.map(item => ({
          date: item.date || item.name,
          revenue: item.revenue,
          refund: item.refund
        }));
        setChartData(chartData);
      } catch (error) {
        setChartData([]);
        setStatsData(defaultStatsData);
      }
    };

    loadRevenueAndStats();
  }, [filter, toDate, fromDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let startPeriod, endPeriod;

        if (filter === 'day') {
          startPeriod = fromDate ? fromDate.substring(0, 7) : new Date().toISOString().substring(0, 7);
          endPeriod = toDate ? toDate.substring(0, 7) : startPeriod;
        } else if (filter === 'month') {
          const currentYear = new Date().getFullYear();
          startPeriod = `${currentYear}-01`;
          endPeriod = `${currentYear}-12`;
        } else {
          const currentYear = new Date().getFullYear();
          const startYear = currentYear - 4;
          startPeriod = `${startYear}-01`;
          endPeriod = `${currentYear}-12`;
        }

        const res = await GetRevenueForOverview({
          startPeriod: startPeriod,
          endPeriod: endPeriod
        });

        const data = res.data;
        setIncome(Number(data.revenue) || 0);
        setExpenses(Number(data.totalExpense) || 0);
        setProfit(Number(data.remain) || 0);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu thống kê:", err);
      }
    };

    fetchData();
  }, [filter, fromDate, toDate]);

  function DateRequest() {
    let date;
    if (filter.includes("day")) {
      date = {
        type: "day",
        from: fromDate,
        to: toDate
      };
    } else if (filter.includes("month")) {
      date = {
        type: "month",
      };
    } else {
      date = {
        type: "year",
      };
    }
    return date;
  }

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="style-dashboard">
      <AdminHeader />
      <div className="admin-revenue-dashboard">
        <div className="dashboard-header" style={{ marginBottom: 20, padding: '24px 32px 16px 32px' }}>
          <FaChartLine size={30} style={{ marginRight: 10, color: '#fff', filter: 'drop-shadow(0 2px 8px #3a6ff8)' }} />
          <h2 style={{ fontSize: '2rem', margin: 0, letterSpacing: 0.5 }}>Admin Revenue Dashboard</h2>
        </div>

        <div className="dashboard-main" style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
          <div className="time-period-indicator">
            <FaCalendarAlt size={16} />
            <span>{timeRangeDisplay}</span>
          </div>

          <div className="dashboard-row stats-row" style={{ gap: 20, marginBottom: 18 }}>
            <div className="dashboard-card income-card sleep-card">
              <div className="card-title">{<FaDollarSign size={22} style={{ color: '#16c784' }} />} Thu nhập</div>
              <div className="income-placeholder" style={{ fontWeight: 700, fontSize: 22, color: '#0a1d56', opacity: 0.9 }}>
                <p>{income.toLocaleString()} đ</p>
              </div>
            </div>

            <div className="dashboard-card expenses-card sleep-card">
              <div className="card-title">{<FaWallet size={22} style={{ color: '#f8c63a' }} />} Chi phí</div>
              <div className="expenses-placeholder" style={{ fontWeight: 700, fontSize: 22, color: '#0a1d56', opacity: 0.9 }}>
                <p>{expenses.toLocaleString()} đ</p>
              </div>
            </div>

            <div className="dashboard-card profit-card sleep-card">
              <div className="card-title">{<FaHandHoldingUsd size={22} style={{ color: '#9c27b0' }} />} Lợi nhuận</div>
              <div className="profit-placeholder" style={{ fontWeight: 700, fontSize: 22, color: '#0a1d56', opacity: 0.9 }}>
                <p>{profit.toLocaleString()} đ</p>
              </div>
            </div>
          </div>

          <div className="dashboard-row">
            <div className="dashboard-card chart-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
                <div className="card-title"><FaChartLine size={22} /> Thống kê doanh thu, hoàn tiền</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <div className="date-filter-label" style={{ fontWeight: 600, fontSize: 14, color: '#3a6ff8' }}>Chọn khoảng thời gian:</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <select
                      value={filter}
                      onChange={e => setFilter(e.target.value)}
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
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={chartData}
                    margin={{ top: 60, right: 30, left: 0, bottom: 80 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                      tickFormatter={(value) => value.substring(0, 10)}
                    />
                    <YAxis tickFormatter={(value) => `${value.toLocaleString()} đ`} />
                    <Tooltip formatter={(value) => `${value.toLocaleString()} đ`} />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      height={50}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#82ca9d" name="Doanh thu (VND)" />
                    <Line type="monotone" dataKey="refund" stroke="#ff6961" name="Hoàn tiền (VND)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        
        {/* Date Filter for Lists - MOVED TO TOP */}
        <div className="dashboard-row" style={{ marginTop: '30px', marginBottom: '20px' }}>
          <div className="dashboard-card" style={{ flex: 1 }}>
            <div className="card-title">
              <FaCalendarAlt size={22} style={{ color: '#3a6ff8' }} /> Bộ lọc danh sách
            </div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Từ ngày:</label>
                <input
                  type="date"
                  value={paymentFilter.startDate}
                  onChange={(e) => setPaymentFilter(prev => ({ ...prev, startDate: e.target.value }))}
                  className="date-input"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Đến ngày:</label>
                <input
                  type="date"
                  value={paymentFilter.endDate}
                  onChange={(e) => setPaymentFilter(prev => ({ ...prev, endDate: e.target.value }))}
                  className="date-input"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>Số mục mỗi trang:</label>
                <select
                  value={paymentFilter.size}
                  onChange={(e) => setPaymentFilter(prev => ({ ...prev, size: Number(e.target.value) }))}
                  style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #e0e6f7' }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div style={{ marginTop: '25px' }}>
                <button 
                  className="filter-button"
                  onClick={handleFilterApply}
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#3a6ff8', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Áp dụng
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* New section for revenue and expense lists */}
        <div className="dashboard-row">
          {/* Revenue List */}
          <div className="dashboard-card" style={{ flex: 1 }}>
            <div className="card-title">
              <FaMoneyBillWave size={22} style={{ color: '#16c784' }} /> Danh sách thu nhập
            </div>
            <div className="revenue-list">
              {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>Đang tải dữ liệu...</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e0e6f7', textAlign: 'left' }}>
                      <th style={{ padding: '12px 8px', color: '#3a6ff8', fontWeight: 600 }}>Ngày</th>
                      <th style={{ padding: '12px 8px', color: '#3a6ff8', fontWeight: 600, textAlign: 'right' }}>Số tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentData.payments && paymentData.payments.filter(payment => !payment.expense).length > 0 ? (
                      paymentData.payments.filter(payment => !payment.expense).map((payment) => (
                        <tr key={payment.paymentId} style={{ borderBottom: '1px solid #f5f8ff' }}>
                          <td style={{ padding: '12px 8px' }}>{new Date(payment.paymentDate).toLocaleDateString('vi-VN')}</td>
                          <td style={{ padding: '12px 8px', fontWeight: 600, color: '#16c784', textAlign: 'right' }}>
                            {payment.paymentAmount.toLocaleString()} đ
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>Không có dữ liệu thu nhập</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
            {/* Pagination for Revenue */}
            <div className="payment-pagination">
              <div className="pagination-info">
                Trang {paymentData.currentPage + 1 || 1} / {Math.max(paymentData.totalPages, 1)} 
                <span style={{ marginLeft: '10px', fontSize: '0.9em', color: '#666' }}>
                  Tổng: {paymentData.totalElements || 0} mục
                </span>
              </div>
              <div className="pagination-controls">
                <button 
                  className="pagination-button" 
                  disabled={!paymentData.currentPage || paymentData.currentPage === 0}
                  onClick={() => setPaymentFilter(prev => ({ ...prev, page: prev.page - 1 }))}
                >
                  Trước
                </button>
                <button 
                  className="pagination-button" 
                  disabled={!paymentData.totalPages || paymentData.currentPage >= paymentData.totalPages - 1}
                  onClick={() => setPaymentFilter(prev => ({ ...prev, page: prev.page + 1 }))}
                >
                  Tiếp
                </button>
              </div>
            </div>
          </div>
          
          {/* Expense List */}
          <div className="dashboard-card" style={{ flex: 1 }}>
            <div className="card-title">
              <FaMoneyBillWave size={22} style={{ color: '#f8c63a' }} /> Danh sách chi phí
            </div>
            <div className="expense-list">
              {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>Đang tải dữ liệu...</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e0e6f7', textAlign: 'left' }}>
                      <th style={{ padding: '12px 8px', color: '#3a6ff8', fontWeight: 600 }}>Ngày</th>
                      <th style={{ padding: '12px 8px', color: '#3a6ff8', fontWeight: 600, textAlign: 'right' }}>Số tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentData.payments && paymentData.payments.filter(payment => payment.expense).length > 0 ? (
                      paymentData.payments.filter(payment => payment.expense).map((payment) => (
                        <tr key={payment.paymentId} style={{ borderBottom: '1px solid #f5f8ff' }}>
                          <td style={{ padding: '12px 8px' }}>{new Date(payment.paymentDate).toLocaleDateString('vi-VN')}</td>
                          <td style={{ padding: '12px 8px', fontWeight: 600, color: '#ff6961', textAlign: 'right' }}>
                            {payment.paymentAmount.toLocaleString()} đ
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>Không có dữ liệu chi phí</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
            {/* Pagination for Expenses */}
            <div className="payment-pagination">
              <div className="pagination-info">
                Trang {paymentData.currentPage + 1 || 1} / {Math.max(paymentData.totalPages, 1)} 
                <span style={{ marginLeft: '10px', fontSize: '0.9em', color: '#666' }}>
                  Tổng: {paymentData.totalElements || 0} mục
                </span>
              </div>
              <div className="pagination-controls">
                <button 
                  className="pagination-button" 
                  disabled={!paymentData.currentPage || paymentData.currentPage === 0}
                  onClick={() => setPaymentFilter(prev => ({ ...prev, page: prev.page - 1 }))}
                >
                  Trước
                </button>
                <button 
                  className="pagination-button" 
                  disabled={!paymentData.totalPages || paymentData.currentPage >= paymentData.totalPages - 1}
                  onClick={() => setPaymentFilter(prev => ({ ...prev, page: prev.page + 1 }))}
                >
                  Tiếp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenue;