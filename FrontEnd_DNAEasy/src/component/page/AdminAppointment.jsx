import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, Users, CheckCircle, Clock, XCircle, RefreshCw, TrendingUp, BarChart3, PieChart, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { GetAppointmentReport } from '../../service/appointment';
import AdminHeader from '../AdminHeader'; // Import the header component

// CSS Styles
const styles = {
  dashboard: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    display: 'flex' // Added to enable flex layout with sidebar
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0
  },
  subtitle: {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: '0.25rem 0 0 0'
  },
  main: {
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    flex: 1 // Allow main content to take remaining space
  },
  dateFilter: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  },
  filterHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  filterTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1e293b'
  },
  filterControls: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  select: {
    padding: '0.5rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.875rem',
    backgroundColor: '#ffffff',
    color: '#374151',
    minWidth: '140px'
  },
  dateInput: {
    padding: '0.5rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.875rem',
    backgroundColor: '#ffffff',
    color: '#374151'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease-in-out'
  },
  statCardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.15)'
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem'
  },
  statTitle: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    lineHeight: '1.2'
  },
  statChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  changePositive: {
    color: '#059669'
  },
  changeNegative: {
    color: '#dc2626'
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  },
  chartCard: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0'
  },
  chartTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '1rem'
  },
  icon: {
    width: '24px',
    height: '24px'
  },
  badge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  badgeCompleted: {
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  badgeInProgress: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8'
  },
  badgeCancelled: {
    backgroundColor: '#fee2e2',
    color: '#dc2626'
  },
  badgeRefunded: {
    backgroundColor: '#fef3c7',
    color: '#d97706'
  }
};

