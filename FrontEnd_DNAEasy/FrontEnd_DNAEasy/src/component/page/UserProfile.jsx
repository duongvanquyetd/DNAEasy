import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header.jsx'; 
import Footer from '../Footer.jsx'; 
import backgroundImage from '../image/Background.jpg';
import '../css/UserProfile.css';
const UserProfile = () => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/user/edit-profile');
  };

  return (
    <div className="page">
      <Header />
      <main
        className="main"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="profile-container">
          <div className="avatar"></div>
          <div className="detail">Detail</div>
          <div className="field">
            <label className="label">Name</label>
            <div className="value">Nguyen Xuan Viet</div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="value">emvietdeptrai@gmail.com</div>
          </div>
          <div className="field">
            <label className="label">Streets</label>
            <div className="value">hai phong</div>
          </div>
          <div className="field">
            <label className="label">District</label>
            <div className="value">Truong thanh</div>
          </div>
          <div className="field">
            <label className="label">City</label>
            <div className="value">Tp Ho Chi Minh</div>
          </div>
          <div className="field">
            <label className="label">Contact Number</label>
            <div className="value">01234678</div>
          </div>
          <div className="field">
            <label className="label">Gender</label>
            <div className="value">Male</div>
          </div>
          <button className="edit-button" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;
