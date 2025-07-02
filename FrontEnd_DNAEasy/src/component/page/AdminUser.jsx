// import React, { useState, useEffect } from 'react';
// import { Search, Users, UserCheck, Crown, Edit3, Trash2, Plus, Filter, Download, RefreshCw, Eye, MoreVertical, Shield } from 'lucide-react';
// import { GetAllUsers, GetUserStats, UpdateUserRole, DeleteUser } from '../../service/user';
// import '../css/AdminUser.css';

// const AdminUserManagement = () => {
//   const [activeTab, setActiveTab] = useState('USER');
//   const [users, setUsers] = useState([]);
//   const [editUser, setEditUser] = useState(null);
//   const [viewUser, setViewUser] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [selectedRole, setSelectedRole] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [pageSize] = useState(10);
//   const [error, setError] = useState(null);

//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalStaff: 0,
//     totalManagers: 0,
//     totalAdmins: 0,
//     lastUpdated: new Date().toLocaleString('en-US')
//   });

//   const tabs = [
//     { id: 'USER', label: 'Users', icon: Users, count: stats.totalUsers, color: { from: '#1e3a8a', to: '#3b82f6' } },
//     { id: 'STAFF', label: 'Staff', icon: UserCheck, count: stats.totalStaff, color: { from: '#3b82f6', to: '#60a5fa' } },
//     { id: 'MANAGER', label: 'Managers', icon: Crown, count: stats.totalManagers, color: { from: '#1d4ed8', to: '#2563eb' } },
//     { id: 'ADMIN', label: 'Admins', icon: Shield, count: stats.totalAdmins, color: { from: '#7e22ce', to: '#a855f7' } },
//   ];

//   // Fetch user stats
//   useEffect(() => {
//     const fetchUserStats = async () => {
//       try {
//         console.log('Calling GetUserStats API');
//         const response = await GetUserStats();
//         console.log('Stats response:', response);
        
//         // Kiểm tra cấu trúc response - phù hợp với API từ backend
//         if (response && response.data) {
//           console.log('Stats data processed:', response.data);
          
//           // Xác định các biến từ dữ liệu trả về
//           // USER, STAFF, MANAGER, ADMIN là các key được trả về từ API
//           const totalUsers = response.data.USER || 0;
//           const totalStaff = response.data.STAFF || 0;
//           const totalManagers = response.data.MANAGER || 0;
//           const totalAdmins = response.data.ADMIN || 0;
          
//           setStats({
//             totalUsers,
//             totalStaff, 
//             totalManagers,
//             totalAdmins,
//             lastUpdated: new Date().toLocaleString('en-US')
//           });
//         }
//       } catch (err) {
//         console.error('Error fetching user stats:', err);
//         setError('Failed to load user statistics');
//       }
//     };

//     fetchUserStats();
//   }, []);

//   // Fetch users based on active tab
//   useEffect(() => {
//     const fetchUsers = async () => {
//       setIsLoading(true);
//       setError(null);
      
//       try {
//         console.log('Fetching users with params:', {
//           role: activeTab,
//           page: currentPage - 1,
//           size: pageSize,
//           keyword: searchQuery
//         });
        
//         const response = await GetAllUsers(
//           activeTab,
//           currentPage - 1, // API uses 0-based indexing
//           pageSize,
//           searchQuery
//         );
        
//         console.log('API Response (full):', response);
//         console.log('Response data:', response.data);
//         console.log('Response headers:', response.headers);
//         console.log('Response status:', response.status);
        
//         // Kiểm tra token để xem có vấn đề về authentication không
//         console.log('Current token:', localStorage.getItem('token'));
        
//         // Backend trả về mảng trực tiếp, không có cấu trúc pagination
//         if (response.data) {
//           // Thêm log chi tiết để debug
//           console.log('Setting users with:', response.data);
//           console.log('Users array type:', Array.isArray(response.data));
//           console.log('Users array length:', Array.isArray(response.data) ? response.data.length : 'not an array');
          
