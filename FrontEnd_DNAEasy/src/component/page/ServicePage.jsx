import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Service.css';
import { getALlServies } from '../../service/service';
import Header from '../Header';
import Footer from '../Footer';
const Service = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  useEffect(() => {
    getALlServies()
      .then((response) => {
        setServices(response.data);
        console.log('Services fetched successfully:', response.data);
      })
      .catch((error) => {

        console.error('Error fetching services:', error);
        // Handle error appropriately, e.g., show a message to the user
      });
  }, []);


  const handleBookingClick = (serviceId) => {
    navigate(`/booking/${serviceId}`);
  };
  const handleFilterClick = (type) => {
    navigate(`/service/${type}`);
  };

  return (
    <div className="service-page">
   
      <Header />

      <section className="banner">
        <div className="banner-content">
          <div className="banner-text">
            <h1>DNA Testing Services </h1>
            <p>Discover our comprehensive range of DNA testing solutions tailored for your specific requirements</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1643780668909-580822430155?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="DNA Testing Banner"
            className="banner-image"
          />
        </div>
      </section>
      <section className="filter-section">
        <button
          className="filter-btn active"
          onClick={() => handleFilterClick('civil')}
        >
          civil
        </button>
        <button
          className="filter-btn"
          onClick={() => handleFilterClick('legal')}
        >
          legal
        </button>
        <div className="search-bar">
          <input type="text" placeholder="Search services" />
          <button className="search-btn">Search</button>
        </div>
      </section>

      <section className="services-grid">
        {services.map((service) => (
          <div key={service.serviceId} className="service-card">
            <img
              src={service.imageUrls && service.imageUrls.length > 0 ? service.imageUrls[0] : 'data:image/jpeg;base64,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'}
              alt={service.serviceName}
              className="service-img"
            />
            <h3>{service.serviceName}</h3>
            <p className="price">  {new Intl.NumberFormat('vi-VN').format(service.price)} VND</p>
            <button
              className="booking-btn"
              onClick={() => handleBookingClick(service.serviceId)}
            >
              Booking
            </button>
          </div>
        ))}
      </section>

      <section className="pagination">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <span>...</span>
        <button>5</button>
      </section>
     <Footer />
    </div>
  );
};

export default Service;