import React, { useState, useEffect, useMemo } from 'react';


import {
  Users, DollarSign, Globe, ChevronUp, ArrowUpRight,
  Calendar, CheckCircle, Clock, AlertCircle, Shield, Briefcase, User,
  BarChart2, Star, ChevronDown
} from "lucide-react";

// import * as revenueAPI from "../../service/revenue";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area,
  PieChart, Pie, Cell,
  Legend
} from 'recharts';
import "../../component/css/RevenueChart.css";

import { GetTop5Service } from '../../service/service';
import { ReportUser } from '../../service/user';
import { AppointmnetforAdminOverview } from '../../service/appointment';
import { ChartOverview, FetchRevenueRefundStats, GetRevenueForOverview } from '../../service/payment';
import AdminHeader from '../AdminHeader';



const RevenueChart = () => {
  // const [data, setData] = useState([]);
  // const [totalRevenue, setTotalRevenue] = useState(0);
  const [dateRange, setDateRange] = useState({
    start: '',
    end: '',
    display: 'Jun 1 - Jun 30'
  });
  // const [timeFilter, setTimeFilter] = useState('Month');
  // const [dailyChange, setDailyChange] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Current month (1-12)
  // const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Current year
  const [topServices, setTopServices] = useState([]);
  // const [chartKey, setChartKey] = useState(Date.now()); // Key for chart re-render
  const [chartData, setChartData] = useState([]);
  // State for statistics
  const [userRoleStats, setUserRoleStats] = useState({
    total: 0,
    staff: 0,
    manager: 0,
    admin: 0
  });

  const [revenueFlowStats, setRevenueFlowStats] = useState({
    total: 0,
    income: 0,
    expenses: 0,
    profit: 0
  });

  const [appointmentStatusCounts, setAppointmentStatusCounts] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    cancelled: 0,
    refunded: 0
  });
  const [datachart, setdatachart] = useState([]);


  // Hàm format tiền VND
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(value);
  };
  // State for revenue flow data
  // const [revenueFlowData, setRevenueFlowData] = useState([]);
  useEffect(() => {


    featchRevenueFlowStats();
    featchTopServices();
    fetchUserRoleStats();
    fetchAppointmentStatusCounts();
    fetchdatachart();
    setIsLoading(false);
  }, []);


  const featchRevenueFlowStats = async () => {
    const today = new Date();
    const y = today.getFullYear();
    const startYear = new Date(y, 0, 1);
    const endYear = new Date(y, 11, 31);
    const fromDate = startYear.toISOString().slice(0, 10);
    const toDate = endYear.toISOString().slice(0, 10);
    GetRevenueForOverview({ startDate: fromDate, endDate: toDate }).then((response) => {

      // console.log("Revenue for overview:", response.data);
      // console.log("API revenue value:", response.data.revenue);
      // console.log("API totalExpense value:", response.data.totalExpense);
      // console.log("API remain value:", response.data.remain);

      const updatedStats = {
        total: response.data.revenue || 0,
        income: response.data.revenue || 0,
        expenses: response.data.expense || 0,
        profit: response.data.revenue - response.data.expense || 0
      };

      console.log("Updated revenueFlowStats with:", updatedStats);
      setRevenueFlowStats(updatedStats);


    }
    ).catch((error) => {
      console.error("Error fetching revenue flow stats:", error);
    })
  }


  const featchTopServices = async () => {

    GetTop5Service().then((response) => {
      console.log("Top 5 service:", response.data);
      setTopServices(response.data);
    }).catch((error) => {
      console.error("Error fetching top services:", error);
    })

  }
  const fetchUserRoleStats = async () => {
    const response = await ReportUser();
    console.log("User role stats:", response.data);
    setUserRoleStats({
      total: response.data.total,
      staff: response.data.staff,
      manager: response.data.manager,
      admin: response.data.admin
    });

  }
  const fetchAppointmentStatusCounts = async () => {


    AppointmnetforAdminOverview().then((response) => {
      console.log("Appointment status counts:", response.data);
      setAppointmentStatusCounts({
        total: response.data.total,
        completed: response.data.completed,
        inProgress: response.data.inProgress,
        cancelled: response.data.cancelled,
        refunded: response.data.refunded
      });
    }).catch((error) => {
      console.error("Error fetching appointment status counts:", error);
    })
  }
  
    const fetchdatachart = async () => {
      try {

        const today = new Date();

        // Lấy thứ trong tuần: 0 (Sunday) -> 6 (Saturday)
        const dayOfWeek = today.getDay();

        // Tính ngày đầu tuần (Monday)
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

        // Tính ngày cuối tuần (Sunday)
        const endOfWeek = new Date(today);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        // Format thành yyyy-MM-dd (nếu backend yêu cầu)
        const formatDate = (date) => date.toISOString().split('T')[0];

        const data = {
          from: formatDate(startOfWeek),
          to: formatDate(endOfWeek),
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


  const appointmentStatusData = [
    {
      name: "Completed",
      value: appointmentStatusCounts.total ? Math.round((appointmentStatusCounts.completed / appointmentStatusCounts.total) * 100) : 0,
      count: appointmentStatusCounts.completed || 0,
      color: "#10b981",
      icon: CheckCircle
    },
    {
      name: "In Progress",
      value: appointmentStatusCounts.total ? Math.round((appointmentStatusCounts.inProgress / appointmentStatusCounts.total) * 100) : 0,
      count: appointmentStatusCounts.inProgress || 0,
      color: "#3b82f6",
      icon: Clock
    },
    {
      name: "Cancelled",
      value: appointmentStatusCounts.total ? Math.round((appointmentStatusCounts.cancelled / appointmentStatusCounts.total) * 100) : 0,
      count: appointmentStatusCounts.cancelled || 0,
      color: "#ef4444",
      icon: AlertCircle
    },
    {
      name: "Refunded",
      value: appointmentStatusCounts.total ? Math.round((appointmentStatusCounts.refunded / appointmentStatusCounts.total) * 100) : 0,
      count: appointmentStatusCounts.refunded || 0,
      color: "#f59e0b",
      icon: AlertCircle
    }

  ];

  const userRoleData = [
    { name: "Staff", value: userRoleStats.staff || 0, color: "#3b82f6", icon: Briefcase },
    { name: "Manager", value: userRoleStats.manager || 0, color: "#10b981", icon: Shield },
    { name: "Admin", value: userRoleStats.admin || 0, color: "#f59e0b", icon: User }
  ];

  // Tạo dữ liệu cho biểu đồ tròn, xử lý giá trị âm và 0
  const getRevenuePieData = () => {
    // Lấy giá trị dương cho biểu đồ tròn
    const income = Math.max(0, revenueFlowStats.income || 0);
    const expenses = Math.max(0, revenueFlowStats.expenses || 0);
    const profit = Math.max(0, revenueFlowStats.profit || 0);

    const total = income + expenses + profit;
    if (total <= 0) return [];


    const minDisplayValue = total * 0.01; // Use 1% of the total as minimum value for visibility

    return [
      { name: 'Income', value: income > 0 ? income : minDisplayValue, color: "#10b981", actualValue: income },
      { name: 'Expenses', value: expenses > 0 ? expenses : minDisplayValue, color: "#ef4444", actualValue: expenses },
      { name: 'Profit', value: profit > 0 ? profit : minDisplayValue, color: "#3b82f6", actualValue: profit }
    ].filter(item => item.actualValue >= 0); // Only filter out negative values
  };

  return (
    <div className="style-dashboard">
      {/* Sidebar Header */}
      <AdminHeader />

      <div className="revenue-chart-container">


        {/* Stats Boxes */}
        <div className="stats-boxes">
          {/* Users Box */}
          <div className="stat-box">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div className="stat-title">Users</div>
            <div className="stat-value">{(userRoleStats.total || 0)}</div>
            <div className="stat-info">

              <span className="world-icon">
                <Globe size={12} /> WorldWide
              </span>
            </div>
            <div className="stat-user-roles">
              {userRoleData.map((item, index) => (
                <div key={index} className="role-item">
                  <item.icon size={16} color={item.color} />
                  <span>
                    {item.name} <strong>{item.value}</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Box */}
          <div className="stat-box">
            <div className="stat-icon revenue-icon">
              <DollarSign size={24} />
            </div>
            <div className="stat-title">Revenue</div>
            <div className="stat-value">
              {revenueFlowStats && revenueFlowStats.total ? revenueFlowStats.total.toLocaleString() : '0'}
            </div>
            <div className="stat-info">
              <span className="world-icon">
                <Globe size={12} /> WorldWide
              </span>
            </div>

            <div className="revenue-box-content">
              <div className="stat-revenue-flow">
                <div className="flow-item">
                  <div style={{ width: '16px', height: '16px', backgroundColor: "#10b981", borderRadius: '50%' }} />
                  <span>
                    Income <strong>{revenueFlowStats && revenueFlowStats.income ? revenueFlowStats.income.toLocaleString() : '0'}</strong>
                  </span>
                </div>
                <div className="flow-item">
                  <div style={{ width: '16px', height: '16px', backgroundColor: "#ef4444", borderRadius: '50%' }} />
                  <span>
                    Expenses <strong>{revenueFlowStats && revenueFlowStats.expenses ? revenueFlowStats.expenses.toLocaleString() : '0'}</strong>
                  </span>
                </div>
                <div className="flow-item">
                  <div style={{ width: '16px', height: '16px', backgroundColor: "#3b82f6", borderRadius: '50%' }} />
                  <span>
                    Profit <strong>{revenueFlowStats && revenueFlowStats.profit ? revenueFlowStats.profit.toLocaleString() : '0'}</strong>
                  </span>
                </div>
              </div>

              <div className="revenue-pie-chart">
                {getRevenuePieData().length > 0 ? (
                  <ResponsiveContainer width="100%" height={120}>
                    <PieChart>
                      <Pie
                        data={getRevenuePieData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={45}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {getRevenuePieData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => {
                        // Use actualValue if available, otherwise use the display value
                        const actualValue = props.payload.actualValue !== undefined ? props.payload.actualValue : value;
                        return formatCurrency(actualValue);
                      }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="no-data-pie">
                    <span>Not have data</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Appointments Box */}
          <div className="stat-box">
            <div className="stat-icon appointment-icon">
              <Calendar size={24} />
            </div>
            <div className="stat-title">Appointments</div>
            <div className="stat-value">{(appointmentStatusCounts.total || 0)}</div>
            <div className="stat-info">
              <span>{dateRange.display || 'Loading...'}</span>
              <span className="world-icon">
                <Globe size={12} /> WorldWide
              </span>
            </div>
            <div className="stat-appointment-status">
              {appointmentStatusData.map((item, index) => (
                <div key={index} className="status-item">
                  <item.icon size={16} color={item.color} />
                  <span>
                    {item.name} <strong>{item.count} ({item.value}%)</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div style={{ width: '100%', height: 400, marginBottom: '45px' }}>
            <div className="chart-title">
              <h3>Revenua follow week</h3>
            </div>
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
        {/* Top Services Table */}
        <div className="top-services-section">
          <div className="section-header">
            <div className="section-title">
              <BarChart2 size={20} />
              <h2>Top 10 Most Booked Services</h2>
            </div>

          </div>

          <div className="services-table-container">
            {isLoading ? (
              <div className="loading-spinner">Loading services data...</div>
            ) : (
              <table className="services-table">
                <thead>
                  <tr>
                    <th className="rank-column">#</th>
                    <th className="name-column">Service Name</th>
                    <th className="count-column">Total Appointments</th>
                  </tr>
                </thead>
                <tbody>
                  {topServices.length > 0 ? (
                    topServices.map((service, index) => (
                      <tr key={index} className={index < 3 ? 'top-rank' : ''}>
                        <td className="rank-column">
                          <div className={`rank-badge rank-${index + 1}`}>
                            {index < 3 ? <Star size={12} /> : index + 1}
                          </div>
                        </td>
                        <td className="name-column">{service.serviceName}</td>
                        <td className="count-column">{service.totalAppointments}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="no-data">No services data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;