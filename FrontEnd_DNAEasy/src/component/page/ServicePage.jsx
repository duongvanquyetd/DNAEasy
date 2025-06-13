import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import '../css/Service.css';
import { getAllServices } from '../../service/MockService';

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
  // const { type } = useParams(); // Giữ để tương thích với URL hiện tại, nhưng không sử dụng
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // Thêm trạng thái cho danh mục
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;
  const searchInputRef = useRef(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await getAllServices();
      console.log('Fetched services:', response.data);
      setServices(response.data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Failed to load services. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const debouncedSetSearchQuery = useCallback((value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    clearTimeout(searchInputRef.current);
    searchInputRef.current = setTimeout(() => debouncedSetSearchQuery(value), 300);
  };

  const handleBookingClick = useCallback((serviceId) => {
    navigate(`/service/${serviceId}`);
  }, [navigate]);

  const handleCategoryChange = useCallback((e) => {
    const category = e.target.value;
    setSelectedCategory(category); // Cập nhật trạng thái mà không điều hướng
    setCurrentPage(1); // Đặt lại trang về 1 khi thay đổi danh mục
  }, []);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setCurrentPage(1);
  }, []);

  const filteredServices = useMemo(() => {
    const result = services.filter(
      (service) =>
        service.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === 'all' || service.type.toLowerCase() === selectedCategory.toLowerCase())
    );
    console.log('Filtered services:', result, 'Selected Category:', selectedCategory);
    return result;
  }, [services, searchQuery, selectedCategory]);

  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * servicesPerPage;
    return filteredServices.slice(startIndex, startIndex + servicesPerPage);
  }, [filteredServices, currentPage]);

  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    const maxPagesToShow = 5;
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
          <form className="searchBar" onSubmit={handleSearch}>
            <input type="text" placeholder="What are you looking for?" onChange={handleSearchChange} aria-label="Search services" />
            <select name="category" aria-label="Select category" onChange={handleCategoryChange} value={selectedCategory}>
              <option value="all">All Services</option>
              <option value="civil">Civil Services</option>
              <option value="legal">Legal Services</option>
            </select>
            <button type="submit" className="searchBtn" aria-label="Search">Search</button>
          </form>
        </section>

        {loading ? (
          <div className="loadingState">
            {Array.from({ length: servicesPerPage }).map((_, index) => (
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
        ) : filteredServices.length === 0 ? (
          <div className="errorState">
            <p>No services found for the selected category.</p>
            <button onClick={() => setSelectedCategory('all')} className="backBtn" aria-label="Back to all services">Back to All Services</button>
          </div>
        ) : (
          <section className="servicesGrid">
            {paginatedServices.map((service) => (
              <div key={service.serviceId} className="serviceCard">
                <img src={service.imageUrls?.[0] || 'https://via.placeholder.com/320x220?text=Service+Image'} alt={service.serviceName} className="serviceImg" loading="lazy" />
                <h3>{service.serviceName}</h3>
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
// , useParams