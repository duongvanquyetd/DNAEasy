import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './image/logo/Logo.jpg';

import { Logout } from '../service/login';
import { GetMyInfor } from '../service/user';

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState('');
  useEffect(() => {
   

      if (localStorage.getItem("token")) {
        GetMyInfor().then((response) => {
          setUser(response.data)
        })

      }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.avatar-container')) {
        setIsDropdownOpen(false);
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

  const handleAdminDashboard = () => {
    navigate('/admin/dashboard');
    setIsDropdownOpen(false);
  };
  const handleManagerBlog = () => {
    navigate('/ManageBlog');
    setIsDropdownOpen(false);
  };
  const handleManagerService = () => {
    navigate('/ManageService');
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    const token = { token: localStorage.getItem("token") }
    Logout(token).then(() => {
      localStorage.clear();
      navigate('/user/login');
    });
    setIsDropdownOpen(false);
  };

  return (
    <header style={{
      ...styles.header,
      backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : '#ffffff',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : '0 2px 20px rgba(0, 0, 0, 0.05)',
      transform: isScrolled ? 'translateY(-2px)' : 'translateY(0)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      height: '100px', // Ensure consistent height
    }}>
      <div style={styles.logo}>
        <img src={Logo} alt="DNAEASY Logo" style={styles.image} />
      </div>

      <nav style={styles.nav}>

        {['Home', 'Service', 'Blog', 'YourAppointment', 'HistoryBooking'].map((item, index) => (

          <a
            key={item}
            href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`}
            style={{
              ...styles.navLink,
              animationDelay: `${index * 0.1}s`,
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#0066cc';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.textShadow = '0 2px 8px rgba(0, 102, 204, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#333';
              e.target.style.transform = 'translateY(0)';
              e.target.style.textShadow = 'none';
            }}
          >
            {item}
            <span style={styles.navUnderline}></span>
          </a>
        ))}
      </nav>

      {user && user.avatarUrl ?
        (
          <div style={styles.avatarContainer} className="avatar-container">
            <div style={styles.avatarWrapper}>
              <img
                src={user.avatarUrl}
                alt="User Avatar"
                style={styles.avatar}
                onClick={handleAvatarClick}
              />
              <div style={styles.onlineIndicator}></div>
            </div>

            {isDropdownOpen && (
              <div style={{ ...styles.dropdown, animation: 'fadeInUp 0.3s ease' }}>
                <div style={styles.dropdownHeader}>
                  <img src={user.avatarUrl} alt="User" style={styles.dropdownAvatar} />
                  <div style={styles.userInfo}>
                    <div style={styles.userName}>{user.name}</div>
                    <div style={styles.userRole}>{user.rolename}</div>
                  </div>
                </div>
                <div style={styles.dropdownDivider}></div>
                <button style={styles.dropdownItem} onClick={handleViewProfile}>👤 View Profile</button>
                {user.rolename === "ADMIN" && (

                  <button style={styles.dropdownItem} onClick={handleAdminDashboard}>⚙️ Admin Dashboard</button>
                )}
                {user.rolename === "MANAGER" && (
                  <>  
                  <button style={styles.dropdownItem} onClick={handleManagerBlog}>⚙️ Manage Blog</button>
                  <button style={styles.dropdownItem} onClick={handleManagerService}>⚙️ Manage Service</button>
</>
                )}

                <button style={styles.dropdownItem} onClick={handleLogout}>🚪 Logout</button>
              </div>
            )}
          </div>


        ) : (
          <>
            <div style={styles.authButtons}>
              <a href='/user/login' style={styles.loginBtn}>Login</a>
              <a href='/user/register' style={styles.registerBtn}>Register</a>
            </div>

          </>

        )
      }
    </header>
  );
};

const styles = {
  authButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  loginBtn: {
    padding: '8px 16px',
    borderRadius: '10px',
    backgroundColor: '#0066cc',
    color: '#fff',
    fontWeight: '600',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 102, 204, 0.2)',
  },
  registerBtn: {
    padding: '8px 16px',
    borderRadius: '10px',
    backgroundColor: '#00b894',
    color: '#fff',
    fontWeight: '600',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 184, 148, 0.2)',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#ffffff',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    fontFamily: "'Inter', 'Poppins', sans-serif",
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '0 0 20px 20px',
  },
  image: {
    width: '120px',
    height: '90px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
    transition: 'transform 0.3s ease',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '18px',
    fontWeight: '600',
    position: 'relative',
    paddingBottom: '8px',
    letterSpacing: '0.5px',
  },
  navUnderline: {
    position: 'absolute',
    bottom: '0',
    left: '50%',
    width: '0',
    height: '3px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '2px',
    transform: 'translateX(-50%)',
    transition: 'all 0.3s',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarWrapper: {
    position: 'relative',
    display: 'inline-block',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    cursor: 'pointer',
    border: '3px solid transparent',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'padding-box',
    transition: 'all 0.3s',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: '2px',
    right: '2px',
    width: '14px',
    height: '14px',
    backgroundColor: '#00d4aa',
    borderRadius: '50%',
    border: '2px solid #fff',
    boxShadow: '0 2px 8px rgba(0, 212, 170, 0.4)',
  },
  dropdown: {
    position: 'absolute',
    top: '65px',
    right: '0',
    backgroundColor: '#ffffff',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    borderRadius: '16px',
    minWidth: '280px',
    zIndex: 1000,
    overflow: 'hidden',
    border: '1px solid rgba(0, 0, 0, 0.05)',
  },
  dropdownHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  },
  dropdownAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '12px',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
  },
  userRole: {
    fontSize: '12px',
    color: '#666',
    fontWeight: '500',
  },
  dropdownDivider: {
    height: '1px',
    background: 'rgba(0, 0, 0, 0.1)',
    margin: '0 20px',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '15px 20px',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
    cursor: 'pointer',
    transition: 'all 0.3s',
    gap: '12px',
  },
};


// Global CSS reset
const globalCSS = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

`;

// Inject CSS to head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = globalCSS;
  document.head.appendChild(style);
}

export default Header;