//           setUsers(response.data || []);
//           // Nếu API không trả về thông tin trang, giả định 1 trang
//           setTotalPages(1);
//         } else {
//           console.error('Unexpected API response structure:', response);
//           setError('Unexpected API response format');
//         }
//       } catch (err) {
//         console.error('Error fetching users:', err);
//         console.error('Error details:', err.response ? {
//           status: err.response.status,
//           statusText: err.response.statusText,
//           data: err.response.data
//         } : 'No response');
        
//         setError(`Failed to load users: ${err.message || 'Unknown error'}`);
//         setUsers([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [activeTab, currentPage, pageSize, searchQuery]);

//   // Debounced search
//   useEffect(() => {
//     const debounceTimer = setTimeout(() => {
//       setCurrentPage(1); // Reset to first page on new search
//     }, 500);

//     return () => clearTimeout(debounceTimer);
//   }, [searchQuery]);

//   const handleEditUser = (user) => {
//     console.log('User object to edit:', user);
//     console.log('Available properties:', Object.keys(user));
    
//     // Sử dụng name thay vì id để xác định người dùng
//     if (!user.name) {
//       setError('Cannot edit user: User name is missing');
//       return;
//     }
    
//     setEditUser(user);
//     setSelectedRole(user.role);
//     setShowModal(true);
//   };

//   const handleViewUser = (user) => {
//     setViewUser(user);
//     setShowViewModal(true);
//   };

//   const handleUpdateUser = async () => {
//     if (editUser) {
//       setIsLoading(true);
//       try {
//         // Kiểm tra name có tồn tại không
//         if (!editUser.name) {
//           throw new Error('User name is missing');
//         }
        
//         console.log('Updating user with name:', editUser.name, 'to role:', selectedRole);
        
//         // Sử dụng name thay vì id
//         await UpdateUserRole(editUser.name, selectedRole);
        
//         // Update the user in the local state
//         setUsers(prevUsers => 
//           prevUsers.map(user =>
//             user.name === editUser.name ? { ...user, role: selectedRole } : user
//           )
//         );
        
//         // Refresh user stats after updating role
//         const response = await GetUserStats();
//         if (response && response.data) {
//           const totalUsers = response.data.USER || 0;
//           const totalStaff = response.data.STAFF || 0;
//           const totalManagers = response.data.MANAGER || 0;
//           const totalAdmins = response.data.ADMIN || 0;
          
//           setStats({
//             totalUsers,
//             totalStaff,
//             totalManagers,
//             totalAdmins,
//             lastUpdated: new Date().toLocaleString('en-US')
//           });
//         }
        
//         setShowModal(false);
//         setEditUser(null);
//       } catch (err) {
//         console.error('Error updating user:', err);
//         setError(`Failed to update user: ${err.message || 'Unknown error'}`);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleDeleteUser = async (user) => {
//     if (!user || !user.name) {
//       setError('Cannot delete: User name is missing');
//       return;
//     }
    
//     if (window.confirm(`Are you sure you want to delete user "${user.name}"?`)) {
//       setIsLoading(true);
//       try {
//         // Sử dụng name thay vì id
//         await DeleteUser(user.name);
        
//         // Xóa user khỏi state
//         setUsers(users.filter(u => u.name !== user.name));
        
//         // Cập nhật lại thống kê sau khi xóa
//         const response = await GetUserStats();
//         if (response.data) {
//           const totalUsers = response.data.USER || 0;
//           const totalStaff = response.data.STAFF || 0;
//           const totalManagers = response.data.MANAGER || 0;
//           const totalAdmins = response.data.ADMIN || 0;
          
//           setStats({
//             totalUsers,
//             totalStaff,
//             totalManagers,
//             totalAdmins,
//             lastUpdated: new Date().toLocaleString('en-US')
//           });
//         }
//       } catch (err) {
//         console.error('Error deleting user:', err);
//         setError(`Failed to delete user: ${err.message || 'Unknown error'}`);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const getStatusBadge = (status) => {
//     // Chuyển đổi status từ boolean sang text
//     const isActive = status === true;
    
//     return isActive ? (
//       <div className="status-badge active">
//         Active
//       </div>
//     ) : (
//       <div className="status-badge inactive">
//         Inactive
//       </div>
//     );
//   };

