// src/component/page/EditProfile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import '../css/EditProfile.css';
import { GetMyInfor, UpdateInfor } from '../../service/user.js';
const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigater = useNavigate();
  const [error, setError] = useState('');
  const [avatarupdate, setAvatarupate] = useState('');

  const [updatepass, setUpdatePass] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    streets: '',
    district: '',
    city: '',
    contactNumber: '',
    gender: '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',

  });
  useEffect(() => {
    GetMyInfor().then((response) => {
      setUser(response.data)
      console.log("Response Data User", response.data)
      const address = response.data.address.split(",");
      setAvatar(response.data.avatarUrl);
      setFormData(
        {
          name: response.data.name,
          email: response.data.email,
          streets: address[0],
          district: address[1],
          city: address[2],
          contactNumber: response.data.phone,
          gender: response.data.gender,
          password: '',
          newPassword: null,
          confirmNewPassword: null,
        })
    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        navigater("/user/login")
      }

    })

  }, [])
  const handleChange = (e) => {
    setError('')
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userform = new FormData();
  setError('')

    if (formData.newPassword && !/^(?=.*[A-Za-z]).{6,16}$/.test(formData.newPassword)) {
      setError("New Password must be 6-16 characters and contain at least one letter")
      return;
    }
    if (formData.confirmNewPassword != formData.newPassword) {
      setError("New PassWord and Confirm PassWord not match")
      return;
    }

    const json = ({
      name: formData.name,
      phone: formData.contactNumber,
      gender: formData.gender,
      city: formData.city.trim(),
      district: formData.district.trim(),
      streets: formData.streets.trim(),
      email: formData.email,
      newpassword: formData.newPassword,
      oldpassword: formData.password
    })
    console.log("json", json)
    userform.append("user", new Blob([JSON.stringify(json)], { type: "application/json" }))
    userform.append("file", avatarupdate ? avatarupdate : null)
    UpdateInfor(userform).then((response) => {
      
      console.log("userupdate", response.data)
      navigate('/user/profile');
    }).catch((error) => {
      if (error.response.data && error.response.data.password) {
        setError(error.response.data.password)
      }
      if (error.response.data && error.response.data.error) {
        setError(error.response.data.error)
      }
    })

  };

  return (
    <div className="page">
      <Header />
      <main className="main">
        <div className="profile-container">
          <div className="avatar-section">
            <img style={{ width: "100%" }}
              src={avatar}
              alt="User Avatar"
              className="avatar"
              
            />
          </div>
          <div className="field">
            <label className="label">Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarupate(e.target.files[0])}
              className="input"

            />
          </div>
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  required
                />
                {!formData.name && <span className="text-danger">Please input your Name</span>}
              </div>
              <div className="field">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  required
                />
                {!formData.email && <span className="text-danger">Please input your Email</span>}
              </div>
              <div className="field">
                <label className="label">Streets</label>
                <input
                  type="text"
                  name="streets"
                  value={formData.streets}
                  onChange={handleChange}
                  className="input"
                  required
                />
                {!formData.streets && <span className="text-danger">Please input your Streets</span>}
              </div>
              <div className="field">
                <label className="label">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="input"
                  required
                />
                {!formData.district && <span className="text-danger">Please input your District</span>}
              </div>

              <div className="field">
                <label className="label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="input"
                  required
                />
                {!formData.city && <span className="text-danger">Please input your City</span>}
              </div>

              <div className="field">
                <label className="label">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="input"
                  required
                />
                {!formData.contactNumber && <span className="text-danger">Please input your Phone</span>}
              </div>
              <div className="field">
                <label className="label">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
                {!formData.gender && <span className="text-danger">Please input your Gender</span>}
              </div>



              <div className="field">
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input"
                  required
                />

              </div>






              {updatepass && (
                <>

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
                </>

              )

              }

            </div>

            {error && <div className='text-danger'>{error}</div>}
            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={(e)=> setUpdatePass(updatepass ? false : true)}>{updatepass ? "Close change Password" : "Change Password"}</button>
              <button type="submit" className="save-button">Save</button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate('/user/profile')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditProfile;