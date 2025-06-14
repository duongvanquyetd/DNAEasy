
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import '../css/ServiceDetail.css';
import { getServiceById } from '../../service/service';

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
      <div className="detail-errorState">
        <p>Something went wrong. Please try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="detail-retryBtn"
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
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleBookingClick = useCallback(() => {
    navigate(`/booking/${serviceId}`);
  }, [navigate, serviceId]);

  const handleBackClick = useCallback(() => {
    navigate('/service');
  }, [navigate]);

  const handleImageChange = useCallback((direction) => {
    if (!service?.imageUrls) return;
    setCurrentImageIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return service.imageUrls.length - 1;
      if (newIndex >= service.imageUrls.length) return 0;
      return newIndex;
    });
  }, [service]);

  const testSteps = [
    { label: 'Sample Collection', icon: '🧪' },
    { label: 'Lab Analysis', icon: '🔬' },
    { label: 'Results Delivery', icon: '📄' },
  ];

  return (
    <ErrorBoundary>
      <div className="detail-servicePage">
        <Header />
        {loading ? (
          <div className="detail-serviceDetailLoading">
            <div className="detail-bannerSkeleton pulse">
              <div className="detail-skeletonImage"></div>
            </div>
            <div className="detail-detailContent">
              <div className="detail-skeletonText detail-skeletonTitle pulse"></div>
              <div className="detail-skeletonText detail-skeletonPrice pulse"></div>
              <div className="detail-skeletonText detail-skeletonDescription pulse"></div>
              <div className="detail-skeletonButton pulse"></div>
            </div>
          </div>
        ) : error ? (
          <div className="detail-errorState">
            <p>{error}</p>
            <button
              onClick={handleBackClick}
              className="detail-retryBtn"
              aria-label="Back to services"
            >
              Back to Services
            </button>
          </div>
        ) : (
          <div className="detail-serviceDetail">
            <section className="detail-hero">
              <div className="detail-heroOverlay"></div>
              {service?.imageUrls?.length > 1 ? (
                <div className="detail-imageCarousel">
                  <button
                    className="detail-carouselBtn detail-prev"
                    onClick={() => handleImageChange(-1)}
                    aria-label="Previous image"
                  >
                    ←
                  </button>
                  <img
                    src={service.imageUrls[currentImageIndex] || 'https://via.placeholder.com/1200x500?text=DNA+Test+Image'}
                    alt={`${service.serviceName} Image ${currentImageIndex + 1}`}
                    className="detail-heroImage"
                    loading="lazy"
                  />
                  <button
                    className="detail-carouselBtn detail-next"
                    onClick={() => handleImageChange(1)}
                    aria-label="Next image"
                  >
                    →
                  </button>
                  <div className="detail-carouselDots">
                    {service.imageUrls.map((_, index) => (
                      <span
                        key={index}
                        className={`detail-carouselDot ${index === currentImageIndex ? 'detail-active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Go to image ${index + 1}`}
                      ></span>
                    ))}
                  </div>
                </div>
              ) : (
                <img
                  src={service?.imageUrls?.[0] || 'https://via.placeholder.com/1200x500?text=DNA+Test+Image'}
                  alt={`${service.serviceName} Hero`}
                  className="detail-heroImage"
                  loading="lazy"
                />
              )}
              <div className="detail-heroContent">
                <div className="detail-heroText">
                  <h1>{service.serviceName}</h1>
                  <p className="detail-subtitle">Precision DNA Testing Tailored for You</p>
                  <button
                    className="detail-ctaBtn"
                    onClick={handleBookingClick}
                    aria-label={`Book ${service.serviceName}`}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </section>

            <section className="detail-mainContent">
              <div className="detail-infoCard">
                <div className="detail-infoHeader">
                  <h2>{service.serviceName}</h2>
                  <span className="detail-badge">{service.type || 'General'}</span>
                </div>

                <div className="detail-priceSection">
                  <p className="detail-price">
                    <span className="detail-currency">VND</span>
                    {new Intl.NumberFormat('vi-VN').format(service.price)}
                  </p>
                </div>

                <div className="detail-descriptionSection">
                  <h3>About This Test</h3>
                  <p className="detail-description">{service.description || 'No description available.'}</p>
                  {service.testDetails && (
                    <div className="detail-testDetails">
                      <h4>Test Details</h4>
                      <ul>
                        {service.testDetails.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="detail-progressSection">
                  <h3>Test Process</h3>
                  <div className="detail-progressBar">
                    {testSteps.map((step, index) => (
                      <div key={index} className="detail-progressStep">
                        <span className="detail-stepIcon">{step.icon}</span>
                        <span className="detail-stepLabel">{step.label}</span>
                        {index < testSteps.length - 1 && <span className="detail-stepArrow">→</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="detail-buttonGroup">
                  <button
                    className="detail-ctaBtn"
                    onClick={handleBookingClick}
                    aria-label={`Book ${service.serviceName}`}
                  >
                    <span className="detail-btnIcon">📅</span>
                    Book Now
                  </button>
                  <button
                    className="detail-backBtn"
                    onClick={handleBackClick}
                    aria-label="Back to services"
                  >
                    <span className="detail-btnIcon">←</span>
                    Back to Services
                  </button>
                </div>
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
    testDetails: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default ServiceDetail;
