// src/component/page/EditProfile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header.jsx'; // Ensure this path is correct
import Footer from '../Footer.jsx'; // Ensure this path is correct

const EditProfile = () => {
  const navigate = useNavigate();
  console.log('Rendering EditProfile');

  const [formData, setFormData] = useState({
    name: 'Mehrab',
    email: 'Mehrabozorgi.business@gmail.com',
    streets: '',
    district: 'Truong thanh',
    city: '',
    contactNumber: '012345678',
    gender: 'Female',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/user/profile');
  };

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>
        <div style={styles.profileContainer}>
          <div style={styles.avatar}></div>
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.field}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Streets</label>
              <input
                type="text"
                name="streets"
                value={formData.streets}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.saveButton}>
              Save
            </button>
          </form>
          <button
            type="button"
            style={styles.cancelButton}
            onClick={() => navigate('/user/profile')}
          >
            Cancel
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
    backgroundColor: '#f5f5f5',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '400px',
  },
  avatar: {
    width: '80px',
    height: '80px',
    backgroundColor: '#ddd',
    borderRadius: '50%',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: '600',
    marginBottom: '5px',
    color: '#444',
    fontSize: '14px',
  },
  input: {
    padding: '8px 10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
  },
  saveButton: {
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
  cancelButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#56E0E0',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
  },
};

export default EditProfile;