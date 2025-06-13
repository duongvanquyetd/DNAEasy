import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import backgroundImage from '../image/Background.jpg';
import '../css/UserProfile.css';
// import { fetchUserProfile } from '../../service/userApi.js';
import { fetchUserProfile } from '../../service/mockUserProfile.js'; 

const UserProfile = ({ userId = "123" }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        console.log("Fetching user profile for userId:", userId); // Debug log
        const response = await fetchUserProfile(userId);
        console.log("Response received:", response); // Debug log
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user profile:", err.message); // Debug log
        setError(err.message || 'Unable to load user profile.');
        setLoading(false);
      }
    };

    if (userId) {
      getUserProfile();
    } else {
      setError('User ID not found.');
      setLoading(false);
    }
  }, [userId]);

  const handleEditClick = () => {
    navigate('/user/edit-profile');
  };

  if (loading) {
    return (
      <div className="page">
        <Header />
        <main className="main">
          <div className="profile-container loading">
            <div className="avatar-section">
              <div className="avatar" style={{ backgroundImage: 'url(https://via.placeholder.com/150)' }}></div>
            </div>
            <div className="profile-details">
              <div className="profile-title">Loading...</div>
              {['Name', 'Email', 'Street', 'District', 'City', 'Contact Number', 'Gender'].map((label, index) => (
                <div className="field" key={index}>
                  <label className="label">{label}</label>
                  <div className="value"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <Header />
        <main className="main">
          <div className="profile-container">
            <div className="profile-title">Error</div>
            <div className="field">
              <div className="value">{error}</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Header />
      <main className="main" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="profile-container">
          <div className="avatar-section">
            <div className="avatar" style={{ backgroundImage: `url(${user?.avatarUrl})` }}></div>
          </div>
          <div className="detail">Details</div>
          <div className="profile-details">
            <div className="profile-title">User Profile</div>
            <div className="field">
              <label className="label">Name</label>
              <div className="value">{user?.name || 'N/A'}</div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="value">{user?.email || 'N/A'}</div>
            </div>
            <div className="field">
              <label className="label">Street</label>
              <div className="value">{user?.streets || 'N/A'}</div>
            </div>
            <div className="field">
              <label className="label">District</label>
              <div className="value">{user?.district || 'N/A'}</div>
            </div>
            <div className="field">
              <label className="label">City</label>
              <div className="value">{user?.city || 'N/A'}</div>
            </div>
            <div className="field">
              <label className="label">Contact Number</label>
              <div className="value">{user?.contactNumber || 'N/A'}</div>
            </div>
            <div className="field">
              <label className="label">Gender</label>
              <div className="value">{user?.gender || 'N/A'}</div>
            </div>
            <button className="edit-button" onClick={handleEditClick}>
              Edit
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;