import React, { useState } from 'react';
import { RegisterAPI } from '../../service/login';
import { useNavigate } from 'react-router-dom';
import Header from '../Header.jsx'; // Import Header component
import Footer from '../Footer.jsx'; // Import Footer component

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

      if (avatar) {
        data.append('file', avatar);
      }
      RegisterAPI(data)
        .then(() => {
          navigate('/home');
        })
        .catch((error) => {
          setMess(error.response?.data || 'An error occurred');
        });
    }
  };

  return (
    <div style={styles.page}>
      <Header />

      <main style={{ ...styles.main, paddingTop: '90px' }}>
        <div style={styles.container}>
          <h2 style={styles.title}>Register Account</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* row 1 */}
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  style={styles.input}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  style={styles.input}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
            </div>

            {/* row 2 */}
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  style={styles.input}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  style={styles.input}
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>
            </div>

            {/* row 3 */}
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Gender</label>
                <select
                  name="gender"
                  onChange={handleChange}
                  className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                  style={styles.input}
                >
                  <option value="">Select gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
                {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>City</label>
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                  style={styles.input}
                />
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
              </div>
            </div>

            {/* row 4 */}
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>District</label>
                <input
                  type="text"
                  name="district"
                  onChange={handleChange}
                  className={`form-control ${errors.district ? 'is-invalid' : ''}`}
                  style={styles.input}
                />
                {errors.district && <div className="invalid-feedback">{errors.district}</div>}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Streets</label>
                <input
                  type="text"
                  name="streets"
                  onChange={handleChange}
                  className={`form-control ${errors.streets ? 'is-invalid' : ''}`}
                  style={styles.input}
                />
                {errors.streets && <div className="invalid-feedback">{errors.streets}</div>}
              </div>
            </div>

            {/* row 5 */}
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  style={styles.input}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  onChange={handleChange}
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  style={styles.input}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
            </div>

            {/* row 6 */}
            <div style={styles.row}>
              <div style={{ ...styles.field, width: '100%' }}>
                <label style={styles.label}>Avatar</label>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange}
                  className={`form-control ${errors.avatar ? 'is-invalid' : ''}`}
                  style={styles.input}
                />
                {errors.avatar && <div className="invalid-feedback">{errors.avatar}</div>}
              </div>
            </div>
            {mess && <div className="text-danger">{mess}</div>}
            <button type="submit" style={styles.button}>
              Register
            </button>
          </form>
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
  container: {
    width: 500,
    margin: '30px auto',
    padding: 20,
    border: '1px solid #ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: 'bold',
    fontSize: 24,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  row: {
    display: 'flex',
    gap: 15,
  },
  field: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    padding: '8px 10px',
    fontSize: 14,
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#4caf50',
    border: 'none',
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default RegisterForm;