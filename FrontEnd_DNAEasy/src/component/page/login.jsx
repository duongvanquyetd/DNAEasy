import React, { useState } from 'react';
import LogoImage from '../../component/image/banner/LoginImage.jpg';
import { LoginAPI } from '../../service/login';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ username: '', password: '' });
  const [inValid, setInValid] = useState('');
  const navigate = useNavigate();

  function UserLogin(e) {
    e.preventDefault();
    if (validateForm(username, password)) {
      const userlogin = { username, password };
      LoginAPI(userlogin)
        .then((response) => {
          setInValid('');
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('rolename', response.data.rolename);
          navigate('/home');
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            setInValid('Invalid username or password');
          } else {
            console.log('Unexpected login error:', error);
          }
        });
    }
  }

  function validateForm(username, password) {
    let isValid = true;
    const copyError = { username: '', password: '' };
    if (!username.trim()) {
      copyError.username = 'Username is required';
      isValid = false;
      setInValid('');
    }
    if (!password.trim()) {
      copyError.password = 'Password is required';
      isValid = false;
      setInValid('');
    }
    setError(copyError);
    return isValid;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image-section">
          <img src={LogoImage} alt="Login Illustration" className="login-image" />
        </div>

        <div className="login-form-section">
          <h2 className="login-title">Login</h2>
          <form onSubmit={UserLogin}>
            <input
              className={`login-input form-control ${error.username ? 'is-invalid' : ''}`}
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Your Username"
              required
            />
            {error.username && <div className="invalid-feedback">{error.username}</div>}

            <input
              className={`login-input form-control ${error.password ? 'is-invalid' : ''}`}
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              required
            />
            {error.password && <div className="invalid-feedback">{error.password}</div>}
            {inValid && <div className="invalid-feedback d-block">{inValid}</div>}

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <a href="/auth/google" className="login-button google-button">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              className="google-icon"
            />
            Sign in with Google
          </a>

          <p className="register-text">
            Don't have an account?{' '}
            <a href="/user/register" className="register-link">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
