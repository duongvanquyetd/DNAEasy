import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  Home,
  BarChart3,
  UserCheck,
  MessageSquare,
  ChevronDown,
  Plus,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import '/src/component/css/AdminDashboard.css'; 
import RevenueChart from './RevenueChart';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Set initial active tab based on URL
  const isAnalyticsPath = location.pathname.includes('/analytics');
  const [activeTab, setActiveTab] = useState(isAnalyticsPath ? 'analytics' : 'dashboard');

  // Add effect to log when active tab changes
  useEffect(() => {
    console.log('Active tab changed to:', activeTab);
    
    // Update URL when activeTab changes
    if (activeTab === 'analytics') {
      navigate('/AdminDashboard/analytics', { replace: true });
    } else if (activeTab !== 'dashboard') {
      navigate('/AdminDashboard', { replace: true });
    }
  }, [activeTab, navigate]);

  // Sample static data (no API calls)
  const stats = [
    { 
      icon: Users, 
      label: 'Total Users', 
      value: '687.3k', 
      change: '8.10%', 
      changeLabel: 'Since last month',
      color: 'blue',
      bgColor: '#E3F2FD'
    },
    { 
      icon: Users, 
      label: 'Total Revenue', 
      value: '$999.99M', 
      change: '4.67%', 
      changeLabel: 'Since last month',
      color: 'green',
      bgColor: '#E8F5E8'
    },
    { 
      icon: UserCheck, 
      label: 'New Orders', 
      value: '10.2k', 
      change: '2.40%', 
      changeLabel: 'Since last month',
      color: 'orange',
      bgColor: '#FFF4E6'
    }
  ];

  const revenueData = [
    { month: 'Jan', desktop: 29.5, mobile: 15, tablet: 8.3 },
    { month: 'Feb', desktop: 25, mobile: 18, tablet: 12 },
    { month: 'Mar', desktop: 32, mobile: 22, tablet: 15 },
    { month: 'Apr', desktop: 18, mobile: 16, tablet: 10 },
    { month: 'May', desktop: 28, mobile: 24, tablet: 14 },
    { month: 'Jun', desktop: 35, mobile: 28, tablet: 18 },
    { month: 'Jul', desktop: 22, mobile: 20, tablet: 12 },
    { month: 'Aug', desktop: 30, mobile: 25, tablet: 16 },
    { month: 'Sep', desktop: 26, mobile: 22, tablet: 14 },
    { month: 'Oct', desktop: 33, mobile: 30, tablet: 20 },
    { month: 'Nov', desktop: 28, mobile: 26, tablet: 16 },
    { month: 'Dec', desktop: 35, mobile: 32, tablet: 22 }
  ];

  const transactions = [
    { id: 1, user: 'Kiit', date: '2024-12-18', amount: '$800.00', status: 'Completed' },
    { id: 2, user: 'Kiit', date: '2024-12-17', amount: '$1,200.00', status: 'Completed' },
    { id: 3, user: 'Quang', date: '2024-12-16', amount: '$300.00', status: 'Completed' },
    { id: 4, user: 'Quang', date: '2024-12-15', amount: '$2,800.00', status: 'Completed' },
    { id: 5, user: 'Quang', date: '2024-12-14', amount: '$750.00', status: 'Completed' }
  ];

  const newUsers = [
    { id: 1, name: 'John Doe', date: '2024-12-18', status: 'Active', avatar: 'JD' },
    { id: 2, name: 'Jane Smith', date: '2024-12-17', status: 'Pending', avatar: 'JS' },
    { id: 3, name: 'Michael Brown', date: '2024-12-16', status: 'Inactive', avatar: 'MB' },
    { id: 4, name: 'Emily Davis', date: '2024-12-14', status: 'Active', avatar: 'ED' },
    { id: 5, name: 'Robert Taylor', date: '2024-12-15', status: 'Pending', avatar: 'RT' }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderChart = () => {
    const maxValue = Math.max(...revenueData.map(d => d.desktop));
    return (
      <div className="chart-container">
        <svg viewBox="0 0 800 300" className="revenue-chart">
          <defs>
            <linearGradient id="desktopGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.1"/>
            </linearGradient>
            <linearGradient id="mobileGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2196F3" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#2196F3" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          
          {/* Desktop Area */}
          <path
            d={`M 0,${300 - (revenueData[0].desktop / maxValue) * 250} ${revenueData.map((d, i) => 
              `L ${(i * 800) / (revenueData.length - 1)},${300 - (d.desktop / maxValue) * 250}`
            ).join(' ')} L 800,300 L 0,300 Z`}
            fill="url(#desktopGradient)"
            stroke="#4CAF50"
            strokeWidth="2"
          />
          
          {/* Mobile Area */}
          <path
            d={`M 0,${300 - (revenueData[0].mobile / maxValue) * 250} ${revenueData.map((d, i) => 
              `L ${(i * 800) / (revenueData.length - 1)},${300 - (d.mobile / maxValue) * 250}`
            ).join(' ')} L 800,300 L 0,300 Z`}
            fill="url(#mobileGradient)"
            stroke="#2196F3"
            strokeWidth="2"
          />
          
          {/* Month labels */}
          {revenueData.map((d, i) => (
            <text
              key={i}
              x={(i * 800) / (revenueData.length - 1)}
              y="295"
              textAnchor="middle"
              fontSize="12"
              fill="#666"
            >
              {d.month}
            </text>
          ))}
        </svg>
      </div>
    );
  };

  const renderDashboardContent = () => {
    return (
      <div className="dashboard-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-card stat-card-${stat.color}`}>
              <div className="stat-header">
                <div className="stat-info">
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-value">{stat.value}</p>
                  <div className="stat-change">
                    <TrendingUp className="trend-icon" />
                    <span className="change-value positive">{stat.change}</span>
                    <span className="change-label">{stat.changeLabel}</span>
                  </div>
                </div>
                <div className={`stat-icon stat-icon-${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="chart-section">
          <div className="chart-card">
            <div className="chart-header">
              <div className="chart-title-section">
                <h3 className="chart-title">Total Revenue</h3>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-dot desktop"></div>
                    <span>Desktop - $29.5k</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot mobile"></div>
                    <span>Mobile - $150.07k</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot tablet"></div>
                    <span>Tablet - $300.8k</span>
                  </div>
                </div>
              </div>
              <div className="chart-controls">
                <button className="control-btn active">Day</button>
                <button className="control-btn">Month</button>
                <button className="control-btn">Year</button>
              </div>
            </div>
            {renderChart()}
          </div>
        </div>

        {/* Tables Section */}
        <div className="tables-section">
          {/* Transactions */}
          <div className="table-card">
            <div className="table-header">
              <h3 className="table-title">Transactions</h3>
              <button className="add-btn">
                <Plus size={16} />
                Add New
              </button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Merchant Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">
                            {transaction.user.charAt(0)}
                          </div>
                          <span>{transaction.user}</span>
                        </div>
                      </td>
                      <td className="date-cell">{transaction.date}</td>
                      <td className="amount-cell">{transaction.amount}</td>
                      <td>
                        <span className="status-badge completed">
                          <div className="status-dot"></div>
                          {transaction.status}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn">
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="table-pagination">
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <span className="page-dots">...</span>
              </div>
            </div>
          </div>

          {/* New Users */}
          <div className="table-card">
            <div className="table-header">
              <h3 className="table-title">New Users</h3>
              <div className="filter-tabs">
                <button className="filter-tab active">Day</button>
                <button className="filter-tab">Month</button>
                <button className="filter-tab">Year</button>
              </div>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {newUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">
                            {user.avatar}
                          </div>
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td className="date-cell">{user.date}</td>
                      <td>
                        <span className={`status-badge ${user.status.toLowerCase()}`}>
                          <div className="status-dot"></div>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn">
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="table-pagination">
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <span className="page-dots">...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render content based on active tab
  const renderContent = () => {
    console.log('Rendering content for tab:', activeTab);
    
    switch(activeTab) {
      case 'dashboard':
        return renderDashboardContent();
      case 'analytics':
        console.log('Should render RevenueChart component');
        // Force the component to remount by adding a key
        return (
          <div className="analytics-container">
            <h2>Revenue Analytics</h2>
            <p>Detailed statistics and charts for revenue analysis</p>
            <RevenueChart key={`revenue-chart-${Date.now()}`} />
          </div>
        );
      default:
        return (
          <div className="coming-soon">
            <h3>Coming Soon</h3>
            <p>This section is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-header">
          {sidebarOpen && (
            <div className="logo">
              <div className="logo-icon">DA</div>
              <span className="logo-text">DNAEASY</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sidebar-toggle"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                console.log('Clicked on menu item:', item.id);
                setActiveTab(item.id);
              }}
              className={`nav-item ${activeTab === item.id ? 'nav-item-active' : ''}`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <h1 className="page-title">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          </div>
          
          <div className="header-right">
            {/* Search */}
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
            </div>

            {/* Notifications */}
            <button className="notification-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>

            {/* Profile */}
            <div className="profile-container">
              <div className="profile-avatar">AD</div>
              <div className="profile-info">
                <p className="profile-name">Admin User</p>
                <p className="profile-email">admin@dnaeasy.com</p>
              </div>
              <ChevronDown className="profile-arrow" size={16} />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;