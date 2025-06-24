import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './image/logo/Logo.jpg';
import './css/HeaderManager.css';
import { GetMyInfor } from '../service/user';
import { Logout } from '../service/login';
import { BellOutlined } from '@ant-design/icons';

const navItems = [
  { name: 'Home', path: '/Home' },
  { name: 'Manage Service', path: '/ManageService' },
  { name: 'Manage Blog', path: '/ManageBlog' },
  { name: 'Manage Staff', path: '/assign-staff' },
];

const HeaderManager = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Mock notifications
  const notifications = [
    { id: 1, text: 'Bạn có 1 cuộc hẹn mới cần phân công.' },
    { id: 2, text: 'Nhân viên A đã hoàn thành lấy mẫu.' },
    { id: 3, text: 'Có 1 phản hồi mới từ khách hàng.' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      GetMyInfor().then((response) => {
        setUser(response.data);
      });
    }
    const handleClickOutside = (event) => {
      if (!event.target.closest('.header-manager-avatar-container') &&
          !event.target.closest('.header-manager-bell-container')) {
        setIsDropdownOpen(false);
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleViewProfile = () => {
    navigate('/user/profile');
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    const token = { token: localStorage.getItem('token') };
    Logout(token).then(() => {
      localStorage.clear();
      navigate('/user/login');
    });
    setIsDropdownOpen(false);
  };

  return (
    <header className={`header-manager ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-manager-logo-container">
        <Link to="/">
          <img src={Logo} alt="DNAEASY Logo" className="header-manager-logo-image" />
        </Link>
      </div>
      <nav className="header-manager-nav-container">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`header-manager-nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      {user ? (
        <div style={{display: 'flex', alignItems: 'center', gap: '18px'}}>
          {/* Bell icon */}
          <div
            className="header-manager-bell-container"
            style={{ position: 'relative' }}
            onClick={e => e.stopPropagation()}
          >
            <BellOutlined
              style={{ fontSize: 28, color: '#3730A3', cursor: 'pointer' }}
              onClick={e => {
                e.stopPropagation();
                setIsNotificationOpen(!isNotificationOpen);
              }}
            />
            {/* Notification badge */}
            {notifications.length > 0 && (
              <span style={{position: 'absolute', top: 2, right: 2, background: '#E11D48', color: '#fff', borderRadius: '50%', fontSize: 11, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, border: '2px solid #fff'}}> {notifications.length} </span>
            )}
            {/* Notification popup */}
            {isNotificationOpen && (
              <div
                className="header-manager-notification-popup"
                onClick={e => e.stopPropagation()}
              >
                <div className="header-manager-notification-title">Thông báo</div>
                <ul className="header-manager-notification-list">
                  {notifications.length === 0 ? (
                    <li className="header-manager-notification-empty">Không có thông báo mới.</li>
                  ) : notifications.map(n => (
                    <li key={n.id} className="header-manager-notification-item">{n.text}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Avatar */}
          <div className="header-manager-avatar-container">
            <div className="header-manager-avatar-wrapper">
              <div
                className="header-manager-avatar"
                onClick={handleAvatarClick}
              >
                <img
                  src={user.avatarUrl}
                  alt="User Avatar"
                />
              </div>
              <div className="header-manager-online-indicator"></div>
            </div>
            {isDropdownOpen && (
              <div className="header-manager-dropdown">
                <div className="header-manager-dropdown-header">
                  <img src={user.avatarUrl} alt="User" className="header-manager-dropdown-avatar" />
                  <div className="header-manager-user-info">
                    <div className="header-manager-user-name">{user.name}</div>
                    <div className="header-manager-user-role">{user.rolename}</div>
                  </div>
                </div>
                <div className="header-manager-dropdown-divider"></div>
                <button className="header-manager-dropdown-item" onClick={handleViewProfile}>👤 View Profile</button>
                <button className="header-manager-dropdown-item" onClick={handleLogout}>🚪 Logout</button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default HeaderManager;
