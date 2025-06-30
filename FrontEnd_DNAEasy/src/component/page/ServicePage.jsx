import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import '../css/Service.css'; // Ensure this points to the CSS file with the new class names
import { SearchAndGet, ServiceReportCommnent } from '../../service/service';




const ServiceImageCarouselService = ({ imageUrls = [], serviceName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);


  useEffect(() => {
    if (imageUrls.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 5000); // 
    return () => clearInterval(intervalRef.current);
  }, [imageUrls]);

  if (!imageUrls.length) {
    return <img src="https://via.placeholder.com/320x220?text=No+Image" alt="Placeholder" className="serviceImg" />;
  }

  return (
    <div className="carouselContainerService">
      {imageUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`${serviceName} ${index}`}
          className={`carouselImageService ${index === currentIndex ? 'active' : ''}`}
          loading="lazy"
        />
      ))}
    </div>
  );
};

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
  if (hasError) return <div className="errorState"><p>Something went wrong. Please try again.</p></div>;
  return children;
};


const Service = () => {
  const navigate = useNavigate();
  const [sortColumn, setSortColumn] = useState(null);
  const [modesort, setModeSort] = useState("asc")
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 9;
  const [totalPages, setTotalPages] = useState(0);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [serviceReport, setServiceReport] = useState({
    numberOfStar: 0,
    numberOfCommnent: 0
  })





  useEffect(() => {
    fetchServices();

  }, [currentPage, servicesPerPage, searchQuery, category, sortColumn, modesort]); // Thêm category vào dependencies

  const fetchServices = useCallback(async () => {

    try {
      setLoading(true);
      // Reset to first page on new search
      console.log('Fetching services with:', { keywordSearch: searchQuery, keywordType: category, currentPage, servicesPerPage }, sortColumn, modesort);
      const response = await SearchAndGet({ keywordSearch: searchQuery, keywordType: category }, currentPage, servicesPerPage, true, sortColumn, modesort);

      const fullservice = await Promise.all(
        response.data.content.map(async (s) => {
          const rs = await ServiceReportCommnent(s.serviceId);

          console.log("r", rs.data)
          return {

            ...s,
            star: rs.data.star,
            numberOfComment: rs.data.numberFeedback
          }

        }
        )
      )
      console.log('Fetched services:', fullservice);
      setServices(fullservice);
      setTotalPages(response.data.totalPages);
      setError(null);
      setSearch('');

    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services. Please try again later.');

    } finally {
      setLoading(false);
    }
  }, [currentPage, servicesPerPage, searchQuery, category, sortColumn, modesort]);


  const handleBookingClick = useCallback((serviceId) => {
    navigate(`/service/${serviceId}`);

  }, [navigate]);

  function handlsearch() {

    setCurrentPage(1);


  }

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    const maxPagesToShow = totalPages;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      pages.push(<button key={1} className="paginationBtn" onClick={() => setCurrentPage(1)} aria-label="Go to first page">1</button>);
      if (startPage > 2) pages.push(<span key="start-ellipsis">...</span>);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(<button key={i} className={`paginationBtn ${currentPage === i ? 'active' : ''}`} onClick={() => setCurrentPage(i)} aria-label={`Go to page ${i}`} aria-current={currentPage === i ? 'page' : undefined}>{i}</button>);
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push(<span key="end-ellipsis">...</span>);
      pages.push(<button key={totalPages} className="paginationBtn" onClick={() => setCurrentPage(totalPages)} aria-label="Go to last page">{totalPages}</button>);
    }
    return pages;
  };


  return (
    <ErrorBoundary>
      <div className="servicePage">
        <Header />
        <section className="banner">
          <div className="bannerContent">
            <div className="bannerText">
              <h1>DNA Testing Services</h1>
              <p>Discover our comprehensive range of DNA testing solutions tailored for your specific requirements</p>
            </div>
            <img src="https://images.unsplash.com/photo-1643780668909-580822430155?q=80&w=1932&auto=format&fit=crop" alt="DNA Testing Banner" className="bannerImage" loading="lazy" />
          </div>
        </section>

        <section className="filterSection">
          <form className="searchBar" onSubmit={(e) => { e.preventDefault(); handlsearch(); }} >
            <input type="text" placeholder="What are you looking for?" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} aria-label="Search services" />
            <select name="category" aria-label="Select category" onChange={(e) => setCategory(e.target.value)} value={category}>
              <option value="">All Services</option>
              <option value="civil">Civil Services</option>
              <option value="legal">Legal Services</option>
            </select>
            <button type="submit" className="searchBtn" aria-label="Search">Search</button>
          </form>
        </section>
        <section className="sortSection">
          <span className="sortLabel">Sort by:</span>
          <div className="sortOptions">
            <button
              className={`sortBtn ${sortColumn === null ? 'active' : ''}`}
              onClick={() => {
                setSortColumn(null);
                setModeSort(modesort === 'asc' ? 'desc' : 'asc');
              }}
            >
              Default {sortColumn === null && (modesort === 'asc' ? '▲' : '▼')}
            </button>
            <button
              className={`sortBtn ${sortColumn === 'servicePrice' ? 'active' : ''}`}
              onClick={() => {
                setSortColumn('servicePrice');
                setModeSort(sortColumn === 'servicePrice' && modesort === 'asc' ? 'desc' : 'asc');
              }}
            >
              Price {sortColumn === 'servicePrice' && (modesort === 'asc' ? '▲' : '▼')}
            </button>
            <button
              className={`sortBtn ${sortColumn === 'serviceName' ? 'active' : ''}`}
              onClick={() => {
                setSortColumn('serviceName');
                setModeSort(sortColumn === 'serviceName' && modesort === 'asc' ? 'desc' : 'asc');
              }}
            >
              Service Name {sortColumn === 'serviceName' && (modesort === 'asc' ? '▲' : '▼')}
            </button>
          </div>
        </section>



        {loading ? (
          <div className="loadingState">
            {Array.from({ length: services }).map((_, index) => (
              <div key={index} className="skeletonCard">
                <div className="skeletonImage"></div>
                <div className="skeletonText"></div>
                <div className="skeletonText"></div>
                <div className="skeletonButton"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="errorState">
            <p>{error}</p>
            <button onClick={fetchServices} className="retryBtn" aria-label="Retry loading services">Retry</button>
          </div>
        ) : services.length === 0 ? (
          <div className="errorState">
            <p>No services found for the selected category.</p>
            <button onClick={() => setSelectedCategory('all')} className="backBtn" aria-label="Back to all services">Back to All Services</button>
          </div>
        ) : (
          <section className="servicesGrid">
            {services.map((service) => (

              <div key={service.serviceId} className="serviceCard">

                <ServiceImageCarouselService imageUrls={service.imageUrls} serviceName={service.serviceName} />
                <p className="serviceName">{service.serviceName}

                  {service.star > 0 && (

                    <span className="detail-star-inline">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span
                          key={idx}
                          className={`star${idx < service.star ? " filled" : ""}`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="feedback-count">
                        ({service.numberOfComment})
                      </span>
                    </span>

                  )}

                </p>
                <p className="price">{new Intl.NumberFormat('vi-VN').format(service.price)} VND</p>
                <button className="bookingBtn" onClick={() => handleBookingClick(service.serviceId)} aria-label={`Book ${service.serviceName}`}>Book Now</button>
              </div>
            ))}
          </section>
        )}

        <section className="pagination">{renderPagination()}</section>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

Service.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      serviceId: PropTypes.string.isRequired,
      serviceName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imageUrls: PropTypes.arrayOf(PropTypes.string),
      type: PropTypes.string,
    })
  ),
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Service;