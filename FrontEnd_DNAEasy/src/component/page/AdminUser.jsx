
import React, { useState, useEffect } from 'react';
import { Search, Users, UserCheck, Crown, Edit3, Trash2, Plus, Filter, Download, RefreshCw, Eye, MoreVertical, Shield } from 'lucide-react';
import '../css/AdminUser.css';
import { ActiveUser, DeleteUser, GetAllUsers, ReportUser, UpdateUserRole } from '../../service/user';
import AdminHeader from '../AdminHeader';
const AdminUserManagement = () => {
  const [activeTab, setActiveTab] = useState('CUSTOMER');
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [fromdate, setFromdate] = useState('');
  const [todate, setTodate] = useState('');
  const [active, setActive] = useState(true);
  const [numberUser, setNumberUser] = useState();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStaff: 0,
    // totalAdmins: 0,
    totalManagers: 0
  });

  const tabs = [
    { id: 'CUSTOMER', label: 'Users', icon: Users, count: stats.totalUsers, color: { from: '#1e3a8a', to: '#3b82f6' } },
    { id: 'STAFF', label: 'Staff', icon: UserCheck, count: stats.totalStaff, color: { from: '#3b82f6', to: '#60a5fa' } },
    { id: 'MANAGER', label: 'Managers', icon: Crown, count: stats.totalManagers, color: { from: '#1d4ed8', to: '#2563eb' } },

    // { id: 'ADMIN', label: 'Admins', icon: Shield, count: stats.totalAdmins, color: { from: '#7e22ce', to: '#a855f7' } },
  ];

  useEffect(() => {
    fetchUserStats();
  }, [currentPage, searchQuery, activeTab, active, fromdate, todate]);

  const fetchUserStats = async () => {
    try {
      ReportUser().then((response) => {
        setStats({
          totalUsers: response.data.customer,
          totalStaff: response.data.staff,
          totalManagers: response.data.manager,
          // totalAdmins: response.data.admin
        });
      });

      const datasearch = {
        name: searchQuery,
        rolename: activeTab,
        active: active,
        createdDateform: fromdate,
        createdDateTo: todate
      };
      console.log("Request data search", datasearch)
      const response = await GetAllUsers(currentPage, pageSize, datasearch);
      console.log("Reposne paging User", response.data)
      setUsers(response.data.content);
      setTotalPages(response.data.totalPages);
      setNumberUser(response.data.totalElements);
    } catch (err) {
      console.error('Error fetching user stats:', err);
      setError('Failed to load user statistics');
    }
  };

  const handleEditUser = (user) => {
    if (!user.name) {
      setError('Cannot edit user: User name is missing');
      return;
    }
    setEditUser(user);
    setSelectedRole(user.rolename);
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
        const updatuser = {
          personId: editUser.personId,
          role: selectedRole
        };
        await UpdateUserRole(updatuser).then((response) => {
          fetchUserStats();
        });
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
    await DeleteUser(userId).then((response) => {
      fetchUserStats();
    });
  };

  const handleActiveeUser = async (userId) => {
    await ActiveUser(userId).then((response) => {
      fetchUserStats();
    });
  };

  const renderPagination = (total, current) => (
    <div className="pagination">
      {Array.from({ length: total }, (_, i) => i + 1).map((i) => (
        <button
          key={i}
          className={`page-button ${i === current ? 'active' : ''}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      ))}
    </div>
  );

  const getStatusBadge = (status) => {
    return status === true ? (
      <div className="status-badge active">Active</div>
    ) : (
      <div className="status-badge inactive">Inactive</div>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar Header */}
      <AdminHeader />

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f8fafc' }}>
        <div className="aum-root">


          <main className="aum-main">
            <section className="aum-stats-row">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <div
                    key={`stat-${tab.id}`}
                    className={`aum-stats-card${activeTab === tab.id ? ' active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                    tabIndex={0}
                    title={tab.label}
                  >
                    <div className="aum-stats-icon"><Icon size={32} /></div>
                    <div className="aum-stats-info">
                      <span className="aum-stats-label">{tab.label}</span>
                      <span className="aum-stats-value">{tab.count}</span>
                    </div>
                  </div>
                );
              })}
            </section>

            <nav className="aum-tabs">
              {tabs.map((tab) => (
                <button
                  key={`tab-${tab.id}`}
                  className={`aum-tab-btn${activeTab === tab.id ? ' active' : ''}`}
                  onClick={() => { setActiveTab(tab.id); setCurrentPage(1); }}
                >
                  {tab.label}
                  {activeTab === tab.id && (<span className="aum-tab-count">{activeTab === tab.id ? numberUser : ''}</span>)}
                </button>
              ))}
            </nav>

            <div className="aum-search-filter-row">
              <div className="aum-search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder={`Search ${selectedRole} by name ...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="aum-filter-box">
                <button onClick={() => setShowFilters(!showFilters)} className="aum-filter-btn">
                  <Filter size={18} /> Filter
                </button>
               
                {showFilters && (
                  <div className="aum-filter-dropdown">
                    <select value={active} onChange={(e) => setActive(e.target.value)}>
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                  </div>
                )}
              </div>
               <div className="aum-date-picker">
                  <span className="aum-date-icon">
                    <svg width="18" height="18" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="13" height="11" rx="2" /><path d="M16 2v2M5 2v2M3 7h13" /></svg>
                  </span>
                  <input
                    type="date"
                    value={fromdate}
                    onChange={(e) => setFromdate(e.target.value)}
                  />
                </div>
                <span style={{ color: '#64748b', margin: '0 0.5rem' }}>to</span>
                <div className="aum-date-picker">
                  <span className="aum-date-icon">
                    <svg width="18" height="18" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="13" height="11" rx="2" /><path d="M16 2v2M5 2v2M3 7h13" /></svg>
                  </span>
                  <input
                    type="date"
                    value={todate}
                    onChange={(e) => setTodate(e.target.value)}
                  />
                </div>
            </div>

            {error && (
              <div className="aum-error-display">
                <p>{error}</p>
                <button onClick={() => setError(null)}>×</button>
              </div>
            )}

            <section className="aum-table-section">
              <div className="aum-table-wrapper">
                {isLoading ? (
                  <div className="aum-loading">
                    <div className="aum-spinner"></div>
                    <p>Loading data...</p>
                  </div>
                ) : (
                  <table className="aum-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Join Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, i) => (
                        <tr key={user.personId}>
                          <td>
                            <div className="aum-user-info">
                              <div >
                                <img className="aum-avatar" src={user.avatarUrl}></img>
                              </div>
                              <div className="aum-user-name">{user.name}</div>
                            </div>
                          </td>
                          <td>
                            <div className="aum-user-contact">
                              <span>{user.rolename || "N/A"}</span>
                            </div>
                          </td>
                          <td>{getStatusBadge(user.active)}</td>
                          <td>{user.createdDate ? new Date(user.createdDate).toLocaleDateString('en-US') : 'N/A'}</td>
                          <td>
                            <div className="aum-actions">
                              <button title="View" onClick={() => handleViewUser(user)} className="aum-action-view"><Eye size={18} /></button>
                              <button title="Edit" onClick={() => handleEditUser(user)} className="aum-action-edit"><Edit3 size={18} /></button>
                              {user.active ? (
                                <button title="Delete" onClick={() => handleDeleteUser(user.personId)} className="aum-action-delete"><Trash2 size={18} /></button>
                              ) : (
                                <button title="Restore" onClick={() => handleActiveeUser(user.personId)} className="aum-action-restore">Restore</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>

            <div className="aum-pagination-row">
              <div className="aum-pagination-info">
                Showing <span>{currentPage}</span> of <span>{totalPages}</span> results
              </div>
              {renderPagination(totalPages, currentPage)}
            </div>

            {showModal && editUser && (
              <div className="aum-modal-overlay">
                <div className="aum-modal">
                  <div className="aum-modal-header">
                    <h3>Edit User</h3>
                    <p>Update user information and role</p>
                  </div>
                  <div className="aum-modal-body">
                    <div className="aum-modal-user">
                      <div >
                        <img className="aum-avatar" src={editUser.avatarUrl}></img>
                      </div>
                      <div>
                        <h4>{editUser.name}</h4>
                        <p>{editUser.email || "N/A"}</p>
                      </div>
                    </div>
                    <div className="aum-modal-info-grid">
                      <div><span>Status:</span> <p>{editUser.active === true ? 'Active' : 'Inactive'}</p></div>
                      <div><span>Join Date:</span> <p>{editUser.createdDate ? new Date(editUser.createdDate).toLocaleDateString('vn') : 'N/A'}</p></div>
                    </div>
                    <div className="aum-modal-role">
                      <label>User Role</label>
                      <div className="aum-modal-role-options">
                        <label className={`aum-role-option${selectedRole === "CUSTOMER" ? ' selected' : ''}`}>
                          <input type="radio" name="role" value="CUSTOMER" onChange={(e) => setSelectedRole(e.target.value)} />
                          <span className="aum-role-icon"></span>
                          <span>CUSTOMER</span>
                        </label>
                        <label className={`aum-role-option${selectedRole === "STAFF_RECEPTION" ? ' selected' : ''}`}>
                          <input type="radio" name="role" value="STAFF_RECEPTION" onChange={(e) => setSelectedRole(e.target.value)} />
                          <span className="aum-role-icon"></span>
                          <span>STAFF RECEPTION</span>
                        </label>
                        <label className={`aum-role-option${selectedRole === "STAFF_LAB" ? ' selected' : ''}`}>
                          <input type="radio" name="role" value="STAFF_LAB" onChange={(e) => setSelectedRole(e.target.value)} />
                          <span className="aum-role-icon"></span>
                          <span>STAFF LAB</span>
                        </label>
                        <label className={`aum-role-option${selectedRole === "STAFF_TEST" ? ' selected' : ''}`}>
                          <input type="radio" name="role" value="STAFF_TEST" onChange={(e) => setSelectedRole(e.target.value)} />
                          <span className="aum-role-icon"></span>
                          <span>STAFF TEST</span>
                        </label>
                        <label className={`aum-role-option${selectedRole === "MANAGER" ? ' selected' : ''}`}>
                          <input type="radio" name="role" value="MANAGER" onChange={(e) => setSelectedRole(e.target.value)} />
                          <span className="aum-role-icon"></span>
                          <span>MANAGER</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="aum-modal-footer">
                    <button className="aum-btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                    <button className="aum-btn-update" onClick={handleUpdateUser}>Update</button>
                  </div>
                </div>
              </div>
            )}

            {showViewModal && viewUser && (
              <div className="aum-modal-overlay">
                <div className="aum-modal">
                  <div className="aum-modal-header">
                    <h3>View User</h3>
                    <p>User details</p>
                  </div>
                  <div className="aum-modal-body">
                    <div className="aum-modal-user">
                      <div >
                        <img className="aum-avatar" src={viewUser.avatarUrl}></img>
                      </div>
                      <div>
                        <h4>{viewUser.name}</h4>
                        <p>{viewUser.email || "N/A"}</p>
                      </div>
                    </div>
                    <div className="aum-modal-info-grid">
                      <div><span>Status:</span> <p>{viewUser.active === true ? 'Active' : 'Inactive'}</p></div>
                      <div><span>Join Date:</span> <p>{viewUser.createdDate ? new Date(viewUser.createdDate).toLocaleDateString('en-US') : 'N/A'}</p></div>
                      <div><span>Role:</span> <p>{viewUser.rolename || 'N/A'}</p></div>
                    </div>
                  </div>
                  <div className="aum-modal-footer">
                    <button className="aum-btn-cancel" onClick={() => setShowViewModal(false)}>Close</button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;