//   const getAvatarColor = (index) => {
//     const gradients = [
//       'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
//       'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
//       'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
//       'linear-gradient(135deg, #60a5fa 0%, #93c5fd 100%)',
//       'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)'
//     ];
//     return gradients[index % gradients.length];
//   };

//   return (
//     <div className="aum-root">
//       {/* Header */}
//       <header className="aum-header">
//         <div className="aum-header-content">
//           <div className="aum-header-title">
//             <Users size={36} className="aum-header-icon" />
//             <div>
//               <h1>User Management</h1>
//               <p>Efficiently manage customers, staff, and system managers</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="aum-main">
//         {/* Stats Cards */}
//         <section className="aum-stats-row">
//           {tabs.map((tab) => {
//             const Icon = tab.icon;
//             return (
//               <div
//                 key={`stat-${tab.id}`}
//                 className={`aum-stats-card${activeTab === tab.id ? ' active' : ''}`}
//                 onClick={() => setActiveTab(tab.id)}
//                 tabIndex={0}
//                 title={tab.label}
//               >
//                 <div className="aum-stats-icon"><Icon size={32} /></div>
//                 <div className="aum-stats-info">
//                   <span className="aum-stats-label">{tab.label}</span>
//                   <span className="aum-stats-value">{tab.count.toLocaleString()}</span>
//                 </div>
//               </div>
//             );
//           })}
//         </section>

//         {/* Tabs */}
//         <nav className="aum-tabs">
//           {tabs.map((tab) => (
//             <button
//               key={`tab-${tab.id}`}
//               className={`aum-tab-btn${activeTab === tab.id ? ' active' : ''}`}
//               onClick={() => { setActiveTab(tab.id); setCurrentPage(1); }}
//             >
//               {tab.label}
//               <span className="aum-tab-count">{tab.count}</span>
//             </button>
//           ))}
//         </nav>

//         {/* Search & Filter */}
//         <div className="aum-search-filter-row">
//           <div className="aum-search-box">
//             <Search size={18} />
//             <input
//               type="text"
//               placeholder={`Search ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="aum-filter-box">
//             <button onClick={() => setShowFilters(!showFilters)} className="aum-filter-btn">
//               <Filter size={18} /> Filter
//             </button>
//             {showFilters && (
//               <div className="aum-filter-dropdown">
//                 <select>
//                   <option key="all-statuses">All Statuses</option>
//                   <option key="active">Active</option>
//                   <option key="inactive">Inactive</option>
//                 </select>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Error display */}
//         {error && (
//           <div className="aum-error-display">
//             <p>{error}</p>
//             <button onClick={() => setError(null)}>&times;</button>
//           </div>
//         )}

//         {/* Table */}
//         <section className="aum-table-section">
//           <div className="aum-table-wrapper">
//             {isLoading ? (
//               <div className="aum-loading">
//                 <div className="aum-spinner"></div>
//                 <p>Loading data...</p>
//               </div>
//             ) : (
//               <table className="aum-table">
//                 <thead>
//                   <tr>
//                     <th>User</th>
//                     <th>Contact</th>
//                     <th>Status</th>
//                     <th>Join Date</th>
//                     <th>Last Login</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((user, i) => (
//                     <tr key={user.id}>
//                       <td>
//                         <div className="aum-user-info">
//                           <div className="aum-avatar" style={{ background: getAvatarColor(i) }}>
//                             {user.name ? user.name.substring(0, 2).toUpperCase() : 'NA'}
//                           </div>
//                           <div className="aum-user-name">{user.name}</div>
//                         </div>
//                       </td>
//                       <td>
//                         <div className="aum-user-contact">
//                           <span key="email">{user.email || "N/A"}</span>
//                           <span key="phone">{user.phone || "N/A"}</span>
//                         </div>
//                       </td>
//                       <td>{getStatusBadge(user.status)}</td>
//                       <td>{user.createdDate ? new Date(user.createdDate).toLocaleDateString('en-US') : 'N/A'}</td>
//                       <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('en-US') : 'N/A'}</td>
//                       <td>
//                         <div className="aum-actions">
//                           <button title="View" onClick={() => handleViewUser(user)} className="aum-action-view"><Eye size={18} /></button>
//                           <button title="Edit" onClick={() => handleEditUser(user)} className="aum-action-edit"><Edit3 size={18} /></button>
//                           <button title="Delete" onClick={() => handleDeleteUser(user)} className="aum-action-delete"><Trash2 size={18} /></button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </section>

