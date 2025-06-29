import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts";
import { Users, TrendingUp, Smartphone, Tablet, Monitor, DollarSign, Globe, ChevronUp, ArrowUpRight, Activity } from "lucide-react";
import axios from "axios";
import { GetAppointmentStatistics } from "../../service/appointment";
import { CountAllUser } from "../../service/user";
import UserStatBox from "./UserStatBox";  
import "../../component/css/RevenueChart.css";

const RevenueChart = () => {
const [data, setData] = useState([]);
const [userCount, setUserCount] = useState(0);
const [totalRevenue, setTotalRevenue] = useState(0);
const [dateRange, setDateRange] = useState({ start: '', end: '' });
const [userGrowth, setUserGrowth] = useState(0);
const [revenueGrowth, setRevenueGrowth] = useState(0);
const [timeFilter, setTimeFilter] = useState('Month');
const [dailyChange, setDailyChange] = useState(0);
const [isLoading, setIsLoading] = useState(true);

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const mockData = days.map(day => ({ day }));

useEffect(() => {
    fetchData(timeFilter);
}, [timeFilter]);

const fetchData = async (period) => {
  setIsLoading(true);
  try {
    // Get current date for the end date
    const endDate = new Date();
    // Calculate start date based on selected period
    const startDate = new Date();
    
    if (period === 'Week') {
      startDate.setDate(endDate.getDate() - 7);
    } else {
      startDate.setMonth(endDate.getMonth() - 1);
    }

    // Previous period dates
    const prevEndDate = new Date(startDate);
    prevEndDate.setDate(prevEndDate.getDate() - 1);
    const prevStartDate = new Date(prevEndDate);
    
    if (period === 'Week') {
      prevStartDate.setDate(prevEndDate.getDate() - 7);
    } else {
      prevStartDate.setMonth(prevEndDate.getMonth() - 1);
    }

    // Format dates for API call (YYYY-MM-DD)
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const startDateStr = formatDate(startDate);
    const endDateStr = formatDate(endDate);
    const prevStartDateStr = formatDate(prevStartDate);
    const prevEndDateStr = formatDate(prevEndDate);

    // Save date range for display
    setDateRange({
      start: startDateStr,
      end: endDateStr,
      display: `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    });

    // Get revenue data with dynamic date range for current period
    const currentRes = await GetAppointmentStatistics(startDateStr, endDateStr);
    console.log(`${period} period revenue data`, currentRes.data);
    const currentChartData = currentRes.data;
    
    // Add day names for the week view and enhance data
    if (period === 'Week') {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const chartDataWithDays = currentChartData.map(item => {
        const date = new Date(item.date);
        return {
          ...item,
          day: dayNames[date.getDay()],
          revenue: Number(item.revenue || 0),
          formattedRevenue: formatCurrency(item.revenue || 0)
        };
      });
      setData(chartDataWithDays);
    } else {
      // For month view, we'll filter to show fewer data points (every 3-4 days)
      const enhancedData = currentChartData.map((item, index) => {
        const date = new Date(item.date);
        const formattedDate = `${date.getDate()} ${date.toLocaleDateString('en-US', { month: 'short' })}`;
        return {
          ...item,
          revenue: Number(item.revenue || 0),
          formattedRevenue: formatCurrency(item.revenue || 0),
          formattedDate: formattedDate,
          displayOnXAxis: index % 3 === 0 // Only show every 3rd date on X-axis
        };
      });
      setData(enhancedData);
    }
    
    // Calculate total revenue for current period
    let currentRevenue = 0;
    if (currentChartData && currentChartData.length > 0) {
      currentRevenue = currentChartData.reduce((total, item) => total + (Number(item.revenue) || 0), 0);
      setTotalRevenue(currentRevenue);
      console.log(`${period} period total revenue:`, currentRevenue);
      
      // Get yesterday's change
      if (currentChartData.length >= 2) {
        const yesterday = currentChartData[currentChartData.length - 2].revenue || 0;
        const today = currentChartData[currentChartData.length - 1].revenue || 0;
        if (yesterday > 0) {
          const change = ((today - yesterday) / yesterday) * 100;
          setDailyChange(change.toFixed(2));
        }
      }
    }

    // Get revenue data for previous period
    const prevRes = await GetAppointmentStatistics(prevStartDateStr, prevEndDateStr);
    console.log(`Previous ${period} revenue data`, prevRes.data);
    const prevChartData = prevRes.data;
    
    // Calculate total revenue for previous period
    let prevRevenue = 0;
    if (prevChartData && prevChartData.length > 0) {
      prevRevenue = prevChartData.reduce((total, item) => total + (Number(item.revenue) || 0), 0);
      console.log(`Previous ${period} total revenue:`, prevRevenue);
    }

    // Calculate revenue growth percentage
    if (prevRevenue > 0) {
      const growth = ((currentRevenue - prevRevenue) / prevRevenue) * 100;
      setRevenueGrowth(growth.toFixed(1));
    }

    // Get current user count
    const currentUserRes = await CountAllUser();
    console.log("Current user count", currentUserRes.data);
    const currentUsers = currentUserRes.data;
    setUserCount(currentUsers);
    
    // For simplicity, let's use a static growth rate for users
    const growthRate = 18.2;
    setUserGrowth(growthRate);

    setIsLoading(false);
    
  } catch (error) {
    console.error("API error:", error);
    setIsLoading(false);
  }
};

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

// Format date for X-axis
const formatXAxis = (tickItem) => {
  if (timeFilter === 'Week') {
    return tickItem; // Return day name for week view
  } else {
    // For dates in the month view, return the formatted date
    const dateObj = new Date(tickItem);
    if (isNaN(dateObj.getTime())) {
      return tickItem; // Return as is if not a valid date
    }
    return `${dateObj.getDate()} ${dateObj.toLocaleDateString('en-US', { month: 'short' })}`;
  }
};

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    let displayDate = label;
    
    // Format the date for display in tooltip
    if (timeFilter !== 'Week' && payload[0].payload.date) {
      const dateObj = new Date(payload[0].payload.date);
      if (!isNaN(dateObj.getTime())) {
        displayDate = `${dateObj.getDate()} ${dateObj.toLocaleDateString('en-US', { month: 'short' })}`;
      }
    }
    
    return (
      <div className="custom-tooltip">
        <p className="tooltip-date">{displayDate}</p>
        <p className="tooltip-revenue">
          <span className="tooltip-label">Revenue: </span>
          <span className="tooltip-value">{formatCurrency(payload[0].value)}</span>
        </p>
      </div>
    );
  }
  return null;
};

// Custom active dot
const CustomActiveDot = (props) => {
  const { cx, cy, stroke, dataKey } = props;
  
  return (
    <g>
      <circle cx={cx} cy={cy} r={8} stroke={stroke} strokeWidth={2} fill="#fff" />
      <circle cx={cx} cy={cy} r={4} stroke="none" fill={stroke} />
    </g>
  );
};

// Traffic share data
const trafficData = [
  { name: "Desktop", value: 60, color: "#2563eb" },
  { name: "Mobile", value: 30, color: "#3b82f6" },
  { name: "Tablet", value: 10, color: "#60a5fa" }
];

  return (
    <div className="revenue-chart-container">
      <div className="chart-area">
        {/* Sales value header */}
        <div className="sales-header">
          <div className="sales-info">
            <h2 className="sales-title">Sales Value</h2>
            <div className="sales-value">{formatCurrency(totalRevenue)}</div>
            <div className="sales-change">
              <span>Yesterday</span>
              <span className={`change-value ${parseFloat(dailyChange) >= 0 ? 'positive' : 'negative'}`}>
                {parseFloat(dailyChange) >= 0 ? <ArrowUpRight size={16} /> : null}
                {dailyChange}%
              </span>
            </div>
          </div>
          <div className="time-filter">
            <button 
              className={`filter-btn ${timeFilter === 'Month' ? 'active' : ''}`}
              onClick={() => setTimeFilter('Month')}
            >
              Month
            </button>
            <button 
              className={`filter-btn ${timeFilter === 'Week' ? 'active' : ''}`}
              onClick={() => setTimeFilter('Week')}
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
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart 
                data={data} 
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                className="revenue-line-chart"
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#bfdbfe" strokeDasharray="5 5" />
                <XAxis 
                  dataKey={timeFilter === 'Week' ? "day" : "date"} 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#3b82f6' }} 
                  dy={10}
                  padding={{ left: 20, right: 20 }}
                  tickFormatter={formatXAxis}
                  interval={timeFilter === 'Week' ? 0 : 2}
                  angle={-15}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tickFormatter={(value) => `${(value / 1_000_000).toFixed(1)}M`}
                  tick={{ fontSize: 12, fill: '#3b82f6' }}
                  axisLine={false}
                  tickLine={false}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                  fillOpacity={1}
                  activeDot={CustomActiveDot}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      
      <div className="stats-boxes">
        {/* Customers Box - Using real API data */}
        <div className="stat-box">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-title">Customers</div>
          <div className="stat-value">{formatNumber(userCount)}</div>
          <div className="stat-info">
            <span>{dateRange.display || 'Loading...'}</span>
            <span className="world-icon">
              <Globe size={12} /> WorldWide
            </span>
          </div>
          <div className="stat-change">
            <TrendingUp size={16} />
            <span>{userGrowth}%</span> Since last month
          </div>
        </div>
        
        {/* Revenue Box - using real API data */}
        <div className="stat-box">
          <div className="stat-icon revenue-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">{formatCurrency(totalRevenue)}</div>
          <div className="stat-info">
            <span>{dateRange.display || 'Loading...'}</span>
            <span className="world-icon">
              <Globe size={12} /> WorldWide
            </span>
          </div>
          <div className="stat-change">
            <TrendingUp size={16} />
            <span>{revenueGrowth}%</span> Since last month
          </div>
        </div>
        
        {/* Traffic Share Box */}
        <div className="stat-box">
          <div className="stat-title">Traffic Share</div>
          <div className="traffic-chart">
            <div className="donut-chart">
              <div className="donut-chart-center">
                <Activity size={16} />
              </div>
            </div>
          </div>
          <div className="stat-traffic-devices">
            {trafficData.map((item, index) => (
              <div key={index} className="device-item">
                {index === 0 ? <Monitor size={16} /> : 
                 index === 1 ? <Smartphone size={16} /> : 
                 <Tablet size={16} />}
                <span>
                  {item.name} <strong>{item.value}%</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
