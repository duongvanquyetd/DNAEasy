import React, { useState } from 'react';
import { RegisterAPI } from '../../service/login';
import { useNavigate } from 'react-router-dom';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import '../css/RegisterForm.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
    city: '',
    district: '',
    streets: '',
    name: '',
    email: '',
    phone: '',
    avatar: null,
  });

  const [mess, setMess] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!/^(?=.*[A-Za-z]).{6,16}$/.test(formData.password)) {
      newErrors.password = 'Password must be 6-16 characters and contain at least one letter';
    }
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.streets.trim()) newErrors.streets = 'Streets is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid. Must be 10 digits and start with 03, 05, 07, 08, or 09';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = new FormData();
      const { avatar, ...userInfo } = formData;
      data.append('user', new Blob([JSON.stringify(userInfo)], { type: 'application/json' }));
      if (avatar) data.append('file', avatar);

      RegisterAPI(data)
        .then(() => navigate('/home'))
        .catch((error) => setMess(error.response?.data || 'An error occurred'));
    }
  };

  return (
    <div className="register-page">
      <Header />
      <main className="register-main">
        <div className="register-container">
          <h2 className="register-title">Register Account</h2>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-row">
              <div className="form-field">
                <label>Full Name</label>
                <input type="text" name="name" onChange={handleChange}
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              <div className="form-field">
                <label>Username</label>
                <input type="text" name="username" onChange={handleChange}
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="form-field">
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" onChange={handleChange}
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Gender</label>
                <select name="gender" onChange={handleChange}
                  className={`form-control ${errors.gender ? 'is-invalid' : ''}`}>
                  <option value="">Select gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
                {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
              </div>
              <div className="form-field">
                <label>City</label>
                <input type="text" name="city" onChange={handleChange}
                  className={`form-control ${errors.city ? 'is-invalid' : ''}`} />
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>District</label>
                <input type="text" name="district" onChange={handleChange}
                  className={`form-control ${errors.district ? 'is-invalid' : ''}`} />
                {errors.district && <div className="invalid-feedback">{errors.district}</div>}
              </div>
              <div className="form-field">
                <label>Streets</label>
                <input type="text" name="streets" onChange={handleChange}
                  className={`form-control ${errors.streets ? 'is-invalid' : ''}`} />
                {errors.streets && <div className="invalid-feedback">{errors.streets}</div>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Email</label>
                <input type="email" name="email" onChange={handleChange}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="form-field">
                <label>Phone</label>
                <input type="tel" name="phone" onChange={handleChange}
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field full-width">
                <label>Avatar</label>
                <input type="file" name="avatar" accept="image/*" onChange={handleChange}
                  className={`form-control ${errors.avatar ? 'is-invalid' : ''}`} />
                {errors.avatar && <div className="invalid-feedback">{errors.avatar}</div>}
              </div>
            </div>

            {mess && <div className="text-danger">{mess}</div>}
            <button type="submit" className="submit-button">Register</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterForm;
