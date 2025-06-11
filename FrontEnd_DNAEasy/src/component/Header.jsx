import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './image/logo/Logo.jpg';
import avatarImage from './image/avatar/kiet.jpg'; 

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
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

  const handleLogout = () => {
    navigate('/user/login');
    setIsDropdownOpen(false);
  };

  return (
    <header style={{
      ...styles.header,
      backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : '#ffffff',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      boxShadow: isScrolled 
        ? '0 8px 32px rgba(0, 0, 0, 0.1)' 
        : '0 2px 20px rgba(0, 0, 0, 0.05)',
      transform: isScrolled ? 'translateY(-2px)' : 'translateY(0)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <div style={styles.logo}>
        <img src={Logo} alt="DNAEASY Logo" style={styles.image} />
      </div>
      
      <nav style={styles.nav}>
        {['Home', 'Service', 'Blog', 'Appointment', 'HistoryBooking'].map((item, index) => (
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
      
      <div style={styles.avatarContainer} className="avatar-container">
        <div style={styles.avatarWrapper}>
          <img
            src={avatarImage}
            alt="User Avatar"
            style={styles.avatar}
            onClick={handleAvatarClick}
          />
          <div style={styles.onlineIndicator}></div>
        </div>
        
        {isDropdownOpen && (
          <div style={{
            ...styles.dropdown,
            animation: 'fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            <div style={styles.dropdownHeader}>
              <img src={avatarImage} alt="User" style={styles.dropdownAvatar} />
              <div style={styles.userInfo}>
                <div style={styles.userName}>Kiet</div>
                <div style={styles.userRole}>Administrator</div>
              </div>
            </div>
            <div style={styles.dropdownDivider}></div>
            <button 
              style={styles.dropdownItem} 
              onClick={handleViewProfile}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                e.target.style.color = '#fff';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#333';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              <span style={styles.dropdownIcon}>👤</span>
              View Profile
            </button>
            <button 
              style={styles.dropdownItem} 
              onClick={handleAdminDashboard}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)';
                e.target.style.color = '#fff';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#333';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              <span style={styles.dropdownIcon}>⚙️</span>
              Admin Dashboard
            </button>
            <button 
              style={styles.dropdownItem} 
              onClick={handleLogout}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
                e.target.style.color = '#fff';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#333';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              <span style={styles.dropdownIcon}>🚪</span>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#ffffff',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    fontFamily: "'Inter', 'Poppins', sans-serif",
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
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
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    paddingBottom: '8px',
    letterSpacing: '0.5px',
  },
  navUnderline: {
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: '50%',
    width: '0',
    height: '3px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '2px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translateX(-50%)',
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
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
    border: '2px solid rgba(255, 255, 255, 0.8)',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '2px',
  },
  userRole: {
    fontSize: '12px',
    color: '#666',
    fontWeight: '500',
  },
  dropdownDivider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent)',
    margin: '0 20px',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '15px 20px',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    gap: '12px',
  },
  dropdownIcon: {
    fontSize: '18px',
    opacity: 0.7,
  },
};

// Add CSS keyframes for animations
const keyframes = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.avatar-container img:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
}

nav a:hover .nav-underline {
  width: 100% !important;
}

header img:hover {
  transform: scale(1.05) rotate(-2deg);
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = keyframes;
  document.head.appendChild(styleElement);
}

export default Header;