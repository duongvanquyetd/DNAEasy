import React, { useState } from 'react';
import styled from 'styled-components';
import { RegisterAPI } from '../../service/login';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../image/background/background.jpg';



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
    <StyledWrapper backgroundImage={backgroundImage}>
      <div className="container">
        <h1 className="heading">Register Account</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-columns">
            <div className="column">
              <div className="flex-column">
                <label>Full Name</label>
                <div className={`inputForm ${errors.name ? 'is-invalid' : ''}`}>
                  <svg height={20} viewBox="0 0 32 32" width={20} xmlns="http://www.w3.org/2000/svg">
                    <g id="Layer_3" data-name="Layer 3">
                      <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
                    </g>
                  </svg>
                  <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="Enter your Full Name"
                    onChange={handleChange}
                  />
                </div>
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="flex-column">
                <label>Username</label>
                <div className={`inputForm ${errors.username ? 'is-invalid' : ''}`}>
                  <svg height={20} viewBox="0 0 32 32" width={20} xmlns="http://www.w3.org/2000/svg">
                    <g id="Layer_3" data-name="Layer 3">
                      <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
                    </g>
                  </svg>
                  <input
                    type="text"
                    name="username"
                    className="input"
                    placeholder="Enter your Username"
                    onChange={handleChange}
                  />
                </div>
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>

              <div className="flex-column">
                <label>Password</label>
                <div className={`inputForm ${errors.password ? 'is-invalid' : ''}`}>
                  <svg height={20} viewBox="-64 0 512 512" width={20} xmlns="http://www.w3.org/2000/svg">
                    <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                    <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
                  </svg>
                  <input
                    type="password"
                    name="password"
                    className="input"
                    placeholder="Enter your Password"
                    onChange={handleChange}
                  />
                </div>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <div className="flex-column">
                <label>Confirm Password</label>
                <div className={`inputForm ${errors.confirmPassword ? 'is-invalid' : ''}`}>
                  <svg height={20} viewBox="-64 0 512 512" width={20} xmlns="http://www.w3.org/2000/svg">
                    <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                    <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
                  </svg>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="input"
                    placeholder="Confirm your Password"
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>

              <div className="flex-column">
                <label>Gender</label>
                <div className={`inputForm ${errors.gender ? 'is-invalid' : ''}`}>
                  <svg height={20} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <select name="gender" onChange={handleChange} className="input">
                    <option value="">Select gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
              </div>

              <div className="flex-column">
                <label>City</label>
                <div className={`inputForm ${errors.city ? 'is-invalid' : ''}`}>
                  <svg height={20} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <input
                    type="text"
                    name="city"
                    className="input"
                    placeholder="Enter your City"
                    onChange={handleChange}
                  />
                </div>
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
              </div>
            </div>

            <div className="column">
              <div className="flex-column">
                <label>District</label>
                <div className={`inputForm ${errors.district ? 'is-invalid' : ''}`}>
                  <svg height={20} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <input
                    type="text"
                    name="district"
                    className="input"
                    placeholder="Enter your District"
                    onChange={handleChange}
                  />
                </div>
                {errors.district && <div className="invalid-feedback">{errors.district}</div>}
              </div>

              <div className="flex-column">
                <label>Streets</label>
                <div className={`inputForm ${errors.streets ? 'is-invalid' : ''}`}>
                  <svg height={20} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <input
                    type="text"
                    name="streets"
                    className="input"
                    placeholder="Enter your Streets"
                    onChange={handleChange}
                  />
                </div>
                {errors.streets && <div className="invalid-feedback">{errors.streets}</div>}
              </div>

              <div className="flex-column">
                <label>Email</label>
                <div className={`inputForm ${errors.email ? 'is-invalid' : ''}`}>
                  <svg height={20} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Enter your Email"
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="flex-column">
                <label>Phone</label>
                <div className={`inputForm ${errors.phone ? 'is-invalid' : ''}`}>
                  <svg height={20} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02l-2.2 2.2z" />
                  </svg>
                  <input
                    type="tel"
                    name="phone"
                    className="input"
                    placeholder="Enter your Phone"
                    onChange={handleChange}
                  />
                </div>
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>

              <div className="flex-column">
                <label>Avatar</label>
                <div className={`inputForm ${errors.avatar ? 'is-invalid' : ''}`}>
                  <svg height={20} viewBox="0 0 24 24" width={20} xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
                  </svg>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    className="input"
                    onChange={handleChange}
                  />
                </div>
                {errors.avatar && <div className="invalid-feedback">{errors.avatar}</div>}
              </div>
            </div>
          </div>

          {mess && <div className="invalid-feedback">{mess}</div>}
          <button type="submit" className="button-submit">Register</button>
          <p className="p">
            Already have an account?{' '}
            <a href="/user/login" className="span">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  z-index: 1;

  .container {
    max-width: 900px;
    width: 100%;
    padding: 20px;
  }

  .heading {
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    color: rgb(0, 80, 230);
    margin-bottom: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 2;
  }

  .form-columns {
    display: flex;
    gap: 30px;
    justify-content: space-between;
  }

  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
    font-size: 14px;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
    position: relative;
    z-index: 3;
    background-color: #eef2f7;
  }

  .inputForm.is-invalid {
    border: 1.5px solid #dc3545;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 85%;
    height: 100%;
    background: transparent;
    z-index: 4;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .invalid-feedback {
    color: #dc3545;
    font-size: 12px;
    margin-top: 5px;
    margin-left: 10px;
    position: relative;
    z-index: 3;
  }

  .button-submit {
    margin: 0;
    background-color:rgb(48, 120, 255);
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    z-index: 3;
  }

  .button-submit:hover {
    background-color: #252727;
  }

  .p {
    text-align: center;
    color: #151717;
    font-size: 14px;
    margin: 10px 0;
    z-index: 2;
  }

  .span {
    font-size: 14px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
  }
`;

export default RegisterForm;