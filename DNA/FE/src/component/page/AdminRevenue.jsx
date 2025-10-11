import React, { useState, useEffect, useCallback } from "react";
import "./../css/AdminRevenue.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FaChartLine, FaDollarSign, FaWallet, FaHandHoldingUsd, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import { FetchRevenueRefundStats, GetPaymentList, GetRevenueForOverview } from "../../service/payment";
import AdminHeader from "../AdminHeader";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const AdminRevenue = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('day');
  const [statsData, setStatsData] = useState();
  const [fromDate, setFromDate] = useState(new Date().toISOString().slice(0, 10));
  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10));
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [profit, setProfit] = useState(0);

  const [revenlist, setRevenlist] = useState([]);
  const pagesizerevenua = 10;
  const [currentpagerevenue, setCurrentpagerevenue] = useState(1);
  const [totalPagesRevenue, setTotalPagesRevenue] = useState(0);

  const [expenselist, setExpenselist] = useState([]);
  const pagesizeexpense = 10;
  const [currentpageexpense, setcurrentpageexpense] = useState(1);
  const [totalPagesExpense, setTotalPagesExpense] = useState(0);





  const [dateRange, setDateRange] = useState('today');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);  // 5 năm trước đến 5 năm sau
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const getDateRange = () => {
    const today = new Date();
    if (dateRange === 'today') {
      const d = today.toISOString().slice(0, 10);
      return { fromdate: d, todate: d };
    }
    if (dateRange === 'month') {
      const startMonth = new Date(Number(year), month - 1, 1);
      const endMonth = new Date(Number(year), month, 0);
      const fromDate = startMonth.toISOString().slice(0, 10);
      const toDate = endMonth.toISOString().slice(0, 10);
      return { fromdate: fromDate, todate: toDate };
    }

    if (dateRange === 'year') {
      const y = Number(year) || today.getFullYear(); // Đảm bảo year là số, fallback về năm hiện tại nếu rỗng
      const startYear = new Date(y, 0, 1);   // 1/1/yyyy
      const endYear = new Date(y, 11, 31);   // 31/12/yyyy
      const fromDate = startYear.toISOString().slice(0, 10);
      const toDate = endYear.toISOString().slice(0, 10);
      return { fromdate: fromDate, todate: toDate };
    }
    if (dateRange === 'custom') {
      if (!startDate || !endDate) {
        return { fromdate: '', todate: '' };
      }
      const start = new Date(startDate);
      const end = new Date(endDate);


      return { fromdate: start.toISOString().slice(0, 10), todate: end.toISOString().slice(0, 10) };
    }

    const d = today.toISOString().slice(0, 10);
    return { fromdate: d, todate: d };
  };
  const range = getDateRange();

  const fetchPaymentRevenua = async () => {
    try {
      setLoading(true);

      const paymentFilter = {
        startDate: range.fromdate || "2025-01-01",
        endDate: range.todate || "2025-12-31",
        status: false
      };
      const response = await GetPaymentList(paymentFilter, pagesizerevenua, currentpagerevenue);
      console.log("Payment Revenua data response:", response);
      setRevenlist(response.data.content);
      setTotalPagesRevenue(response.data.totalPages);

    } catch (error) {

      console.error("Error fetching payment list:", error);
      setError("Unable to load payment data");

      setError("Cannot load payment data");

    } finally {
      setLoading(false);
    }
  };
  const fetchPaymentExpense = async () => {
    try {
      setLoading(true);

      const paymentFilter = {
        startDate: range.fromdate,
        endDate: range.todate,
        status: true
      };
      const response = await GetPaymentList(paymentFilter, pagesizerevenua, currentpagerevenue);
      console.log("Payment Expense data response:", response);
      setExpenselist(response.data.content);
      setTotalPagesExpense(response.data.totalPages);

    } catch (error) {
      console.error("Error fetching payment list:", error);
      setError("Unable to load payment data");
      setError("Cannot load payment data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPaymentRevenua();

  }, [startDate, endDate, month, year, currentpagerevenue,dateRange]);
  useEffect(() => {
    fetchPaymentExpense();

  }, [startDate, endDate, month, year, currentpageexpense,dateRange]);

  useEffect(() => {
    const loadRevenueAndStats = async () => {
      try {
        const data = {
          from: range.fromdate,
          to: range.todate,
          type: dateRange
        };
        const revenueChartRes = await FetchRevenueRefundStats(data);
        const chartData = revenueChartRes.data.map(item => ({
          date: item.date,
          revenue: item.revenue,
          refund: item.refund
        }));
        setChartData(chartData);
      } catch (error) {
        setChartData([]);
      }
    };

    loadRevenueAndStats();
    // eslint-disable-next-line
  }, [startDate, endDate, month, year,range.fromdate, range.todate, dateRange]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        console.log("Fetching revenue and expense data for range:", range.fromdate, range.todate);
        const res = await GetRevenueForOverview({ startDate: range.fromdate, endDate: range.todate });
        const data = res.data;

        console.log("Revenue for overview:", data);
        setIncome(Number(data.revenue) || 0);
        setExpenses(Number(data.expense) || 0);
        setProfit(Number(data.revenue) - Number(data.expense) || 0);
      } catch (err) {

        console.error("Error when fetching statistics data:", err);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [startDate, endDate, month, year,range.fromdate, range.todate, dateRange]);



  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const renderPagination = (total, current, setPage) => {
    if (!total || total <= 0) return null;
    return (
      <div className="custom-pagination">
        <button
          className="page-rect"
          onClick={() => setPage(current - 1)}
          disabled={current === 1}
        >
          <LeftOutlined style={{ marginRight: 6 }} /> Previous
        </button>
        {Array.from({ length: total }, (_, i) => i + 1).map((i) => (
          <button
            key={i}
            className={`page-box${i === current ? ' active' : ''}`}
            onClick={() => setPage(i)}
            aria-current={i === current ? 'page' : undefined}
          >
            {i}
          </button>
        ))}
        <button
          className="page-rect"
          onClick={() => setPage(current + 1)}
          disabled={current === total}
        >
          Next <RightOutlined style={{ marginLeft: 6 }} />
        </button>
      </div>
    );
  };
  function getMaxEndDate(startDate) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0]; // format yyyy-MM-dd
  }

  return (
    <div className="style-dashboard">
      <AdminHeader />
      <div className="admin-revenue-dashboard">
        <div className="dashboard-main" style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
          <div className="dashboard-row stats-row" style={{ gap: 20, marginBottom: 15, marginTop: 15 }}>
            <div className="dashboard-card income-card sleep-card">
              <div className="card-title">{<FaDollarSign size={22} style={{ color: '#16c784' }} />} Income</div>
              <div className="income-placeholder" style={{ fontWeight: 700, fontSize: 22, color: '#0a1d56', opacity: 0.9 }}>
                <p>{income.toLocaleString()} VND</p>
              </div>
            </div>
            <div className="dashboard-card expenses-card sleep-card">
              <div className="card-title">{<FaWallet size={22} style={{ color: '#f8c63a' }} />} Expenses</div>
              <div className="expenses-placeholder" style={{ fontWeight: 700, fontSize: 22, color: '#0a1d56', opacity: 0.9 }}>
                <p>{expenses.toLocaleString()} VND</p>
              </div>
            </div>
            <div className="dashboard-card profit-card sleep-card">
              <div className="card-title">{<FaHandHoldingUsd size={22} style={{ color: '#9c27b0' }} />} Profit</div>
              <div className="profit-placeholder" style={{ fontWeight: 700, fontSize: 22, color: '#0a1d56', opacity: 0.9 }}>
                <p>{profit.toLocaleString()} VND</p>
              </div>
            </div>
          </div>

          <div className="dashboard-row">
            <div className="dashboard-card chart-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>

                <div className="card-title"><FaChartLine size={22} /> Revenue and Refund Statistics</div>


                {/* Date Filter */}
                <div className="admin-date-filter-bar" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  background: '#f5f8ff',
                  borderRadius: 12,
                  padding: '14px 24px',
                  boxShadow: '0 2px 8px rgba(58,111,248,0.04)',
                  marginBottom: 18,
                  flexWrap: 'wrap'
                }}>
                  <div style={{ fontWeight: 600, color: '#3a6ff8', fontSize: 15, marginRight: 8 }}>
                    <FaCalendarAlt style={{ marginRight: 6, color: '#3a6ff8' }} />
                    Filter by:
                  </div>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: 8,
                      border: '1.5px solid #e0e6f7',
                      fontWeight: 600,
                      fontSize: 15,
                      color: '#0a1d56',
                      background: '#fff',
                      outline: 'none',
                      minWidth: 120
                    }}
                  >
                    <option value="today">Today</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                    <option value="custom">Custom</option>
                  </select>

                  {dateRange === 'custom' && (
                    <>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 8,
                          border: '1.5px solid #e0e6f7',
                          fontWeight: 500,
                          fontSize: 15,
                          color: '#0a1d56',
                          background: '#fff',
                          outline: 'none'
                        }}
                      />
                      <span style={{ color: '#64748b', fontWeight: 600 }}>to</span>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate}
                        max={startDate ? getMaxEndDate(startDate) : undefined}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 8,
                          border: '1.5px solid #e0e6f7',
                          fontWeight: 500,
                          fontSize: 15,
                          color: '#0a1d56',
                          background: '#fff',
                          outline: 'none'
                        }}
                      />
                    </>
                  )}

                  {dateRange === 'month' && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 8,
                          border: '1.5px solid #e0e6f7',
                          fontWeight: 500,
                          fontSize: 15,
                          color: '#0a1d56',
                          background: '#fff',
                          outline: 'none'
                        }}
                      >
                        <option value="">Month</option>
                        {months.map((m) => (
                          <option key={m} value={m}>{`Month ${m}`}</option>
                        ))}
                      </select>
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 8,
                          border: '1.5px solid #e0e6f7',
                          fontWeight: 500,
                          fontSize: 15,
                          color: '#0a1d56',
                          background: '#fff',
                          outline: 'none'
                        }}
                      >
                        <option value="">Year</option>
                        {years.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {dateRange === 'year' && (
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1.5px solid #e0e6f7',
                        fontWeight: 500,
                        fontSize: 15,
                        color: '#0a1d56',
                        background: '#fff',
                        outline: 'none'
                      }}
                    >
                      <option value="">Year</option>
                      {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  )}
                </div>

              </div>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={chartData}
                    margin={{ top: 60, right: 30, left: 20, bottom: 80 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e6f7" />
                    <XAxis
                      dataKey="date"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        switch (dateRange) {
                          case 'year':
                            return date.toLocaleDateString('en-US', { month: 'short' }); // "Jun", "Jul"
                          case 'month':
                          case 'custom':
                          case 'today':
                          default:
                            return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }); // "Jul 27"
                        }
                      }}
                      tick={{ fill: '#0a1d56', fontSize: 12 }}
                      axisLine={{ stroke: '#e0e6f7' }}
                      tickLine={{ stroke: '#e0e6f7' }}
                    />
                    <YAxis
                      tickFormatter={(value) => {
                        if (value >= 1000000) {
                          return `${(value / 1000000).toFixed(1)}M đ`;
                        } else if (value >= 1000) {
                          return `${(value / 1000).toFixed(0)}K đ`;
                        }
                        return `${value} đ`;
                      }}
                      tick={{ fill: '#0a1d56', fontSize: 12 }}
                      axisLine={{ stroke: '#e0e6f7' }}
                      tickLine={{ stroke: '#e0e6f7' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        border: '1px solid #e0e6f7',
                        padding: '10px'
                      }}
                      formatter={(value) => [`${value.toLocaleString()} đ`, undefined]}
                      labelFormatter={(label) => {
                        const date = new Date(label);
                        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                      }}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      height={50}
                      iconType="circle"
                      iconSize={10}
                      wrapperStyle={{ paddingBottom: '20px' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#16c784"
                      strokeWidth={3}
                      name="Revenue (VND)"
                      dot={{ stroke: '#16c784', strokeWidth: 2, r: 4, fill: 'white' }}
                      activeDot={{ stroke: '#16c784', strokeWidth: 2, r: 6, fill: 'white' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="refund"
                      stroke="#ff6961"
                      strokeWidth={3}
                      name="Refund (VND)"
                      dot={{ stroke: '#ff6961', strokeWidth: 2, r: 4, fill: 'white' }}
                      activeDot={{ stroke: '#ff6961', strokeWidth: 2, r: 6, fill: 'white' }}
                    />
                  </LineChart>
                </ResponsiveContainer>

              </div>
            </div>
          </div>
        </div>

        {/* Revenue and Expense Lists */}
        <div className="dashboard-row">
          {/* Revenue List */}
          <div className="dashboard-card" style={{ flex: 1 }}>
            <div className="card-title">
              <FaMoneyBillWave size={22} style={{ color: '#16c784' }} /> Income List
            </div>
            <div className="revenue-list">
              {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>Loading data...</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e0e6f7', textAlign: 'left' }}>
                      <th style={{ padding: '12px 8px', color: '#3a6ff8', fontWeight: 600 }}>Date</th>
                      <th style={{ padding: '12px 8px', color: '#3a6ff8', fontWeight: 600 }}>Method</th>
                      <th style={{ padding: '12px 8px', color: '#3a6ff8', fontWeight: 600 }}>Transaction Code</th>
                      <th style={{ padding: '12px 8px', color: '#3a6ff8', fontWeight: 600 }}>Payment Content</th>
                      <th style={{ padding: '12px 8px', color: '#3a6ff8', fontWeight: 600, textAlign: 'right' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenlist.length > 0 ? (
                      revenlist.map((payment) => (
                        <tr key={payment.paymentId}>

                          <td style={{ padding: '12px 8px' }}>{new Date(payment.paymentDate).toLocaleDateString('en-US')}</td>


                          <td style={{ padding: '12px 8px' }}>{payment.paymentMethod || "N/A"}</td>
                          <td style={{ padding: '12px 8px' }}>{payment.paycode || "N/A"}</td>
                          <td style={{ padding: '12px 8px' }}>{payment.contenPayment || "N/A"}</td>
                          <td style={{ padding: '12px 8px', fontWeight: 600, color: '#16c784', textAlign: 'right' }}>
                            {payment.paymentAmount.toLocaleString()} VND
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>

                        <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No income data available</td>

                        <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No income data</td>

                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
            {renderPagination(totalPagesRevenue, currentpagerevenue, setCurrentpagerevenue)}
          </div>
        </div>

        <div className="dashboard-row" style={{ marginTop: '20px' }}>
          {/* Expense List */}
          <div className="dashboard-card" style={{ flex: 1 }}>
            <div className="card-title">
              <FaMoneyBillWave size={22} style={{ color: '#f8c63a' }} /> Expense List
            </div>
            <div className="expense-list">
              {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>Loading data...</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e0e6f7', textAlign: 'left' }}>
                      <th style={{ padding: '12px 8px', color: '#3a6ff8', fontWeight: 600 }}>Date</th>
                      <th style={{ padding: '12px 8px', color: '#3a6ff8', fontWeight: 600 }}>Method</th>
                      <th style={{ padding: '12px 8px', color: '#3a6ff8', fontWeight: 600 }}>Transaction Code</th>
                      <th style={{ padding: '12px 8px', color: '#3a6ff8', fontWeight: 600 }}> Payment Content</th>




                      <th style={{ padding: '12px 8px', color: '#3a6ff8', fontWeight: 600 }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenselist.length > 0 ? (
                      expenselist.map((payment) => (
                        <tr key={payment.paymentId} style={{ borderBottom: '1px solid #f5f8ff' }}>

                          <td style={{ padding: '12px 8px' }}>{new Date(payment.paymentDate).toLocaleDateString('en-US')}</td>

                          <td style={{ padding: '12px 8px' }}>{payment.paymentMethod || "N/A"}</td>
                          <td style={{ padding: '12px 8px' }}>{payment.paycode || "N/A"}</td>
                          <td style={{ padding: '12px 8px' }}>{payment.contenPayment || "N/A"}</td>
                          <td style={{ padding: '12px 8px', fontWeight: 600, color: '#ff6961' }}>
                            {payment.paymentAmount.toLocaleString()} VND
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>

                        <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No expense data available</td>

                        <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No expense data</td>

                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
            {renderPagination(totalPagesExpense, currentpageexpense, setcurrentpageexpense)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenue;