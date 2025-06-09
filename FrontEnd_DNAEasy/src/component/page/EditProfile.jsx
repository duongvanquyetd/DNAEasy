// src/component/page/EditProfile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import '../css/EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();

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
    <div className="page">
      <Header />

      <main className="main">
        <div className="profile-container">
          <div className="avatar"></div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="field">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="field">
              <label className="label">Streets</label>
              <input
                type="text"
                name="streets"
                value={formData.streets}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="field">
              <label className="label">District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="field">
              <label className="label">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="field">
              <label className="label">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="field">
              <label className="label">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="field">
              <label className="label">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="field">
              <label className="label">Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                className="input"
              />
            </div>
            <button type="submit" className="save-button">Save</button>
          </form>
          <button
            type="button"
            className="cancel-button"
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

export default EditProfile;
