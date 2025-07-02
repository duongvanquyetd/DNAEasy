import React, { useState, useEffect, useMemo } from 'react';


import { 
  Users, DollarSign, Globe, ChevronUp, ArrowUpRight, 
  Calendar, CheckCircle, Clock, AlertCircle, Shield, Briefcase, User,
  BarChart2, Star, ChevronDown
} from "lucide-react";

// import * as revenueAPI from "../../service/revenue";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area
} from 'recharts';
import "../../component/css/RevenueChart.css";

import { GetRevenueForOverview } from '../../service/revenue';
import { GetTop5Service } from '../../service/service';
import { ReportUser } from '../../service/user';
import { AppointmnetforAdminOverview } from '../../service/appointment';
import { ChartOverview } from '../../service/payment';



const RevenueChart = () => {
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [dateRange, setDateRange] = useState({ 
    start: '', 
    end: '',
    display: 'Jun 1 - Jun 30'
  });
  const [timeFilter, setTimeFilter] = useState('Month');
  const [dailyChange, setDailyChange] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Current month (1-12)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Current year
  const [topServices, setTopServices] = useState([]);
  const [chartKey, setChartKey] = useState(Date.now()); // Key for chart re-render

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
  const [revenueFlowData, setRevenueFlowData] = useState([]);
  useEffect(() => {

    
    featchRevenueFlowStats();
    featchTopServices();
    fetchUserRoleStats();
    fetchAppointmentStatusCounts();
    fetchdatachart();
    setIsLoading(false);
 }, []);


 const featchRevenueFlowStats = async () => {
  GetRevenueForOverview({startPeriod:"2024-01", endPeriod:"2025-12"}).then((response) => {
      
    console.log("Revenue for overview:", response.data);
        
      const updatedStats = {
        total: response.data.revenue || 0,
        income: response.data.revenue || 0,
        expenses: response.data.totalExpense || 0,
        profit: response.data.remain || 0 
      };
      
      console.log("Updated revenueFlowStats with:", updatedStats);
      setRevenueFlowStats(updatedStats);
     

    }
   ).catch((error)=>{
    console.error("Error fetching revenue flow stats:", error);
   })
 }


const featchTopServices = async () => {

  GetTop5Service().then((response) => {
    console.log("Top 5 service:", response.data);
    setTopServices(response.data);
   }).catch((error)=>{
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


    AppointmnetforAdminOverview().then((response)=>{
      console.log("Appointment status counts:", response.data);
      setAppointmentStatusCounts({
        total: response.data.total,
        completed: response.data.completed,
        inProgress: response.data.inProgress,
        cancelled: response.data.cancelled,
        refunded: response.data.refunded
      });
    }).catch((error)=>{
      console.error("Error fetching appointment status counts:", error);
    })
  }
  const fetchdatachart = () => {
    console.log("fetchdatachart==========================");
    const today = new Date();
    const enddate =today.toISOString().slice(0,10);
    const startdate =new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().slice(0,10);
    console.log("startdate:", startdate);
    console.log("enddate:", enddate);
    ChartOverview({startPeriod:startdate, endPeriod:enddate}).then((response)=>{
      console.log("Appointment status counts:", response.data);
      setdatachart(response.data);
    }).catch((error)=>{
      console.error("Error fetching appointment status counts:", error);
    })
  }
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

  return (
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
      <div style={{ width: '100%', height: 400 }}>
        <div className="chart-title">
          <h3>Biểu đồ doanh thu theo ngày</h3>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={datachart} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis 
              tickFormatter={value => {
                if (value >= 1000000) {
                  return `${(value / 1000000).toFixed(1)}M`;
                } else if (value >= 1000) {
                  return `${(value / 1000).toFixed(0)}K`;
                }
                return value;
              }} 
            />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#6366f1" 
              strokeWidth={3}
              fill="url(#colorRevenue)" 
              fillOpacity={0.3}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#6366f1" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2, fill: "white" }}
              activeDot={{ r: 6, strokeWidth: 2, fill: "white" }}
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
  );
};

export default RevenueChart;