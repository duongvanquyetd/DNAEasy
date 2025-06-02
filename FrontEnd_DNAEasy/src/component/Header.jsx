import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './image/logo/Logo.jpg'; 

const Header = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = () => {
    navigate('/user/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <img src={Logo} alt="DNAEASY Logo" style={styles.image} /> 
      </div>
      <nav style={styles.nav}>
        <a href="#" style={styles.navLink}>Home</a>
        <a href="#" style={styles.navLink}>Service</a>
        <a href="#" style={styles.navLink}>Blog</a>
        <a href="#" style={styles.navLink}>Appointment</a>
        <a href="#" style={styles.navLink}>HistoryBooking</a>
      </nav>
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
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    fontFamily: "'Poppins', sans-serif",
  },
  logo: {
    fontSize: '50px',
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
    fontSize: '16px',
    fontWeight: '500',
    position: 'relative',
    transition: 'color 0.3s ease',
    paddingBottom: '5px',
  },
  logoutButton: {
    background: 'linear-gradient(to right, #56E0E0, #007299)',
    color: '#fff',
    padding: '8px 20px',
    borderRadius: '25px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s ease, transform 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 114, 153, 0.3)',
  },
};

export default Header;