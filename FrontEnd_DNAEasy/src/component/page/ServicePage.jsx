import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Service.css';
import Header from '../Header.jsx'; 
import Footer from '../Footer.jsx';

const Service = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate an API call with mock data since the backend API is not ready
    const fetchMockServices = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Mock dataset (same as the original hardcoded services)
          const mockServices = [
            { id: 'paternity', title: 'Paternity DNA Test', price: '1,250,000VND/mẫu', img: 'https://image.shutterstock.com/image-photo/smile-family-portrait-on-shoulder-260nw-2476215249.jpg' },
            { id: 'mother-child', title: 'Mother-Child DNA Testing', price: '1,250,000VND/mẫu', img: 'https://image.shutterstock.com/image-photo/family-parenthood-people-concept-happy-260nw-2341637857.jpg' },
            { id: 'paternal', title: 'Paternal DNA Testing', price: '1,250,000VND/mẫu', img: 'https://cdn.stocksnap.io/img-thumbs/280h/kids-father_NFZION4R4G.jpg' },
            { id: 'maternal-lineage', title: 'Maternal Lineage DNA Testing', price: '1,250,000VND/mẫu', img: 'https://cdn.stocksnap.io/img-thumbs/280h/mother-son_5WGHFLZULM.jpg' },
            { id: 'birth', title: 'Birth DNA Test', price: '1,250,000VND/mẫu', img: 'https://image.shutterstock.com/image-photo/sleeping-baby-boy-12-months-260nw-2556901361.jpg' },
            { id: 'divorce', title: 'DNA Test Divorce', price: '1,250,000VND/mẫu', img: 'https://image.shutterstock.com/image-photo/smiling-mid-adult-couple-hugging-260nw-2006404289.jpg' },
          ];
          resolve(mockServices);
        }, 1000); // Simulate a 1-second delay for the API call
      });
    };

    // Fetch mock services
    fetchMockServices()
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
        console.error('Error fetching mock services:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount

const handleBookingClick = (serviceId) => {
  navigate(`/booking/${serviceId}`);
};


  const handleFilterClick = (type) => {
    navigate(`/service/${type}`);
  };

  if (loading) {
    return (
      <div className="service-page">
        <Header />
        <div className="loading-container">
          <p>Loading services...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="service-page">
        <Header />
        <div className="error-container">
          <p>Error: {error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="service-page">
      <Header />
      <section className="banner">
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <div className="banner-text">
            <h1>Discover Your DNA Story</h1>
            <p>Uncover the secrets of your heritage with our advanced DNA testing services</p>
            <Link to="/service" className="cta-btn">Explore Services</Link>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1643780668909-580822430155?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="DNA Testing Banner" 
            className="banner-image"  
          />
        </div>
      </section>

      <section className="filter-section">
        <div className="filter-container">
          <button 
            className="filter-btn active" 
            onClick={() => handleFilterClick('civil')}
          >
            Civil
          </button>
          <button 
            className="filter-btn" 
            onClick={() => handleFilterClick('legal')}
          >
            Legal
          </button>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search services..." aria-label="Search services" />
          <button className="search-btn" aria-label="Search">Search</button>
        </div>
      </section>

      <section className="services-grid">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service.id} className="service-card">
              <img src={service.img || 'https://via.placeholder.com/300'} alt={service.title} className="service-img" />
              <div className="service-info">
                <h3>{service.title || 'Untitled Service'}</h3>
                <p className="price">{service.price || 'Price not available'}</p>
                <button
                  className="booking-btn"
                  onClick={() => handleBookingClick(service.id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-services">
            <p>No services available at the moment.</p>
          </div>
        )}
      </section>

      <section className="pagination">
        <button className="pagination-btn active">1</button>
        <button className="pagination-btn">2</button>
        <button className="pagination-btn">3</button>
        <span>...</span>
        <button className="pagination-btn">5</button>
      </section>
      <Footer />
    </div>
  );
};

export default Service;