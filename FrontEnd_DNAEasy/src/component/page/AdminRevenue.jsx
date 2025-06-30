import React, { useState } from "react";
import "./../css/AdminRevenue.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from "recharts";
import { FaChartLine, FaDollarSign, FaWallet, FaArrowUp, FaArrowDown, FaUsers } from "react-icons/fa";

// TODO: CALL API endpoint để lấy dữ liệu biểu đồ doanh thu/hoàn tiền theo ngày/tháng/năm
// Ví dụ: GET /api/revenue?type=day|month|year&from=yyyy-mm-dd&to=yyyy-mm-dd
// Hiện tại đang dùng mock data, khi có API chỉ cần fetch và set lại dataByDay, dataByMonth, dataByYear
const dataByDay = [
  { name: '2024-06-01', Revenue: 1200, Refund: 200 },
  { name: '2024-06-02', Revenue: 1500, Refund: 150 },
  { name: '2024-06-03', Revenue: 1800, Refund: 180 },
  { name: '2024-06-04', Revenue: 2200, Refund: 220 },
  { name: '2024-06-05', Revenue: 2000, Refund: 170 },
  { name: '2024-06-06', Revenue: 2500, Refund: 210 },
  { name: '2024-06-07', Revenue: 2300, Refund: 190 },
];

const dataByMonth = [
  { name: 'Jan', Revenue: 12000, Refund: 2000 },
  { name: 'Feb', Revenue: 15000, Refund: 1500 },
  { name: 'Mar', Revenue: 18000, Refund: 1800 },
  { name: 'Apr', Revenue: 22000, Refund: 2200 },
  { name: 'May', Revenue: 20000, Refund: 1700 },
  { name: 'Jun', Revenue: 25000, Refund: 2100 },
  { name: 'Jul', Revenue: 23000, Refund: 1900 },
  { name: 'Aug', Revenue: 27000, Refund: 2300 },
  { name: 'Sep', Revenue: 26000, Refund: 2000 },
  { name: 'Oct', Revenue: 30000, Refund: 2500 },
  { name: 'Nov', Revenue: 32000, Refund: 2400 },
  { name: 'Dec', Revenue: 35000, Refund: 2600 },
];

const dataByYear = [
  { name: '2020', Revenue: 120000, Refund: 20000 },
  { name: '2021', Revenue: 150000, Refund: 15000 },
  { name: '2022', Revenue: 180000, Refund: 18000 },
  { name: '2023', Revenue: 220000, Refund: 22000 },
  { name: '2024', Revenue: 200000, Refund: 17000 },
];

const FILTERS = {
  day: { label: 'Ngày', data: dataByDay },
  month: { label: 'Tháng', data: dataByMonth },
  year: { label: 'Năm', data: dataByYear },
};

// TODO: CALL API endpoint để lấy số liệu tổng giao dịch, tổng chi phí, tổng số dư
// Ví dụ: GET /api/revenue/summary
// Hiện tại đang dùng mock data, khi có API chỉ cần fetch và set lại statsData
const statsData = {
  statistics: {
    title: 'Tổng giao dịch',
    value: 1280,
    icon: <FaUsers size={22} style={{color: '#3a6ff8'}} />, // tổng khách hàng/giao dịch
    change: 5.2, // % tăng
    isUp: true
  },
  expenses: {
    title: 'Tổng chi phí',
    value: 45141,
    icon: <FaDollarSign size={22} style={{color: '#f8c63a'}} />, // chi phí
    change: 1.7, // % tăng
    isUp: true
  }
};

