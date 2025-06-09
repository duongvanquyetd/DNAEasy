import React, { use, useEffect, useState } from 'react'
import { getServiceById } from '../../service/service';
import { useParams } from 'react-router-dom';
import { CreateAppointment } from '../../service/appointment';
import { useNavigate } from 'react-router-dom';
export const BookingServicePage = () => {


  const [typeCollect, setTypeCollect] = useState('');
  const [dateCollect, setDateCollect] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [location, setLocation] = useState('');
  const [errorHour, setErrorHour] = useState('');
  const [services, setServices] = useState([]);
  const { id } = useParams();
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const [errors, setErrors] = useState({
    typeCollect: '',
    dateCollect: '',
    paymentMethod: '',
    location: '',
  });

  const navigator = useNavigate();
  useEffect(() => {
    setLocation(user ? user.address : '');
    getServiceById(id)
      .then((response) => {
        setServices(response.data);
        console.log("Service details fetched successfully:", response.data);
      }
      )
      .catch((error) => {
        console.error("Error fetching service details:", error);
        navigator('/login'); // Redirect to home page if there's an error
      });
  }, [id]);
  function handleEmpty() {
    const newErrors = {};

    if (!typeCollect) newErrors.typeCollect = 'Type of collection is required';
    if (!dateCollect) newErrors.dateCollect = 'Collection date is required';
    if (!paymentMethod) newErrors.paymentMethod = 'Payment method is required';
    if (!location) newErrors.location = 'Location is required';

    setErrors(newErrors);


    if (Object.keys(newErrors).length > 0) {
      return false;
    }
    return true;



  }

  function handlebookingAppoinment(e) {
    e.preventDefault();

    if (handleEmpty()) {

      const bookingDetails = {
        typeCollect,
        dateCollect,
        paymentMethod,
        location,
        serviceid: Number(id),
      };
      console.log("Booking details:", bookingDetails);
      CreateAppointment(bookingDetails)
        .then((response) => {
          setErrorHour('');
          console.log("Appointment booked successfully:", response.data);
          window.location.href = response.data.paymenturl;
          // Redirect to home page after booking
          // Redirect or perform any other action after successful booking
        })
        .catch((error) => {

          if (error.response && error.response.data.error) {
            setErrorHour(error.response.data.error)
          }
          console.error("Error booking appointment:", error.response.data.error);
          
        });
    }

  }

  return (
    <div>
      <h1>Booking Service</h1>
      <h2>{services.serviceName}</h2>

      <div>
        <img
          src={services.imageUrls && services.imageUrls.length > 0 ? services.imageUrls[0] : 'logo.jpg'}
          alt={services.serviceName}

          style={{ width: '200px', height: '200px' }}
        />

      </div>
      <input type="hidden" value={services.id} />
      Type Collect:
      <select className={`form-select ${errors.typeCollect ? 'is-invalid' : ''}`} aria-label="Default select example" value={typeCollect} onChange={(e) => setTypeCollect(e.target.value)}>
        {services.typeService === 'civil' ? (
          <>
            <option value="">--Select--</option>
            <option value="Self_collection">Self_collection</option>
            <option value="Home_collection">Home_collection</option>
            <option value="Hospital_collection">Hospital_collection</option>
          </>
        ) : services.typeService === 'legal' ? (
          <>
            <option value="">--Select--</option>
            <option value="Hospital_collection">Hospital_collection</option>
          </>
        ) : null}
      </select>
      {errors.typeCollect && <div className="invalid-feedback">{errors.typeCollect}</div>}

      Date Collect: <input type="datetime-local" className={`form-control ${errors.dateCollect ? 'is-invalid' : ''}`} value={dateCollect} onChange={(e) => setDateCollect(e.target.value)} />
      {errors.dateCollect && <div className="invalid-feedback">{errors.dateCollect}</div>}

      Payment Method <select className={`form-select ${errors.paymentMethod ? 'is-invalid' : ''}`} aria-label="Default select example" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="VNPay">VNPay</option>
        <option value="">--Select--</option>
      </select>
      {errors.paymentMethod && <div className="invalid-feedback">{errors.paymentMethod}</div>}

      <br />
      Location <input type="text" className={`form-control ${errors.location ? 'is-invalid' : ''}`} value={typeCollect === 'Hospital_collection' ? '111 Le Van Viet, Quan 9, Thanh pho Thu Duc' : location} onChange={(e) => setLocation(e.target.value)} readOnly={typeCollect === 'Hospital_collection'} />
      {errors.location && <div className="invalid-feedback">{errors.location}</div>}
      {errorHour && <div className='text-danger'>{errorHour}</div>}
      <button className="btn btn-primary mt-3" onClick={handlebookingAppoinment}>
        Pay :{services.price} VND
      </button>

    </div>


  )
}