//         {/* Pagination */}
//         <div className="aum-pagination-row">
//           <div className="aum-pagination-info">
//             Showing <span>{users.length}</span> of <span>{tabs.find(t => t.id === activeTab)?.count}</span> results
//           </div>
//           <div className="aum-pagination-btns">
//             <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>&larr; Previous</button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={`page-${page}`}
//                 className={page === currentPage ? 'active' : ''}
//                 onClick={() => setCurrentPage(page)}
//               >
//                 {page}
//               </button>
//             ))}
//             <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next &rarr;</button>
//           </div>
//         </div>

//         {/* Edit Modal */}
//         {showModal && editUser && (
//           <div className="aum-modal-overlay">
//             <div className="aum-modal">
//               <div className="aum-modal-header">
//                 <h3>Edit User</h3>
//                 <p>Update user information and role</p>
//               </div>
//               <div className="aum-modal-body">
//                 <div className="aum-modal-user">
//                   <div className="aum-avatar" style={{ background: getAvatarColor(0) }}>
//                     {editUser.name ? editUser.name.substring(0, 2).toUpperCase() : 'NA'}
//                   </div>
//                   <div>
//                     <h4>{editUser.name}</h4>
//                     <p>{editUser.email || "N/A"}</p>
//                   </div>
//                 </div>
//                 <div className="aum-modal-info-grid">
//                   <div key="status"><span>Status:</span> <p>{editUser.status === true ? 'Active' : 'Inactive'}</p></div>
//                   <div key="join-date"><span>Join Date:</span> <p>{editUser.createdDate ? new Date(editUser.createdDate).toLocaleDateString('en-US') : 'N/A'}</p></div>
//                 </div>
//                 <div className="aum-modal-role">
//                   <label>User Role</label>
//                   <div className="aum-modal-role-options">
//                     {tabs.map((tab) => {
//                       const Icon = tab.icon;
//                       return (
//                         <label key={`role-${tab.id}`} className={`aum-role-option${selectedRole === tab.id ? ' selected' : ''}`}>
//                           <input
//                             type="radio"
//                             name="role"
//                             value={tab.id}
//                             checked={selectedRole === tab.id}
//                             onChange={(e) => setSelectedRole(e.target.value)}
//                           />
//                           <span className="aum-role-icon"><Icon size={20} /></span>
//                           <span>{tab.label}</span>
//                         </label>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//               <div className="aum-modal-footer">
//                 <button className="aum-btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
//                 <button className="aum-btn-update" onClick={handleUpdateUser}>Update</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* View Modal */}
//         {showViewModal && viewUser && (
//           <div className="aum-modal-overlay">
//             <div className="aum-modal">
//               <div className="aum-modal-header">
//                 <h3>View User</h3>
//                 <p>User details</p>
//               </div>
//               <div className="aum-modal-body">
//                 <div className="aum-modal-user">
//                   <div className="aum-avatar" style={{ background: getAvatarColor(0) }}>
//                     {viewUser.name ? viewUser.name.substring(0, 2).toUpperCase() : 'NA'}
//                   </div>
//                   <div>
//                     <h4>{viewUser.name}</h4>
//                     <p>{viewUser.email || "N/A"}</p>
//                   </div>
//                 </div>
//                 <div className="aum-modal-info-grid">
//                   <div key="status"><span>Status:</span> <p>{viewUser.status === true ? 'Active' : 'Inactive'}</p></div>
//                   <div key="join-date"><span>Join Date:</span> <p>{viewUser.createdDate ? new Date(viewUser.createdDate).toLocaleDateString('en-US') : 'N/A'}</p></div>
//                   <div key="role"><span>Role:</span> <p>{viewUser.role || 'N/A'}</p></div>
//                 </div>
//               </div>
//               <div className="aum-modal-footer">
//                 <button className="aum-btn-cancel" onClick={() => setShowViewModal(false)}>Close</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminUserManagement;
