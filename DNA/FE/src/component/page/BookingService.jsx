import React, { useEffect, useState } from 'react';
import { getServiceById } from '../../service/service';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CreateAppointment } from '../../service/appointment';
import { GetMyInfor } from '../../service/user';
import '/src/component/css/BookingService.css';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';

export const BookingServicePage = () => {
  const [showDescription, setShowDescription] = useState(false);
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
    hour: ''
  });

  const [hour, setHour] = useState('');
  const locationn = useLocation();
  const custommer = locationn.state;
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {

    if (localStorage.getItem("token")) {

      if (!custommer) {
        GetMyInfor()
          .then((response) => {
            const addr = response.data.address.split(',');
            setLocation(!addr || addr === 'null' || addr === 'undefined' || addr[0] === 'null' ? '' : response.data.address);
            setPhoneAppointment(response.data?.phone || '');
            setEmailAppointment(response.data?.email || '');
          })
          .catch((error) => {
            console.log('Error loading user', error);
          });
      }
      else {

        const addr = custommer.address.split(',');
        setLocation(!addr || addr === 'null' || addr === 'undefined' || addr[0] === 'null' ? '' : custommer.address);
        setPhoneAppointment(custommer.phone || '');
        setEmailAppointment(custommer.email || '');

      }
    }

    getServiceById(id)
      .then((response) => {
        setServices(response.data);
        if (response.data.typeService === 'legal') {
          setTypeCollect("Hospital_collection")
        }
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
    if (!hour && !typeCollect.includes('Self_collection')) {newErrors.hour = 'Hour is required',setErrorHour('')};
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingAppointment = (e) => {
    e.preventDefault();
    console.log("Error", errorHour);
    if (handleEmpty()) {

      const personId = custommer ? custommer.personId : 0

      let dateTimeLocal = "";
      if (dateCollect && hour) {
        dateTimeLocal = `${dateCollect}T${hour.padStart(5, "0")}`;
      }
      const bookingDetails = {
        typeCollect,
        dateCollect: dateTimeLocal,
        paymentMethod,
        location,
        serviceid: Number(id),
        phoneAppointment,
        emailAppointment,
        personId
      };
      console.log("booking", bookingDetails)
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

      <div className="main-container-bookingpage">
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
                onChange={(e) => {setTypeCollect(e.target.value); e.target.value === 'Hospital_collection' &&   setLocation('111 Le Van Viet, District 9, Thu Duc City');}}
                required
              >

                {services.typeService === 'civil' && (
                  <>
                    <option value="">--Select--</option>
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
                  type="date"
                  id="dateCollect"
                  className={`form-control ${errors.dateCollect ? 'is-invalid' : ''}`}
                  value={dateCollect}
                  onChange={(e) => setDateCollect(e.target.value)}
                  required
                />
                {errors.dateCollect && <div className="invalid-feedback">{errors.dateCollect}</div>}

              </div>
            )}
            {dateCollect && !typeCollect.includes('Self_collection') && (
              <div className="form-group">
                <label htmlFor="hourSelect">Hour:</label>
                <select
                  id="hourSelect"
                  className="form-select"
                  value={hour}
                  onChange={e => setHour(e.target.value)}
                
                >
                  <option value="">--Select hour--</option>
                  {Array.from({ length: 11 }, (_, i) => 7 + i).map(h => (
                    <option key={h} value={`${h}:00`}>
                      {`${h}:00`}
                    </option>
                  ))}
                </select>

              </div>

            )}
            {errors.hour && <div className="text-danger">{errors.hour}</div>}
            {errorHour && <div className="text-danger">{errorHour}</div>}
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
                  location 
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
            <div style={{ marginBottom: '20px' }}>
              <button onClick={(e) => { e.stopPropagation(); setShowDescription(true) }} className="toggle-description-btn">
                ℹ️ View process
              </button>

              {showDescription && (
                <div className="modal-overlay">
                  {services.serviceDescription && (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <button
                        className="modal-close"
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          fontSize: 20,
                          background: 'transparent',
                          border: 'none',
                          color: '#666',
                          cursor: 'pointer',
                          zIndex: 2
                        }}
                        onClick={() => setShowDescription(false)}
                      >✖</button>
                      <img
                        src="https://cdn.shopify.com/s/files/1/0456/3792/7068/files/Capture_600x600.png?v=1639486530"
                        alt="Service"
                        className="modal-image"
                        style={{
                          display: 'block',
                          maxWidth: '90vw',
                          maxHeight: '90vh',
                          margin: '0 auto',
                          borderRadius: '8px',
                          background: 'none',
                          boxShadow: 'none',
                          padding: 0
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
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
