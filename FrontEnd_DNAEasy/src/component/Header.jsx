import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './image/logo/Logo.jpg';

const Header = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const handleLogout = () => {
    localStorage.clear();
    navigate('/user/login');
  };


  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <img src={Logo} alt="DNAEASY Logo" style={styles.image} />
      </div>
      <nav style={styles.nav}>
        <a href="/" style={styles.navLink}>Home</a>
        <a href="/service" style={styles.navLink}>Service</a>
        <a href="/blog" style={styles.navLink}>Blog</a>
        <a href="/yourappoinment" style={styles.navLink}>Appointment</a>
        <a href="/historybooking" style={styles.navLink}>HistoryBooking</a>
      </nav>
      {user ? (
        <button
          style={{
            ...styles.logoutButton,
            background: isHovered
              ? 'linear-gradient(to right, #46D0D0, #006289)'
              : 'linear-gradient(to right, #56E0E0, #007299)',
          }}
          onClick={handleLogout}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Logout
        </button>
      ) : (
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            style={styles.logoutButton}
            onClick={() => navigate('/user/login')}
          >
            Login
          </button>
          <button
            style={styles.logoutButton}
            onClick={() => navigate('/user/register')}
          >
            Register
          </button>
        </div>
      )}
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    fontFamily: "'Poppins', sans-serif",
    maxWidth: '1250px', // Giới hạn chiều rộng tối đa
    margin: '0 auto', // Căn giữa header
    width: '100%', // Đảm bảo chiều rộng tự động điều chỉnh
  },
  logo: {
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#008CBA',
  },
  image: {
    width: '100px',
    height: '80px',
    objectFit: 'contain',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '20px',
    fontWeight: '500',
    position: 'relative',
    transition: 'color 0.3s ease, transform 0.2s ease', // Added transition for smooth effect
    paddingBottom: '3px',
  },
  logoutButton: {
    background: 'linear-gradient(to right, #56E0E0, #007299)',
    color: '#fff',
    padding: '6px 15px',
    borderRadius: '20px',
    border: 'none',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease', // Enhanced transition
    boxShadow: '0 1px 4px rgba(0, 114, 153, 0.3)',
  },
};

// Add hover effects
styles.navLink[':hover'] = {
  color: '#007299', // Change text color to match the button gradient
  transform: 'translateY(-2px)', // Slight lift effect
};

styles.logoutButton[':hover'] = {
  background: 'linear-gradient(to right, #46D0D0, #006289)', // Darker gradient on hover
  transform: 'translateY(-2px)', // Slight lift effect
  boxShadow: '0 3px 8px rgba(0, 114, 153, 0.5)', // Enhanced shadow on hover
};

export default Header;