const AdminRevenue = () => {
  // TODO: Khi tích hợp API, dùng useEffect để fetch dữ liệu và setState cho các biến trên
  const [filter, setFilter] = useState('month');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  let chartData = FILTERS[filter].data;

  // Lọc dữ liệu theo ngày nếu filter là 'day' và đã chọn khoảng ngày
  if (filter === 'day' && (fromDate || toDate)) {
    chartData = chartData.filter(item => {
      const d = item.name;
      return (!fromDate || d >= fromDate) && (!toDate || d <= toDate);
    });
  }

  return (
    <div className="admin-revenue-dashboard">
      <div className="dashboard-header" style={{marginBottom: 20, padding: '24px 32px 16px 32px'}}>
        <FaChartLine size={30} style={{marginRight: 10, color: '#fff', filter: 'drop-shadow(0 2px 8px #3a6ff8)'}} />
        <h2 style={{fontSize: '2rem', margin: 0, letterSpacing: 0.5}}>Admin Revenue Dashboard</h2>
      </div>
      <div className="dashboard-main">
        <div className="dashboard-row" style={{gap: 40, marginBottom: 18}}>
          {/* Statistics card */}
          <div className="dashboard-card stats-card sleep-card">
            <div className="card-title">{statsData.statistics.icon} {statsData.statistics.title}</div>
            <div className="stats-placeholder" style={{fontWeight: 700, fontSize: 22, color: '#0a1d56', opacity: 0.9}}>
              {statsData.statistics.value.toLocaleString()}
              <span style={{fontSize: 15, marginLeft: 10, fontWeight: 700, color: statsData.statistics.isUp ? '#16c784' : '#ff4d4f'}}>
                {statsData.statistics.isUp ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(statsData.statistics.change)}%
              </span>
            </div>
          </div>
          {/* Expenses card */}
          <div className="dashboard-card expenses-card sleep-card">
            <div className="card-title">{statsData.expenses.icon} {statsData.expenses.title}</div>
            <div className="expenses-placeholder" style={{fontWeight: 700, fontSize: 22, color: '#0a1d56', opacity: 0.9}}>
              ${statsData.expenses.value.toLocaleString()}
              <span style={{fontSize: 15, marginLeft: 10, fontWeight: 700, color: statsData.expenses.isUp ? '#16c784' : '#ff4d4f'}}>
                {statsData.expenses.isUp ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(statsData.expenses.change)}%
              </span>
            </div>
          </div>
        </div>
        <div className="dashboard-row">
          <div className="dashboard-card chart-card" style={{flex: 1}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12}}>
              <div className="card-title"><FaChartLine size={22} /> Thống kê doanh thu, hoàn tiền</div>
              <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <select
                  value={filter}
                  onChange={e => { setFilter(e.target.value); setFromDate(''); setToDate(''); }}
                  style={{padding: '6px 14px', borderRadius: 8, border: '1.5px solid #e0e6f7', fontWeight: 600, fontSize: 15, color: '#0a1d56', background: '#f5f8ff', outline: 'none', boxShadow: '0 2px 8px rgba(58,111,248,0.04)'}}
                >
                  <option value="day">Theo ngày</option>
                  <option value="month">Theo tháng</option>
                  <option value="year">Theo năm</option>
                </select>
                {filter === 'day' && (
                  <>
                    <input
                      type="date"
                      value={fromDate}
                      min={chartData.length ? chartData[0].name : ''}
                      max={toDate || chartData[chartData.length-1]?.name}
                      onChange={e => setFromDate(e.target.value)}
                      style={{padding: '6px 10px', borderRadius: 8, border: '1.5px solid #e0e6f7', fontWeight: 500, fontSize: 15, color: '#0a1d56', background: '#f5f8ff', outline: 'none'}}
                    />
                    <span style={{margin: '0 4px'}}>đến</span>
                    <input
                      type="date"
                      value={toDate}
                      min={fromDate || chartData[0].name}
                      max={chartData.length ? chartData[chartData.length-1].name : ''}
                      onChange={e => setToDate(e.target.value)}
                      style={{padding: '6px 10px', borderRadius: 8, border: '1.5px solid #e0e6f7', fontWeight: 500, fontSize: 15, color: '#0a1d56', background: '#f5f8ff', outline: 'none'}}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="chart-placeholder" style={{height: 320, background: 'none', color: 'inherit', padding: 0}}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e6f7" vertical={true} />
                  <XAxis dataKey="name" stroke="#0a1d56" />
                  <YAxis stroke="#0a1d56" />
                  <Tooltip formatter={v => v.toLocaleString()+" ₫"} />
                  <Legend />
                  <Line type="monotone" dataKey="Revenue" name="Doanh thu" stroke="#0a1d56" strokeWidth={3} dot={{r:4}} activeDot={{r:6}} />
                  <Line type="monotone" dataKey="Refund" name="Hoàn tiền" stroke="#f8c63a" strokeWidth={3} dot={{r:4}} activeDot={{r:6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenue; 