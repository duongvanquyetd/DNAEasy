import React, { useState, useEffect } from 'react';
import { Search, Users, UserCheck, Crown, Edit3, Trash2, Plus, Filter, Download, RefreshCw, Eye, MoreVertical } from 'lucide-react';
import { GetAllUsers, GetUserStats, UpdateUserRole, DeleteUser } from '../../service/user';

const AdminUserManagement = () => {
  const [activeTab, setActiveTab] = useState('CUSTOMER');
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [pageSize] = useState(10);
  const [error, setError] = useState(null);

  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalStaff: 0,
    totalManagers: 0,
    lastUpdated: new Date().toLocaleString('en-US')
  });

  const tabs = [
    { id: 'CUSTOMER', label: 'Customers', icon: Users, count: stats.totalCustomers, color: { from: '#1e3a8a', to: '#3b82f6' } },
    { id: 'STAFF', label: 'Staff', icon: UserCheck, count: stats.totalStaff, color: { from: '#3b82f6', to: '#60a5fa' } },
    { id: 'MANAGER', label: 'Managers', icon: Crown, count: stats.totalManagers, color: { from: '#1d4ed8', to: '#2563eb' } },
  ];

  // Fetch user stats
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        console.log('Calling GetUserStats API');
        const response = await GetUserStats();
        console.log('Stats response:', response);
        
        // Kiểm tra cấu trúc response - phù hợp với API từ backend
        if (response.data) {
          console.log('Stats data processed:', response.data);
          
          // Xử lý theo cấu trúc API trả về
          const totalCustomers = response.data.CUSTOMER || 0;
          const totalStaff = response.data.STAFF || 0;
          const totalManagers = response.data.MANAGER || 0;
          
          setStats({
            totalCustomers,
            totalStaff, 
            totalManagers,
            lastUpdated: new Date().toLocaleString('en-US')
          });
        }
      } catch (err) {
        console.error('Error fetching user stats:', err);
        setError('Failed to load user statistics');
      }
    };

    fetchUserStats();
  }, []);

  // Fetch users based on active tab
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Fetching users with params:', {
          role: activeTab,
          page: currentPage - 1,
          size: pageSize,
          keyword: searchQuery
        });
        
        const response = await GetAllUsers(
          activeTab,
          currentPage - 1, // API uses 0-based indexing
          pageSize,
          searchQuery
        );
        
        console.log('API Response (full):', response);
        console.log('Response data:', response.data);
        console.log('Response headers:', response.headers);
        console.log('Response status:', response.status);
        
        // Kiểm tra token để xem có vấn đề về authentication không
        console.log('Current token:', localStorage.getItem('token'));
        
        // Backend trả về mảng trực tiếp, không có cấu trúc pagination
        if (response.data) {
          // Thêm log chi tiết để debug
          console.log('Setting users with:', response.data);
          console.log('Users array type:', Array.isArray(response.data));
          console.log('Users array length:', Array.isArray(response.data) ? response.data.length : 'not an array');
          
          setUsers(response.data || []);
          // Nếu API không trả về thông tin trang, giả định 1 trang
          setTotalPages(1);
        } else {
          console.error('Unexpected API response structure:', response);
          setError('Unexpected API response format');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        console.error('Error details:', err.response ? {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data
        } : 'No response');
        
        setError(`Failed to load users: ${err.message || 'Unknown error'}`);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [activeTab, currentPage, pageSize, searchQuery]);

  // Debounced search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setCurrentPage(1); // Reset to first page on new search
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleEditUser = (user) => {
    setEditUser(user);
    setSelectedRole(user.role);
    setShowModal(true);
  };

  const handleViewUser = (user) => {
    setViewUser(user);
    setShowViewModal(true);
  };

  const handleUpdateUser = async () => {
    if (editUser) {
      setIsLoading(true);
      try {
        // API backend thực tế sẽ xác nhận việc cập nhật role
        await UpdateUserRole(editUser.id, selectedRole);
        
        // Update the user in the local state
        setUsers(prevUsers => 
          prevUsers.map(user =>
            user.id === editUser.id ? { ...user, role: selectedRole } : user
          )
        );
        
        // Refresh user stats after updating role
        const response = await GetUserStats();
        if (response.data) {
          const totalCustomers = response.data.CUSTOMER || 0;
          const totalStaff = response.data.STAFF || 0;
          const totalManagers = response.data.MANAGER || 0;
          
          setStats({
            totalCustomers,
            totalStaff,
            totalManagers,
            lastUpdated: new Date().toLocaleString('en-US')
          });
        }
        
        setShowModal(false);
        setEditUser(null);
      } catch (err) {
        console.error('Error updating user:', err);
        setError(`Failed to update user: ${err.message || 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setIsLoading(true);
      try {
        await DeleteUser(userId);
        
        // Xóa user khỏi state
        setUsers(users.filter(user => user.id !== userId));
        
        // Cập nhật lại thống kê sau khi xóa
        const response = await GetUserStats();
        if (response.data) {
          const totalCustomers = response.data.CUSTOMER || 0;
          const totalStaff = response.data.STAFF || 0;
          const totalManagers = response.data.MANAGER || 0;
          
          setStats({
            totalCustomers,
            totalStaff,
            totalManagers,
            lastUpdated: new Date().toLocaleString('en-US')
          });
        }
      } catch (err) {
        console.error('Error deleting user:', err);
        setError(`Failed to delete user: ${err.message || 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getStatusBadge = (status) => {
    // Chuyển đổi status từ boolean sang text
    const isActive = status === true;
    
    return isActive ? (
      <div style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '0.5rem',
        padding: '0.5rem 1rem', 
        fontSize: '1.25rem', 
        fontWeight: '600', 
        color: '#ffffff', 
        background: '#4CAF50',
        border: '1px solid #45a049',
        borderRadius: '2rem',
        boxShadow: '0 2px 4px rgba(76, 175, 80, 0.3)'
      }}>
        <div style={{ width: '0.75rem', height: '0.75rem', backgroundColor: '#4CAF50', borderRadius: '50%' }} />
        Active
      </div>
    ) : (
      <div style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '0.5rem',
        padding: '0.5rem 1rem', 
        fontSize: '1.25rem', 
        fontWeight: '600', 
        color: '#ffffff', 
        background: '#F44336',
        border: '1px solid #DA190B',
        borderRadius: '2rem',
        boxShadow: '0 2px 4px rgba(244, 67, 54, 0.3)'
      }}>
        <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#F44336', borderRadius: '20%%' }} />
        Inactive
      </div>
    );
  };

  const getAvatarColor = (index) => {
    const gradients = [
      'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
      'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
      'linear-gradient(135deg, #60a5fa 0%, #93c5fd 100%)',
      'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)'
    ];
    return gradients[index % gradients.length];
  };

  const getGradientStyle = (color) => ({
    background: `linear-gradient(135deg, ${color.from} 0%, ${color.to} 100%)`,
  });

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      position: 'relative',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Animated Background Elements */}
      <div style={{ 
        position: 'absolute', 
        top: '5%', 
        left: '5%', 
        width: '400px', 
        height: '400px', 
        background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)', 
        borderRadius: '50%',
        animation: 'float 7s ease-in-out infinite'
      }} />
      <div style={{ 
        position: 'absolute', 
        bottom: '5%', 
        right: '5%', 
        width: '300px', 
        height: '300px', 
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)', 
        borderRadius: '50%',
        animation: 'float 9s ease-in-out infinite reverse'
      }} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.3) transparent;
        }
        *::-webkit-scrollbar {
          width: 8px;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 4px;
        }
      `}</style>

      {/* Header */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.1)', 
        backdropFilter: 'blur(20px)', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 50,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="slide-in">
              <h1 style={{ 
                fontSize: '3rem', 
                fontWeight: '900', 
                background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%)', 
                WebkitBackgroundClip: 'text', 
                color: 'transparent',
                textShadow: '0 3px 6px rgba(0,0,0,0.1)',
                marginBottom: '0.75rem',
                letterSpacing: '-0.025em'
              }}>
                User Management
              </h1>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.85)', 
                fontSize: '1.25rem',
                fontWeight: '400',
                lineHeight: '1.75rem'
              }}>
                Efficiently manage customers, staff, and system managers
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Error display */}
        {error && (
          <div style={{
            padding: '1rem 1.5rem',
            background: 'rgba(239, 68, 68, 0.15)',
            color: 'white',
            borderRadius: '0.75rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            boxShadow: '0 4px 10px rgba(239, 68, 68, 0.2)'
          }}>
            <p style={{ fontWeight: '500' }}>{error}</p>
            <button 
              onClick={() => setError(null)}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                color: 'white',
                fontSize: '1.25rem',
                fontWeight: 'bold'
              }}
            >
              &times;
            </button>
          </div>
        )}
        
        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2rem', 
          marginBottom: '3rem' 
        }}>
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <div
                key={tab.id}
                className="slide-in"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.12)', 
                  backdropFilter: 'blur(20px)', 
                  borderRadius: '1.5rem', 
                  padding: '2rem', 
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)', 
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', 
                  border: '1px solid rgba(255, 255, 255, 0.18)', 
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  animationDelay: `${index * 0.15}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
                }}
                onClick={() => setActiveTab(tab.id)}
              >
                <div style={{ 
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '120px',
                  height: '120px',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
                  borderRadius: '50%'
                }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
                  <div>
                    <p style={{ 
                      fontSize: '0.95rem', 
                      fontWeight: '600', 
                      color: 'rgba(255, 255, 255, 0.85)', 
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {tab.label}
                    </p>
                    <p style={{ 
                      fontSize: '2.75rem', 
                      fontWeight: '800', 
                      color: 'white',
                      textShadow: '0 3px 6px rgba(0,0,0,0.15)'
                    }}>
                      {tab.count.toLocaleString()}
                    </p>
                  </div>
                  <div style={{ 
                    width: '5.5rem', 
                    height: '5.5rem', 
                    ...getGradientStyle(tab.color), 
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '1rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    transition: 'transform 0.4s',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)'
                  }}>
                    <Icon size={32} style={{ color: 'white', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.12)', 
          backdropFilter: 'blur(20px)', 
          borderRadius: '1.5rem', 
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)', 
          border: '1px solid rgba(255, 255, 255, 0.18)',
          overflow: 'hidden'
        }}>
          {/* Tabs */}
          <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <nav style={{ display: 'flex', gap: '0', padding: '0 2.5rem' }}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    style={{
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      padding: '1.5rem 2.5rem', 
                      background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                      borderBottom: activeTab === tab.id ? '4px solid #ffffff' : '4px solid transparent',
                      fontWeight: '600', 
                      fontSize: '1rem', 
                      color: activeTab === tab.id ? 'white' : 'rgba(255, 255, 255, 0.75)', 
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '0',
                      position: 'relative',
                      textShadow: activeTab === tab.id ? '0 1px 2px rgba(0,0,0,0.2)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (activeTab !== tab.id) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== tab.id) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                      }
                    }}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setCurrentPage(1);
                    }}
                  >
                    <Icon size={20} style={{ filter: activeTab === tab.id ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' : 'none' }} />
                    {tab.label}
                    <span style={{ 
                      marginLeft: '0.75rem', 
                      padding: '0.3rem 0.85rem', 
                      fontSize: '0.8rem', 
                      background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.15)', 
                      color: 'white', 
                      borderRadius: '1rem',
                      fontWeight: '600',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Search and Filters */}
          <div style={{ padding: '2.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.5rem', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }} className="sm:flex-row">
              <div style={{ flex: 1, maxWidth: '36rem', width: '100%' }}>
                <div style={{ position: 'relative' }}>
                  <Search style={{ 
                    position: 'absolute', 
                    left: '1.25rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    color: 'rgba(250, 250, 250, 0.65)', 
                    width: '1.5rem', 
                    height: '1.5rem' 
                  }} />
                  <input
                    type="text"
                    placeholder={`Search ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
                    style={{ 
                      width: '100%', 
                      padding: '1rem 1.5rem 1rem 3.5rem', 
                      border: '1px solid rgba(240, 232, 232, 0.25)', 
                      borderRadius: '1rem', 
                      outline: 'none', 
                      background: 'rgba(255, 255, 255, 0.08)', 
                      backdropFilter: 'blur(10px)', 
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: '400',
                      boxShadow: '0 4px 10px rgba(224, 206, 206, 0.1)'
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(255, 255, 255, 0.15), 0 4px 10px rgba(0,0,0,0.2)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                      e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
                    }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    padding: '0.75rem 1.75rem', 
                    color: 'white', 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '0.75rem', 
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    fontWeight: '500',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
                  }}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={18} /> Filter
                </button>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div style={{ 
                marginTop: '1.5rem', 
                padding: '1.5rem', 
                background: 'rgba(255, 255, 255, 0.08)', 
                borderRadius: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem' 
                }}>
                  <select style={{ 
                    padding: '0.75rem 1rem', 
                    border: '1px solid rgba(255, 255, 255, 0.25)', 
                    borderRadius: '0.75rem', 
                    outline: 'none',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'white',
                    backdropFilter: 'blur(10px)',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  }}>
                    <option style={{ background: '#1e293b', color: 'white' }}>All Statuses</option>
                    <option style={{ background: '#1e293b', color: 'white' }}>Active</option>
                    <option style={{ background: '#1e293b', color: 'white' }}>Inactive</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            {isLoading ? (
              <div style={{ padding: '4rem', textAlign: 'center' }}>
                <div style={{ 
                  display: 'inline-block', 
                  width: '3rem', 
                  height: '3rem', 
                  border: '3px solid rgba(255, 255, 255, 0.3)', 
                  borderTopColor: 'white', 
                  borderRadius: '50%', 
                  animation: 'spin 1s linear infinite', 
                  margin: '0 auto' 
                }} />
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', marginTop: '1rem', fontSize: '1.1rem', fontWeight: '400' }}>
                  Loading data...
                </p>
              </div>
            ) : (
              <table style={{ width: '100%', tableLayout: 'auto' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>
                    <th style={{ 
                      textAlign: 'left', 
                      padding: '1.5rem 2.5rem', 
                      fontWeight: '600', 
                      color: 'white',
                      fontSize: '0.95rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      User
                    </th>
                    <th style={{ 
                      textAlign: 'left', 
                      padding: '1.5rem 2.5rem', 
                      fontWeight: '600', 
                      color: 'white',
                      fontSize: '0.95rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Contact
                    </th>
                    <th style={{ 
                      textAlign: 'left', 
                      padding: '1.5rem 2.5rem', 
                      fontWeight: '600', 
                      color: 'white',
                      fontSize: '0.95rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Status
                    </th>
                    <th style={{ 
                      textAlign: 'left', 
                      padding: '1.5rem 2.5rem', 
                      fontWeight: '600', 
                      color: 'white',
                      fontSize: '0.95rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Join Date
                    </th>
                    <th style={{ 
                      textAlign: 'left', 
                      padding: '1.5rem 2.5rem', 
                      fontWeight: '600', 
                      color: 'white',
                      fontSize: '0.95rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Last Login
                    </th>
                    <th style={{ 
                      textAlign: 'right', 
                      padding: '1.5rem 2.5rem', 
                      fontWeight: '600', 
                      color: 'white',
                      fontSize: '0.95rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr 
                      key={user.id} 
                      style={{ 
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)', 
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <td style={{ padding: '1.5rem 2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ 
                            width: '3.5rem', 
                            height: '3.5rem', 
                            background: getAvatarColor(index), 
                            borderRadius: '1rem', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            color: 'white', 
                            fontWeight: '700', 
                            fontSize: '1rem',
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                            transition: 'transform 0.3s'
                          }}>
                            {user.name ? user.name.substring(0, 2).toUpperCase() : 'NA'}
                          </div>
                          <div>
                            <p style={{ fontWeight: '600', color: 'white', fontSize: '1.1rem', lineHeight: '1.5rem' }}>
                              {user.name}
                            </p>
                           
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1.5rem 2.5rem' }}>
                        <div>
                          <p style={{ color: 'white', fontWeight: '500', fontSize: '1rem' }}>{user.email || "N/A"}</p>
                          <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.65)', fontWeight: '400' }}>
                            {user.phone || "N/A"}
                          </p>
                        </div>
                      </td>
                      <td style={{ padding: '1.5rem 2.5rem' }}>
                        {getStatusBadge(user.status)}
                      </td>
                      <td style={{ padding: '1.5rem 2.5rem' }}>
                        <p style={{ color: 'white', fontWeight: '500', fontSize: '1rem' }}>
                          {user.createdDate ? new Date(user.createdDate).toLocaleDateString('en-US') : 'N/A'}
                        </p>
                      </td>
                      <td style={{ padding: '1.5rem 2.5rem' }}>
                        <p style={{ color: 'white', fontWeight: '500', fontSize: '1rem' }}>
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('en-US') : 'N/A'}
                        </p>
                      </td>
                      <td style={{ padding: '1.5rem 2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
                          <button 
                            style={{ 
                              padding: '0.75rem', 
                              color: 'rgba(255, 255, 255, 0.75)', 
                              background: 'rgba(255, 255, 255, 0.1)', 
                              borderRadius: '0.75rem', 
                              transition: 'all 0.3s',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)';
                              e.currentTarget.style.color = 'white';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            onClick={() => handleViewUser(user)}
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            style={{ 
                              padding: '0.75rem', 
                              color: 'rgba(255, 255, 255, 0.75)', 
                              background: 'rgba(255, 255, 255, 0.1)', 
                              borderRadius: '0.75rem', 
                              transition: 'all 0.3s',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)';
                              e.currentTarget.style.color = 'white';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            style={{ 
                              padding: '0.75rem', 
                              color: 'rgba(255, 255, 255, 0.75)', 
                              background: 'rgba(255, 255, 255, 0.1)', 
                              borderRadius: '0.75rem', 
                              transition: 'all 0.3s',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)';
                              e.currentTarget.style.color = 'white';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div style={{ padding: '1.5rem 2.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.85)', fontWeight: '400' }}>
                Showing <span style={{ fontWeight: '600' }}>{users.length}</span> of <span style={{ fontWeight: '600' }}>{tabs.find(t => t.id === activeTab)?.count}</span> results
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button 
                  style={{ 
                    padding: '0.75rem 1.5rem', 
                    color: currentPage === 1 ? 'rgba(255, 255, 255, 0.5)' : 'white', 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '0.75rem', 
                    transition: 'all 0.3s',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                  }}
                  disabled={currentPage === 1}
                  onMouseEnter={(e) => {
                    if (currentPage !== 1) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  ← Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    style={{
                      padding: '0.75rem 1rem', 
                      borderRadius: '0.75rem', 
                      transition: 'all 0.3s',
                      background: currentPage === page ? 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' : 'rgba(255, 255, 255, 0.1)',
                      color: currentPage === page ? 'white' : 'rgba(255, 255, 255, 0.85)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      fontWeight: '500',
                      boxShadow: currentPage === page ? '0 4px 10px rgba(0,0,0,0.2)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage !== page) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage !== page) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  style={{ 
                    padding: '0.75rem 1.5rem', 
                    color: currentPage === totalPages ? 'rgba(255, 255, 255, 0.5)' : 'white', 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '0.75rem', 
                    transition: 'all 0.3s',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                  }}
                  disabled={currentPage === totalPages}
                  onMouseEnter={(e) => {
                    if (currentPage !== totalPages) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && editUser && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'rgba(0, 0, 0, 0.6)', 
          backdropFilter: 'blur(8px)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 100, 
          padding: '1.5rem' 
        }}>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.95)', 
            borderRadius: '1.5rem', 
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)', 
            maxWidth: '32rem', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto',
            animation: 'slideIn 0.4s ease-out'
          }}>
            <div style={{ padding: '2rem', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', letterSpacing: '-0.025em' }}>
                Edit User
              </h3>
              <p style={{ color: '#6b7280', marginTop: '0.5rem', fontSize: '1rem', fontWeight: '400' }}>
                Update user information and role
              </p>
            </div>
            
            <div style={{ padding: '2rem' }}>
              {/* User Info */}
              <div style={{ 
                background: 'rgba(243, 244, 246, 0.5)', 
                borderRadius: '1rem', 
                padding: '1.5rem', 
                marginBottom: '2rem',
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    background: getAvatarColor(0), 
                    borderRadius: '1rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'white', 
                    fontWeight: '700',
                    fontSize: '1.25rem',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
                  }}>
                    {editUser.name ? editUser.name.substring(0, 2).toUpperCase() : 'NA'}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '600', color: '#1e293b', fontSize: '1.25rem' }}>
                      {editUser.name}
                    </h4>
                    <p style={{ fontSize: '0.95rem', color: '#6b7280', fontWeight: '400' }}>
                      {editUser.email || "N/A"}
                    </p>
                  </div>
                </div>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', 
                  gap: '1.5rem', 
                  fontSize: '0.95rem' 
                }}>
                  <div>
                    <span style={{ color: '#6b7280', fontWeight: '500' }}>Status:</span>
                    <p style={{ fontWeight: '600', color: '#1e293b' }}>
                      {editUser.status === true ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                  <div>
                    <span style={{ color: '#6b7280', fontWeight: '500' }}>Join Date:</span>
                    <p style={{ fontWeight: '600', color: '#1e293b' }}>
                      {editUser.createdDate ? new Date(editUser.createdDate).toLocaleDateString('en-US') : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role Selection */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.95rem', 
                  fontWeight: '500', 
                  color: '#1e293b', 
                  marginBottom: '1rem' 
                }}>
                  User Role
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <label 
                        key={tab.id} 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          padding: '1rem', 
                          border: selectedRole === tab.id ? '2px solid #3b82f6' : '1px solid #d1d5db', 
                          borderRadius: '0.75rem', 
                          cursor: 'pointer', 
                          transition: 'all 0.3s',
                          background: selectedRole === tab.id ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                          boxShadow: selectedRole === tab.id ? '0 4px 10px rgba(59, 130, 246, 0.1)' : 'none'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedRole !== tab.id) {
                            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.03)';
                            e.currentTarget.style.borderColor = '#93c5fd';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedRole !== tab.id) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = '#d1d5db';
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={tab.id}
                          checked={selectedRole === tab.id}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          style={{ 
                            marginRight: '1rem', 
                            accentColor: '#3b82f6',
                            width: '1.25rem',
                            height: '1.25rem'
                          }}
                        />
                        <div style={{ 
                          width: '2.5rem', 
                          height: '2.5rem', 
                          ...getGradientStyle(tab.color), 
                          borderRadius: '0.5rem', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          marginRight: '1rem'
                        }}>
                          <Icon size={20} style={{ color: 'white' }} />
                        </div>
                        <span style={{ fontWeight: '500', color: '#1e293b', fontSize: '1rem' }}>
                          {tab.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={{ 
              padding: '2rem', 
              borderTop: '1px solid rgba(0, 0, 0, 0.1)', 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '1rem' 
            }}>
              <button
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  color: '#1e293b', 
                  background: 'rgba(229, 231, 235, 0.5)', 
                  borderRadius: '0.75rem', 
                  transition: 'all 0.3s',
                  fontWeight: '500',
                  border: '1px solid rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(209, 213, 219, 0.7)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(229, 231, 235, 0.5)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                style={{ 
                  padding: '0.75rem 2rem', 
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', 
                  color: 'white', 
                  borderRadius: '0.75rem', 
                  boxShadow: '0 6px 20px rgba(59, 130, 246, 0.3)', 
                  transition: 'all 0.3s',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.3)';
                }}
                onClick={handleUpdateUser}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewUser && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'rgba(0, 0, 0, 0.6)', 
          backdropFilter: 'blur(8px)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 100, 
          padding: '1.5rem' 
        }}>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.95)', 
            borderRadius: '1.5rem', 
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)', 
            maxWidth: '32rem', 
            width: '100%', 
            maxHeight: '90vh', 
            overflowY: 'auto',
            animation: 'slideIn 0.4s ease-out'
          }}>
            <div style={{ padding: '2rem', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', letterSpacing: '-0.025em' }}>
                View User
              </h3>
              <p style={{ color: '#6b7280', marginTop: '0.5rem', fontSize: '1rem', fontWeight: '400' }}>
                User details
              </p>
            </div>
            
            <div style={{ padding: '2rem' }}>
              <div style={{ 
                background: 'rgba(243, 244, 246, 0.5)', 
                borderRadius: '1rem', 
                padding: '1.5rem', 
                marginBottom: '2rem',
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    background: getAvatarColor(0), 
                    borderRadius: '1rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'white', 
                    fontWeight: '700',
                    fontSize: '1.25rem',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
                  }}>
                    {viewUser.name ? viewUser.name.substring(0, 2).toUpperCase() : 'NA'}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '600', color: '#1e293b', fontSize: '1.25rem' }}>
                      {viewUser.name}
                    </h4>
                    <p style={{ fontSize: '0.95rem', color: '#6b7280', fontWeight: '400' }}>
                      {viewUser.email || "N/A"}
                    </p>
                  </div>
                </div>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', 
                  gap: '1.5rem', 
                  fontSize: '0.95rem' 
                }}>
                  <div>
                    <span style={{ color: '#6b7280', fontWeight: '500' }}>Status:</span>
                    <p style={{ fontWeight: '600', color: '#1e293b' }}>
                      {viewUser.status === true ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                  <div>
                    <span style={{ color: '#6b7280', fontWeight: '500' }}>Join Date:</span>
                    <p style={{ fontWeight: '600', color: '#1e293b' }}>
                      {viewUser.createdDate ? new Date(viewUser.createdDate).toLocaleDateString('en-US') : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span style={{ color: '#6b7280', fontWeight: '500' }}>Role:</span>
                    <p style={{ fontWeight: '600', color: '#1e293b' }}>
                      {viewUser.role || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ 
              padding: '2rem', 
              borderTop: '1px solid rgba(0, 0, 0, 0.1)', 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '1rem' 
            }}>
              <button
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  color: '#1e293b', 
                  background: 'rgba(229, 231, 235, 0.5)', 
                  borderRadius: '0.75rem', 
                  transition: 'all 0.3s',
                  fontWeight: '500',
                  border: '1px solid rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(209, 213, 219, 0.7)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(229, 231, 235, 0.5)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
