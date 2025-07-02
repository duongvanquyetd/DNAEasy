import { useEffect, useState, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts";
import { 
  Users, TrendingUp, Smartphone, Tablet, Monitor, DollarSign, Globe, ChevronUp, ArrowUpRight, Activity, 
  Calendar, CheckCircle, Clock, AlertCircle, UserCheck, Award, UserPlus, Shield, Briefcase, User, AlertTriangle,
  BarChart2, ArrowUp, Layers, Star
} from "lucide-react";
import { GetRevenueChartData, GetAppointmentCountsByStatus, GetRevenueFlowStats, GetTopBookedServices } from "../../service/revenueService";
import { GetUserRoleStats } from "../../service/user";
import "../../component/css/RevenueChart.css";

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

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Format number as currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format number with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Fetch all necessary data when component mounts or month/year changes
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      
      try {
        // Format dates for API
        const startDate = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`;
        const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();
        const endDate = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
        
        // Set date range for display
        setDateRange({
          start: startDate,
          end: endDate,
          display: `${new Date(startDate).toLocaleString('default', { month: 'short' })} 1 - ${new Date(endDate).toLocaleString('default', { month: 'short' })} ${lastDay}`
        });
        
        // Fetch revenue chart data
        const revenueResponse = await GetRevenueChartData(startDate, endDate);
        if (revenueResponse && revenueResponse.data) {
          processChartData(revenueResponse.data, timeFilter);
        }
        
        // Fetch user role stats
        const userResponse = await GetUserRoleStats(selectedMonth, selectedYear);
        if (userResponse && userResponse.data) {
          setUserRoleStats(userResponse.data);
        }
        
        // Fetch revenue flow stats
        const revenueFlowResponse = await GetRevenueFlowStats(selectedMonth, selectedYear);
        if (revenueFlowResponse && revenueFlowResponse.data) {
          setRevenueFlowStats(revenueFlowResponse.data);
        }
        
        // Fetch appointment status counts
        const appointmentResponse = await GetAppointmentCountsByStatus();
        if (appointmentResponse && appointmentResponse.data) {
          // Map API response fields to our state
          const apiData = appointmentResponse.data;
          setAppointmentStatusCounts({
            total: apiData.total || 0,
            completed: apiData.completed || 0,
            inProgress: apiData.inProgress || 0,
            cancelled: apiData.cancelled || 0,
            refunded: apiData.refunded || 0
          });
        }
        
        // Fetch top booked services
        const topServicesResponse = await GetTopBookedServices(selectedMonth, selectedYear);
        if (topServicesResponse && topServicesResponse.data) {
          console.log("Top services data:", topServicesResponse.data);
          // API trả về mảng trực tiếp, không cần .data nữa
          setTopServices(Array.isArray(topServicesResponse.data) 
            ? topServicesResponse.data.slice(0, 10) 
            : topServicesResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllData();
  }, [selectedMonth, selectedYear]);

  // Update chart when timeFilter changes
  useEffect(() => {
    if (data.length > 0) {
      processChartData(data, timeFilter);
    }
  }, [timeFilter]);
  
  // Process chart data from API
  const processChartData = (apiData, viewType) => {
    console.log("Processing chart data for view type:", viewType, apiData);
    
    if (!Array.isArray(apiData)) {
      console.error("API data is not an array:", apiData);
      return;
    }
    
    // Calculate total revenue
    let total = 0;
    
    // Transform API data for chart
    const chartData = apiData.map(item => {
      const revenue = Number(item.revenue) || 0;
      total += revenue;
      
      // Format date for display
      const date = new Date(item.date);
      const formattedDate = `${date.getDate()} ${date.toLocaleDateString('en-US', { month: 'short' })}`;
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      return {
        date: item.date,
        formattedDate: formattedDate,
        day: dayName,
        revenue: revenue,
        formattedRevenue: formatCurrency(revenue)
      };
    });
    
    // Sort by date
    chartData.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Calculate daily change if possible
    if (chartData.length >= 2) {
      const lastDay = chartData[chartData.length - 1].revenue;
      const prevDay = chartData[chartData.length - 2].revenue;
      
      if (prevDay > 0) {
        const change = ((lastDay - prevDay) / prevDay) * 100;
        setDailyChange(change.toFixed(1));
      }
    }
    
    setData(chartData);
    setTotalRevenue(total);
  };

  // Format X-axis labels
  const formatXAxis = (tickItem) => {
    if (timeFilter === 'Week') {
      // For week view, return day name
      return tickItem; // tickItem should be the day name
    } else {
      // For month view, format the date
      const parts = tickItem.split(' ');
      if (parts.length >= 2) {
        return `${parts[0]}/${parts[1].substring(0, 3)}`;
      }
      return tickItem;
    }
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].payload.formattedDate}</p>
          <p className="tooltip-value">
            <span className="tooltip-label">Revenue: </span>
            <span className="tooltip-amount">{payload[0].payload.formattedRevenue}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom active dot for the chart
  const CustomActiveDot = (props) => {
    const { cx, cy, stroke, dataKey } = props;
    return (
      <svg x={cx - 8} y={cy - 8} width={16} height={16} viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="6" stroke={stroke} strokeWidth="2" fill="white" />
        <circle cx="8" cy="8" r="3" stroke="none" fill={stroke} />
      </svg>
    );
  };

  // Appointment status data
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
      icon: Activity
    }
  ];

  // User role data
  const userRoleData = [
    { 
      name: "Staff", 
      value: userRoleStats.staff || 0,
      color: "#3b82f6", 
      icon: Briefcase
    },
    { 
      name: "Manager", 
      value: userRoleStats.manager || 0,
      color: "#10b981", 
      icon: Shield
    },
    { 
      name: "Admin", 
      value: userRoleStats.admin || 0,
      color: "#f59e0b", 
      icon: User
    }
  ];

  // Revenue flow data
  const revenueFlowData = [
    { 
      name: "Income", 
      amount: revenueFlowStats.income || 0,
      color: "#10b981"
    },
    { 
      name: "Expenses", 
      amount: revenueFlowStats.expenses || 0,
      color: "#ef4444"
    },
    { 
      name: "Profit", 
      amount: revenueFlowStats.profit || 0,
      color: "#3b82f6"
    }
  ];

  // Get current month and year
  const getCurrentMonthYear = () => {
    return new Date(selectedYear, selectedMonth - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Handle month change
  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  // Handle year change
  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  // Handle time filter change
  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
  };

  // Filter data for week view if needed
  const getFilteredData = () => {
    if (timeFilter === 'Week') {
      // For week view, get the last 7 days of data
      if (data.length <= 7) return data;
      return data.slice(data.length - 7);
    }
    return data;
  };

  return (
    <div className="revenue-chart-container">
      {/* Month/Year selector */}
     

      {/* Stats Boxes - đưa lên trên đầu */}
      <div className="stats-boxes">
        {/* Customers Box - with user roles */}
        <div className="stat-box">
          <div className="stat-icon">
            <Users size={18} />
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value">{formatNumber(userRoleStats.total || 0)}</div>
          <div className="stat-info">
            <span>{getCurrentMonthYear()}</span>
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
        
        {/* Revenue Box - with revenue flow */}
        <div className="stat-box">
          <div className="stat-icon revenue-icon">
            <DollarSign size={18} />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">{formatCurrency(revenueFlowStats.total || 0)}</div>
          <div className="stat-info">
            <span>{getCurrentMonthYear()}</span>
            <span className="world-icon">
              <Globe size={12} /> WorldWide
            </span>
          </div>
          <div className="stat-revenue-flow">
            {revenueFlowData.map((item, index) => (
              <div key={index} className="flow-item">
                <div style={{ width: '16px', height: '16px', backgroundColor: item.color, borderRadius: '50%' }} />
                <span>
                  {item.name} <strong>{formatCurrency(item.amount)}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Appointments Box */}
        <div className="stat-box">
          <div className="stat-icon appointment-icon">
            <Calendar size={18} />
          </div>
          <div className="stat-title">Appointments</div>
          <div className="stat-value">{formatNumber(appointmentStatusCounts.total || 0)}</div>
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
      
      {/* Chart Area - chuyển xuống dưới */}
      <div className="chart-area">
        {/* Sales value header */}
        <div className="sales-header">
          <div className="sales-info">
            <h2 className="sales-title">Sales Value</h2>
            <div className="sales-value">{formatCurrency(totalRevenue)}</div>
            <div className="sales-change">
              <span>Yesterday</span>
              <span className={`change-value ${parseFloat(dailyChange) >= 0 ? 'positive' : 'negative'}`}>
                <ArrowUpRight size={16} />
                {dailyChange}%
              </span>
            </div>
          </div>
          <div className="time-filter">
            <button 
              className={`filter-btn ${timeFilter === 'Month' ? 'active' : ''}`}
              onClick={() => handleTimeFilterChange('Month')}
            >
              Month
            </button>
            <button 
              className={`filter-btn ${timeFilter === 'Week' ? 'active' : ''}`}
              onClick={() => handleTimeFilterChange('Week')}
            >
              Week
            </button>
          </div>
        </div>
        
        {/* Chart */}
        <div className="chart-wrapper">
          {isLoading ? (
            <div className="loading-spinner">Loading revenue data...</div>
          ) : (
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={getFilteredData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                    dataKey={timeFilter === 'Week' ? "day" : "formattedDate"} 
                    tickLine={false}
                  axisLine={false}
                    tickFormatter={formatXAxis}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis
                    tickFormatter={(value) => `${value / 1000000}M`}
                    tickLine={false}
                  axisLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                  fill="url(#colorRevenue)"
                    activeDot={<CustomActiveDot />}
                />
              </AreaChart>
            </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
      
      {/* Top Services Table */}
      <div className="top-services-section">
        <div className="section-header">
          <div className="section-title">
            <BarChart2 size={20} />
            <h2>Top 10 Most Booked Services</h2>
          </div>
          <div className="section-period">{getCurrentMonthYear()}</div>
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
