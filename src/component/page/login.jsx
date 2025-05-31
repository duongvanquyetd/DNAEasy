import React, { useState } from 'react';
import LogoImage from '../../component/image/banner/LoginImage.jpg';
import { LoginAPI } from '../../service/login';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState({
    username: '',
    password: '',
  });
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
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/home');
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            setInValid('Invalid username or password');
          } else {
            console.log('Unexpected login error:', error);
          }
        });
    }
  }

  function validateForm(username, password) {
    let isValid = true;
    const copyError = { ...error };
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
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Image on the left */}
        <div style={styles.imageSection}>
          <img src={LogoImage} alt="Login Illustration" style={styles.image} />
        </div>

        {/* Form on the right with absolute positioning */}
        <div style={styles.formSection}>
          <h2 style={styles.title}>Login</h2>
          <form action="/login" method="POST">
            <input
              className={`form-control ${error.username ? 'is-invalid' : ''}`}
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Your Username"
              required
              style={styles.input}
            />
            {error.username && <div className="invalid-feedback">{error.username}</div>}

            <input
              className={`form-control ${error.password ? 'is-invalid' : ''}`}
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              required
              style={styles.input}
            />
            {error.password && <div className="invalid-feedback">{error.password}</div>}
            {inValid && <div className="invalid-feedback d-block">{inValid}</div>}

            <button type="submit" style={styles.loginBtn} onClick={UserLogin}>
              Login
            </button>
          </form>

          <a href="/auth/google" style={{ ...styles.loginBtn, ...styles.googleBtn }}>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              style={styles.googleIcon}
            />
            Sign in with Google
          </a>

          <p style={styles.registerText}>
            Don't have an account?{' '}
            <a href="/user/register" style={styles.registerLink}>Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: 'Arial, sans-serif',
    background: '#f2f2f2',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  container: {
    position: 'relative',
    display: 'flex',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    width: '700px',
    maxWidth: '90%',
    height: '400px',
  },
  imageSection: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  formSection: {
    position: 'absolute',
    right: 0,
    width: '50%',
    height: '100%',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#333',
    textAlign: 'center',
    padding: '40px',
    zIndex: 1,
    transition: 'all 0.6s ease-in-out 1.2s, visibility 0s 1s', // Updated transition
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
  },
  loginBtn: {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
    display: 'block',
    textDecoration: 'none',
  },
  googleBtn: {
    backgroundColor: '#4285F4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    marginTop: '10px',
    width: '100%',
  },
  googleIcon: {
    width: '20px',
    height: '20px',
  },
  registerText: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '14px',
  },
  registerLink: {
    color: '#4285F4',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default LoginPage;