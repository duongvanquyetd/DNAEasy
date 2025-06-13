import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import '../css/Service.css'; // Reuse Service.css for consistent styling
import { getServiceById } from '../../service/MockService';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error) => {
      console.error('ErrorBoundary caught:', error);
      setHasError(true);
    };
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="errorState">
        <p>Something went wrong. Please try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="retryBtn"
          aria-label="Retry loading service"
        >
          Retry
        </button>
      </div>
    );
  }
  return children;
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

const ServiceDetail = () => {
  const { serviceId } = useParams(); // Get serviceId from URL
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await getServiceById(serviceId);
        if (!response.data) {
          throw new Error('Service not found');
        }
        setService(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching service:', error);
        setError('Failed to load service details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleBookingClick = () => {
    navigate(`/booking/${serviceId}`);
  };

  const handleBackClick = () => {
    navigate('/service');
  };

  return (
    <ErrorBoundary>
      <div className="servicePage">
        <Header />
        {loading ? (
          <div className="serviceDetailLoading">
            <div className="bannerSkeleton">
              <div className="skeletonImage"></div>
            </div>
            <div className="detailContent">
              <div className="skeletonText skeletonTitle"></div>
              <div className="skeletonText skeletonPrice"></div>
              <div className="skeletonText skeletonDescription"></div>
              <div className="skeletonButton"></div>
            </div>
          </div>
        ) : error ? (
          <div className="errorState">
            <p>{error}</p>
            <button
              onClick={handleBackClick}
              className="retryBtn"
              aria-label="Back to services"
            >
              Back to Services
            </button>
          </div>
        ) : (
          <div className="serviceDetail">
            <section className="banner">
              <div className="bannerContent">
                <div className="bannerText">
                  <h1>{service.serviceName}</h1>
                  <p>Explore the details of our {service.serviceName} service</p>
                </div>
                <img
                  src={service.imageUrls?.[0] || 'https://via.placeholder.com/1200x450?text=Service+Image'}
                  alt={`${service.serviceName} Banner`}
                  className="bannerImage"
                  loading="lazy"
                />
              </div>
            </section>
            <section className="detailContent">
              <h2>{service.serviceName}</h2>
              <p className="price">{new Intl.NumberFormat('vi-VN').format(service.price)} VND</p>
              <p className="description">{service.description || 'No description available.'}</p>
              <p className="type">Category: {service.type || 'General'}</p>
              <div className="buttonGroup">
                <button
                  className="bookingBtn"
                  onClick={handleBookingClick}
                  aria-label={`Book ${service.serviceName}`}
                >
                  Book Now
                </button>
                <button
                  className="backBtn"
                  onClick={handleBackClick}
                  aria-label="Back to services"
                >
                  Back to Services
                </button>
              </div>
            </section>
          </div>
        )}
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

ServiceDetail.propTypes = {
  service: PropTypes.shape({
    serviceId: PropTypes.string.isRequired,
    serviceName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
  }),
};

export default ServiceDetail;