const DNATestingAdminDashboard = () => {
  const [dateRange, setDateRange] = useState('today');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  const [reportData, setReportData] = useState([]);

  const getDateRange = () => {
    const today = new Date();
    if (dateRange === 'today') {
      const d = today.toISOString().slice(0, 10);
      return { fromdate: d, todate: d };
    }
    if (dateRange === 'yesterday') {
      const y = new Date(today);
      y.setDate(y.getDate() - 1);
      const d = y.toISOString().slice(0, 10);
      return { fromdate: d, todate: d };
    }
    if (dateRange === 'lastMonth') {
      const first = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const last = new Date(today.getFullYear(), today.getMonth(), 0);
      return {
        fromdate: first.toISOString().slice(0, 10),
        todate: last.toISOString().slice(0, 10)
      };
    }
    if (dateRange === 'custom' && startDate && endDate) {
      return { fromdate: startDate, todate: endDate };
    }
    const d = today.toISOString().slice(0, 10);
    return { fromdate: d, todate: d };
  };

  useEffect(() => {
    const range = getDateRange();
    GetAppointmentReport(range)
      .then(res => {
        setReportData(res.data || []);
      })
      .catch(() => setReportData([]));
  }, [dateRange, startDate, endDate]);

  const currentData = useMemo(() => {
    let total = 0, completed = 0, inProgress = 0, cancelled = 0, refunded = 0;
    reportData.forEach(item => {
      total += (item.inprocess || 0) + (item.complete || 0) + (item.refunded || 0) + (item.cancle || 0);
      completed += item.complete || 0;
      inProgress += item.inprocess || 0;
      cancelled += item.cancle || 0;
      refunded += item.refunded || 0;
    });
    return { total, completed, inProgress, cancelled, refunded };
  }, [reportData]);

  const chartData = useMemo(() => {
    return reportData.map(item => ({
      date: item.appointmentDate,
      appointments: (item.inprocess || 0) + (item.complete || 0) + (item.refunded || 0) + (item.cancle || 0),
      completed: item.complete || 0,
      cancelled: item.cancle || 0,
      inProgress: item.inprocess || 0,
      refunded: item.refunded || 0
    }));
  }, [reportData]);

  const pieData = [
    { name: 'Completed', value: currentData.completed, color: '#10b981' },
    { name: 'In Progress', value: currentData.inProgress, color: '#3b82f6' },
    { name: 'Cancelled', value: currentData.cancelled, color: '#ef4444' },
    { name: 'Refunded', value: currentData.refunded, color: '#f59e0b' }
  ];

  const StatCard = ({ title, value, change, changeType, icon, color, type }) => (
    <div
      style={{
        ...styles.statCard,
        ...(hoveredCard === type ? styles.statCardHover : {})
      }}
      onMouseEnter={() => setHoveredCard(type)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div style={styles.statHeader}>
        <span style={styles.statTitle}>{title}</span>
        <div style={{ color, ...styles.icon }}>
          {icon}
        </div>
      </div>
      <div style={styles.statValue}>{value.toLocaleString()}</div>
      <div style={{
        ...styles.statChange,
        ...(changeType === 'positive' ? styles.changePositive : styles.changeNegative)
      }}>
        <TrendingUp style={{ width: '16px', height: '16px' }} />
        {change}% compared to previous
      </div>
    </div>
  );

  return (
    <div style={styles.dashboard}>
      {/* Sidebar Header */}
      <AdminHeader />

      {/* Main Content */}
      <div style={styles.main}>
      

        {/* Date Filter */}
        <div style={styles.dateFilter}>
          <div style={styles.filterHeader}>
            <Filter style={styles.icon} />
            <h3 style={styles.filterTitle}>Date Filter</h3>
          </div>
          <div style={styles.filterControls}>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={styles.select}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="lastMonth">Last Month</option>
              <option value="custom">Custom</option>
            </select>
            {dateRange === 'custom' && (
              <>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={styles.dateInput}
                />
                <span style={{ color: '#64748b' }}>to</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={styles.dateInput}
                />
              </>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <StatCard
            title="Total Appointments"
            value={currentData.total}
            change={12.5}
            changeType="positive"
            icon={<Calendar />}
            color="#3b82f6"
            type="total"
          />
          <StatCard
            title="Completed"
            value={currentData.completed}
            change={8.2}
            changeType="positive"
            icon={<CheckCircle />}
            color="#10b981"
            type="completed"
          />
          <StatCard
            title="In Progress"
            value={currentData.inProgress}
            change={-5.1}
            changeType="negative"
            icon={<Clock />}
            color="#3b82f6"
            type="inProgress"
          />
          <StatCard
            title="Cancelled"
            value={currentData.cancelled}
            change={-15.3}
            changeType="negative"
            icon={<XCircle />}
            color="#ef4444"
            type="cancelled"
          />
          <StatCard
            title="Refunded"
            value={currentData.refunded}
            change={-10.8}
            changeType="negative"
            icon={<RefreshCw />}
            color="#f59e0b"
            type="refunded"
          />
          
          {/* Summary Card */}
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Performance Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#64748b' }}>Completion Rate</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '100px',
                    height: '8px',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${currentData.total ? (currentData.completed / currentData.total) * 100 : 0}%`,
                      height: '100%',
                      backgroundColor: '#10b981'
                    }} />
                  </div>
                  <span style={{ fontWeight: '600' }}>
                    {currentData.total ? ((currentData.completed / currentData.total) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#64748b' }}>Cancellation Rate</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '100px',
                    height: '8px',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${currentData.total ? (currentData.cancelled / currentData.total) * 100 : 0}%`,
                      height: '100%',
                      backgroundColor: '#ef4444'
                    }} />
                  </div>
                  <span style={{ fontWeight: '600' }}>
                    {currentData.total ? ((currentData.cancelled / currentData.total) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div style={styles.chartsGrid}>
          {/* Line Chart */}
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Appointment Trend by Date</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="appointments"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  name="Total Appointments"
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                  name="Completed"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Appointment Status Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="completed" fill="#10b981" name="Completed" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cancelled" fill="#ef4444" name="Cancelled" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              {pieData.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: item.color,
                    borderRadius: '2px'
                  }} />
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DNATestingAdminDashboard;