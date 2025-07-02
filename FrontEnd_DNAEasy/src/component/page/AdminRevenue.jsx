import React, { useState } from "react";
import "./../css/AdminRevenue.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FaChartLine, FaDollarSign, FaArrowUp, FaArrowDown, FaUsers } from "react-icons/fa";
import AdminHeader from '../AdminHeader';

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
  day: { label: 'Day', data: dataByDay },
  month: { label: 'Month', data: dataByMonth },
  year: { label: 'Year', data: dataByYear },
};

const statsData = {
  statistics: {
    title: 'Total Transactions',
    value: 1280,
    icon: <FaUsers size={22} style={{ color: '#3a6ff8' }} />,
    change: 5.2,
    isUp: true
  },
  expenses: {
    title: 'Total Expenses',
    value: 45141,
    icon: <FaDollarSign size={22} style={{ color: '#f8c63a' }} />,
    change: 1.7,
    isUp: true
  }
};

const AdminRevenue = () => {
  const [filter, setFilter] = useState('month');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  let chartData = FILTERS[filter].data;

  if (filter === 'day' && (fromDate || toDate)) {
    chartData = chartData.filter(item => {
      const d = item.name;
      return (!fromDate || d >= fromDate) && (!toDate || d <= toDate);
    });
  }

  return (
    <div className="admin-revenue-dashboard">
      <AdminHeader />
      <div className="dashboard-content">
        <div className="dashboard-row dashboard-stats">
          <div className="dashboard-card stats-card">
            <div className="card-title">{statsData.statistics.icon} {statsData.statistics.title}</div>
            <div className="stats-value">
              {statsData.statistics.value.toLocaleString()}
              <span className={statsData.statistics.isUp ? 'value-up' : 'value-down'}>
                {statsData.statistics.isUp ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(statsData.statistics.change)}%
              </span>
            </div>
          </div>
          <div className="dashboard-card expenses-card">
            <div className="card-title">{statsData.expenses.icon} {statsData.expenses.title}</div>
            <div className="stats-value">
              ${statsData.expenses.value.toLocaleString()}
              <span className={statsData.expenses.isUp ? 'value-up' : 'value-down'}>
                {statsData.expenses.isUp ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(statsData.expenses.change)}%
              </span>
            </div>
          </div>
        </div>
        <div className="dashboard-row dashboard-chart">
          <div className="dashboard-card chart-card">
            <div className="chart-header">
              <div className="card-title"><FaChartLine size={22} /> Revenue and Refund Statistics</div>
              <div className="chart-controls">
                <select
                  value={filter}
                  onChange={e => { setFilter(e.target.value); setFromDate(''); setToDate(''); }}
                  className="filter-select"
                >
                  <option value="day">By Day</option>
                  <option value="month">By Month</option>
                  <option value="year">By Year</option>
                </select>
                {filter === 'day' && (
                  <>
                    <input
                      type="date"
                      value={fromDate}
                      min={chartData.length ? chartData[0].name : ''}
                      max={toDate || chartData[chartData.length - 1]?.name}
                      onChange={e => setFromDate(e.target.value)}
                      className="date-input"
                    />
                    <span className="date-separator">to</span>
                    <input
                      type="date"
                      value={toDate}
                      min={fromDate || chartData[0].name}
                      max={chartData.length ? chartData[chartData.length - 1].name : ''}
                      onChange={e => setToDate(e.target.value)}
                      className="date-input"
                    />
                  </>
                )}
              </div>
            </div>
            <div className="chart-placeholder">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e6f7" />
                  <XAxis dataKey="name" stroke="#0a1d56" />
                  <YAxis stroke="#0a1d56" />
                  <Tooltip formatter={v => v.toLocaleString() + " ₫"} />
                  <Legend />
                  <Line type="monotone" dataKey="Revenue" name="Revenue" stroke="#0a1d56" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Refund" name="Refund" stroke="#f8c63a" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
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