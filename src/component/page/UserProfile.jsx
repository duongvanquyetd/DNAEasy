import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header.jsx'; 
import Footer from '../Footer.jsx'; 
import backgroundImage from '../image/Background.jpg'; // Đường dẫn đến ảnh

const UserProfile = () => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/user/edit-profile');
  };

  return (
    <div style={styles.page}>
      <Header /> 
      <main style={styles.main}>
        <div style={styles.profileContainer}>
          <div style={styles.avatar}></div>
          <div style={styles.detail}>Detail</div>
          <div style={styles.field}>
            <label style={styles.label}>Name</label>
            <div style={styles.value}>Nguyen Xuan Viet</div>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <div style={styles.value}>emvietdeptrai@gmail.com</div>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Streets</label>
            <div style={styles.value}>hai phong</div>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>District</label>
            <div style={styles.value}>Truong thanh</div>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>City</label>
            <div style={styles.value}>Tp Ho Chi Minh</div>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Contact Number</label>
            <div style={styles.value}>01234678</div>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Gender</label>
            <div style={styles.value}>Male</div>
          </div>
          <button style={styles.editButton} onClick={handleEditClick}>
            Edit
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  page: {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${backgroundImage})`, // Đặt background ở đây
    backgroundSize: 'cover', // Điều chỉnh kích thước ảnh
    backgroundPosition: '', // Căn giữa ảnh
    backgroundColor: '#f5f5f5', // Màu nền mặc định nếu ảnh không tải
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Container có độ mờ nhẹ
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '400px',
    position: 'relative',
  },
  avatar: {
    width: '80px',
    height: '80px',
    backgroundColor: '#ddd',
    borderRadius: '50%',
    marginBottom: '20px',
  },
  detail: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: '#888',
    fontSize: '12px',
  },
  field: {
    width: '100%',
    marginBottom: '15px',
  },
  label: {
    fontWeight: '600',
    marginBottom: '5px',
    color: '#444',
    fontSize: '14px',
    display: 'block',
  },
  value: {
    padding: '8px 10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    color: '#333',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'left',
  },
  editButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#56E0E0',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    textTransform: 'uppercase',
  },
};

export default UserProfile;