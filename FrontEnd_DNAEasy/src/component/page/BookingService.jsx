import React, { useEffect, useState, useRef } from 'react';
import { getServiceById } from '../../service/service';
import { useParams, useNavigate } from 'react-router-dom';
import { CreateAppointment } from '../../service/appointment';
import { GetMyInfor } from '../../service/user';
import '/src/component/css/BookingService.css';

export const BookingServicePage = () => {
  const [typeCollect, setTypeCollect] = useState('');
  const [dateCollect, setDateCollect] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [location, setLocation] = useState('');
  const [phoneAppointment, setPhoneAppointment] = useState('');
  const [emailAppointment, setEmailAppointment] = useState('');
  const [services, setServices] = useState([]);
  const { id } = useParams();
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

  const navigator = useNavigate();
  const formGroups = useRef([]);

  useEffect(() => {
    // Fetch user information
    GetMyInfor()
      .then((response) => {
        setLocation(response.data ? response.data.address : '');
        setPhoneAppointment(response.data ? response.data.phone : '');
        setEmailAppointment(response.data ? response.data.email : '');
        console.log('Response Data User', response.data);
      })
      .catch((error) => {
        console.log('Error loading user', error);
      });

    // Fetch service details
    getServiceById(id)
      .then((response) => {
        setServices(response.data);
        console.log('Service details fetched successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching service details:', error);
        navigator('/login');
      });

    // Add focus/blur event listeners for form inputs
    const inputs = document.querySelectorAll('.form-control, .form-select');
    const handleFocus = (e) => {
      e.target.closest('.form-group').classList.add('focused');
    };
    const handleBlur = (e) => {
      e.target.closest('.form-group').classList.remove('focused');
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
      console.log('Booking details:', bookingDetails);
      CreateAppointment(bookingDetails)
        .then((response) => {
          setErrorHour('');
          setErrorEmail('');
          setErrorPhone('');
          console.log('Appointment booked successfully:', response.data);

          if (response.data.paymenturl) {
            window.location.href = response.data.paymenturl;
          } else {
            navigator('/yourappointment');
          }
        })
        .catch((error) => {
          setErrorHour(error.response && error.response.data.error ? error.response.data.error : '');
          setErrorPhone(
            error.response && error.response.data.phoneAppointment
              ? error.response.data.phoneAppointment
              : ''
          );
          setErrorEmail(
            error.response && error.response.data.emailAppointment
              ? error.response.data.emailAppointment
              : ''
          );
          console.error('Error booking appointment:', error.response?.data?.error || error.message);
        });
    }
  };

  const dnaImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Cdefs%3E%3ClinearGradient id='dnaGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea'/%3E%3Cstop offset='100%25' style='stop-color:%23764ba2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='300' height='300' fill='url(%23dnaGrad)'/%3E%3Cpath d='M150 50 L150 250 M100 80 Q150 100 200 80 M100 120 Q150 140 200 120 M100 160 Q150 180 200 160 M100 200 Q150 220 200 200' stroke='%23ffffff' stroke-width='4' fill='none' opacity='0.8'/%3E%3Ccircle cx='100' cy='80' r='6' fill='%23ffffff' opacity='0.9'/%3E%3Ccircle cx='200' cy='80' r='6' fill='%23ffffff' opacity='0.9'/%3E%3Ccircle cx='100' cy='120' r='6' fill='%23ffffff' opacity='0.9'/%3E%3Ccircle cx='200' cy='120' r='6' fill='%23ffffff' opacity='0.9'/%3E%3Ccircle cx='100' cy='160' r='6' fill='%23ffffff' opacity='0.9'/%3E%3Ccircle cx='200' cy='160' r='6' fill='%23ffffff' opacity='0.9'/%3E%3Ccircle cx='100' cy='200' r='6' fill='%23ffffff' opacity='0.9'/%3E%3Ccircle cx='200' cy='200' r='6' fill='%23ffffff' opacity='0.9'/%3E%3C/svg%3E`;

  return (
    <div className="main-container">
      <div className="booking-header">
        <h1>{services.serviceName || 'Book a DNA Test'}</h1>
        <p className="subtitle">Accurate and confidential DNA testing</p>
        <div className="service-image">
          <img
            src={services.imageUrls && services.imageUrls.length > 0 ? services.imageUrls[0] : dnaImage}
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
              {services.typeService === 'civil' ? (
                <>
                  <option value="">--Select--</option>
                  <option value="Self_collection">Self Collection</option>
                  <option value="Home_collection">Home Collection</option>
                  <option value="Hospital_collection">Hospital Collection</option>
                </>
              ) : services.typeService === 'legal' ? (
                <>
                  <option value="">--Select--</option>
                  <option value="Hospital_collection">Hospital Collection</option>
                </>
              ) : (
                <option value="">--Select--</option>
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
              {typeCollect === 'Hospital_collection' ? (
                <>
                  <option value="">--Select--</option>
                  <option value="Cash">Cash</option>
                </>
              ) : (
                <>
                  <option value="">--Select--</option>
                  <option value="VNPay">E-Wallet</option>
                  {/* <option value="Cash">Cash</option> */}
                </>
              )}
            </select>
            {errors.paymentMethod && <div className="invalid-feedback">{errors.paymentMethod}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              className={`form-control ${errors.location ? 'is-invalid' : ''}`}
              value={typeCollect === 'Hospital_collection' ? '111 Le Van Viet, District 9, Thu Duc City' : location}
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
            {errors.phoneAppointment && <div className="invalid-feedback">{errors.phoneAppointment}</div>}
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
            {errors.emailAppointment && <div className="invalid-feedback">{errors.emailAppointment}</div>}
            {errorEmail && <div className="text-danger">{errorEmail}</div>}
          </div>

          <div className="price-display">
            <div className="price-label">Total Cost</div>
            <div className="price-value">{services.price ? `${services.price.toLocaleString()} VND` : 'N/A'}</div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={errors.typeCollect || errors.dateCollect || errors.paymentMethod || errors.location || errors.phoneAppointment || errors.emailAppointment}
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingServicePage;