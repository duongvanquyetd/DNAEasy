import React, { useEffect, useState, useRef } from 'react';
import { getServiceById } from '../../service/service';
import { useParams, useNavigate } from 'react-router-dom';
import { CreateAppointment } from '../../service/appointment';
import { GetMyInfor } from '../../service/user';
import '/src/component/css/BookingService.css';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';

export const BookingServicePage = () => {
  const [typeCollect, setTypeCollect] = useState('');
  const [dateCollect, setDateCollect] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [location, setLocation] = useState('');
  const [phoneAppointment, setPhoneAppointment] = useState('');
  const [emailAppointment, setEmailAppointment] = useState('');
  const [services, setServices] = useState([]);
  const [errorHour, setErrorHour] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errors, setErrors] = useState({
    typeCollect: '',
    dateCollect: '',
    paymentMethod: '',
    location: '',
    phoneAppointment: '',
    emailAppointment: '',
  });

  const { id } = useParams();
  const navigator = useNavigate();
  const formGroups = useRef([]);

  useEffect(() => {
    GetMyInfor()
      .then((response) => {
        setLocation(response.data?.address || '');
        setPhoneAppointment(response.data?.phone || '');
        setEmailAppointment(response.data?.email || '');
      })
      .catch((error) => {
        console.log('Error loading user', error);
      });

    getServiceById(id)
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error('Error fetching service details:', error);
        navigator('/login');
      });

    const inputs = document.querySelectorAll('.form-control, .form-select');
    const handleFocus = (e) => {
      e.target.closest('.form-group')?.classList.add('focused');
    };
    const handleBlur = (e) => {
      e.target.closest('.form-group')?.classList.remove('focused');
    };

    inputs.forEach((input) => {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      });
    };
  }, [id, navigator]);

  const handleEmpty = () => {
    const newErrors = {};
    if (!typeCollect) newErrors.typeCollect = 'Collection type is required';
    if (!dateCollect && !typeCollect.includes('Self_collection'))
      newErrors.dateCollect = 'Collection date is required';
    if (!paymentMethod) newErrors.paymentMethod = 'Payment method is required';
    if (!location) newErrors.location = 'Location is required';
    if (!phoneAppointment) newErrors.phoneAppointment = 'Phone number is required';
    if (!emailAppointment) newErrors.emailAppointment = 'Email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingAppointment = (e) => {
    e.preventDefault();
    if (handleEmpty()) {
      const bookingDetails = {
        typeCollect,
        dateCollect,
        paymentMethod,
        location,
        serviceid: Number(id),
        phoneAppointment,
        emailAppointment,
      };
      CreateAppointment(bookingDetails)
        .then((response) => {
          setErrorHour('');
          setErrorEmail('');
          setErrorPhone('');
          if (response.data.paymenturl) {
            window.location.href = response.data.paymenturl;
          } else {
            navigator('/yourappointment');
          }
        })
        .catch((error) => {
          const data = error.response?.data || {};
          setErrorHour(data.error || '');
          setErrorPhone(data.phoneAppointment || '');
          setErrorEmail(data.emailAppointment || '');
        });
    }
  };

  const dnaImage = `data:image/svg+xml,...`; // (Giữ nguyên như cũ hoặc rút gọn để dễ đọc)

  return (
    <>
      <Header />

    <div className="main-container">
      <div className="booking-header">
        <h1>{services.serviceName || 'Book a DNA Test'}</h1>
        <p className="subtitle">Accurate and confidential DNA testing</p>
        <div className="service-image">
          <img
            src={services.imageUrls?.[0] || dnaImage}
            alt={services.serviceName || 'DNA Test Service'}
          />
        </div>
      </div>

      <div className="form-container">
        <form className="booking-form" onSubmit={handleBookingAppointment}>
          <div className="form-group">
            <label htmlFor="typeCollect">Collection Type:</label>
            <select
              id="typeCollect"
              className={`form-select ${errors.typeCollect ? 'is-invalid' : ''}`}
              value={typeCollect}
              onChange={(e) => setTypeCollect(e.target.value)}
              required
            >
              <option value="">--Select--</option>
              {services.typeService === 'civil' && (
                <>
                  <option value="Self_collection">Self Collection</option>
                  <option value="Home_collection">Home Collection</option>
                  <option value="Hospital_collection">Hospital Collection</option>
                </>
              )}
              {services.typeService === 'legal' && (
                <option value="Hospital_collection">Hospital Collection</option>
              )}
            </select>
            {errors.typeCollect && <div className="invalid-feedback">{errors.typeCollect}</div>}
          </div>

          {!typeCollect.includes('Self_collection') && (
            <div className="form-group">
              <label htmlFor="dateCollect">Collection Date:</label>
              <input
                type="datetime-local"
                id="dateCollect"
                className={`form-control ${errors.dateCollect ? 'is-invalid' : ''}`}
                value={dateCollect}
                onChange={(e) => setDateCollect(e.target.value)}
                required
              />
              {errors.dateCollect && <div className="invalid-feedback">{errors.dateCollect}</div>}
              {errorHour && <div className="text-danger">{errorHour}</div>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method:</label>
            <select
              id="paymentMethod"
              className={`form-select ${errors.paymentMethod ? 'is-invalid' : ''}`}
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              
              {typeCollect !== 'Hospital_collection' ? (
                <><option value="">--Select--</option> <option value="VNPay">VNPay</option></>
              ) : (
                <><option value="">--Select--</option>
              <option value="VNPay">VNPay</option>
              <option value="Cash">Cash</option> </>)}
            </select>
            {errors.paymentMethod && <div className="invalid-feedback">{errors.paymentMethod}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              className={`form-control ${errors.location ? 'is-invalid' : ''}`}
              value={
                typeCollect === 'Hospital_collection'
                  ? '111 Le Van Viet, District 9, Thu Duc City'
                  : location
              }
              onChange={(e) => setLocation(e.target.value)}
              readOnly={typeCollect === 'Hospital_collection'}
              required
            />
            {errors.location && <div className="invalid-feedback">{errors.location}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="phoneAppointment">Phone Number:</label>
            <input
              type="tel"
              id="phoneAppointment"
              className={`form-control ${errors.phoneAppointment ? 'is-invalid' : ''}`}
              value={phoneAppointment}
              onChange={(e) => setPhoneAppointment(e.target.value)}
              required
            />
            {errors.phoneAppointment && (
              <div className="invalid-feedback">{errors.phoneAppointment}</div>
            )}
            {errorPhone && <div className="text-danger">{errorPhone}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="emailAppointment">Email:</label>
            <input
              type="email"
              id="emailAppointment"
              className={`form-control ${errors.emailAppointment ? 'is-invalid' : ''}`}
              value={emailAppointment}
              onChange={(e) => setEmailAppointment(e.target.value)}
              required
            />
            {errors.emailAppointment && (
              <div className="invalid-feedback">{errors.emailAppointment}</div>
            )}
            {errorEmail && <div className="text-danger">{errorEmail}</div>}
          </div>

          <div className="price-display">
            <div className="price-label">Total Cost</div>
            <div className="price-value">
              {services.price ? `${services.price.toLocaleString()} VND` : 'N/A'}
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Book Now
          </button>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default BookingServicePage;
