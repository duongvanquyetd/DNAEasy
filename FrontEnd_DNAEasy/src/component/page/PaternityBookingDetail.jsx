  import React from 'react';
  import { Link } from 'react-router-dom';
  import './BookingDetail.css';

  const PaternityBookingDetail = () => {
    return (
      <div className="booking-page">
        <header>
          {/* Same header as ServicePage */}
          <div className="logo">DNAeasy</div>
          <div className="nav-container">
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/service">Service</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/">Appointment</Link></li>
                <li><Link to="/">Booking History</Link></li>
              </ul>
            </nav>
          </div>
          <div className="auth-buttons">
            <Link to="/user/login" className="LR-btn">Login</Link>
            <Link to="/user/register" className="LR-btn">Register</Link>
          </div>
        </header>

        <div className="booking-detail-container">
          <div className="service-overview">
            <img 
              src="https://image.shutterstock.com/image-photo/smile-family-portrait-on-shoulder-260nw-2476215249.jpg" 
              alt="Paternity DNA Test"
              className="service-detail-img" 
            />
            <div className="service-info">
              <h1>Paternity DNA Test</h1>
              <p className="price">1,250,000VND/mẫu</p>
              <button className="booking-confirm-btn">Book your test n</button>
            </div>
          </div>

          <div className="service-description">
            <h2>Service Description</h2>
            <p>Our Paternity DNA Test provides accurate results to determine biological relationships between father and child. The test is conducted with the highest standards of accuracy and confidentiality.</p>
            
            <div className="service-features">
              <h3>Features:</h3>
              <ul>
                <li>99.99% accuracy rate</li>
                <li>Results within 3-5 business days</li>
                <li>Confidential testing process</li>
                <li>Professional medical staff</li>
                <li>Certified laboratory analysis</li>
              </ul>
            </div>

            <div className="testing-process">
              <h3>Testing Process:</h3>
              <ol>
                <li>Simple cheek swab collection</li>
                <li>Secure sample processing</li>
                <li>Advanced DNA analysis</li>
                <li>Expert result verification</li>
                <li>Confidential report delivery</li>
              </ol>
            </div>
          </div>
        </div>

        <footer className="footer">
          {/* Same footer as ServicePage */}
        </footer>
      </div>
    );
  };

  export default PaternityBookingDetail;