import React from 'react';
import { Link } from 'react-router-dom';
import '../css/BookingDetail.css';
import Footer from '../Footer';
import Header from '../Header';

const PaternityBookingDetail = () => {
  return (
    <div className="booking-page">
      <Header />
      <main className="main-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-overlay"></div>
          <img 
            src="https://image.shutterstock.com/image-photo/smile-family-portrait-on-shoulder-260nw-2476215249.jpg" 
            alt="Paternity DNA Test"
            className="hero-image" 
          />
          <div className="hero-content">
            <h1 className="hero-title">Paternity DNA Test</h1>
            <p className="hero-subtitle">Discover the Truth with Precision and Care</p>
            <p className="hero-price">1,250,000 VND/sample</p>
            <button className="hero-cta">Book Now</button>
          </div>
        </section>

        {/* Overview Section */}
        <section className="overview-section">
          <div className="overview-content">
            <div className="overview-text">
              <h2 className="section-title">Why Choose Our Paternity DNA Test?</h2>
              <p className="section-description">
                Our Paternity DNA Test offers unparalleled accuracy and confidentiality, helping you confirm biological relationships with ease. Using state-of-the-art technology, we ensure reliable results delivered with the utmost care and privacy.
              </p>
            </div>
            <div className="overview-stats">
              <div className="stat-item">
                <span className="stat-value">99.99%</span>
                <span className="stat-label">Accuracy Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">3-5 Days</span>
                <span className="stat-label">Result Delivery</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">100%</span>
                <span className="stat-label">Confidential</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">Key Benefits</h2>
          <div className="features-grid">
            {[
              { icon: '✔', title: 'High Accuracy', description: 'Achieve 99.99% accuracy with advanced DNA analysis.' },
              { icon: '⏱', title: 'Fast Results', description: 'Get your results in just 3-5 business days.' },
              { icon: '🔒', title: 'Confidential', description: 'Your privacy is our priority with secure processes.' },
              { icon: '👩‍⚕️', title: 'Expert Staff', description: 'Supported by professional medical staff.' },
              { icon: '🏢', title: 'Certified Labs', description: 'Analysis conducted in certified laboratories.' },
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <span className="feature-icon">{feature.icon}</span>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="process-section">
          <h2 className="section-title">Our Testing Process</h2>
          <div className="process-timeline">
            {[
              'Simple Cheek Swab Collection',
              'Secure Sample Processing',
              'Advanced DNA Analysis',
              'Expert Result Verification',
              'Confidential Report Delivery',
            ].map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h3 className="step-title">Step {index + 1}</h3>
                  <p className="step-description">{step}</p>
                </div>
                {index < 4 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">Take the first step towards clarity with our trusted Paternity DNA Test.</p>
          <button className="cta-button">Book Your Test Today</button>
        </section>

        {/* Customer Ratings Section */}
        <section className="ratings-section">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-description">
            Hear from others who have experienced our trusted and professional paternity testing services.
          </p>
          <div className="ratings-grid">
            {[
              {
                name: 'John D.',
                rating: 5,
                feedback: 'The process was seamless, and the results were delivered quickly. Highly professional and confidential service!',
              },
              {
                name: 'Sarah M.',
                rating: 4,
                feedback: 'Very satisfied with the accuracy and support provided. The staff was friendly and guided me through every step.',
              },
              {
                name: 'Michael T.',
                rating: 5,
                feedback: 'I appreciated the privacy and speed of the service. Got my results in just 3 days!',
              },
            ].map((review, index) => (
              <div key={index} className="feature-card">
                <div className="rating-stars">
                  {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
                </div>
                <p className="feature-description">{review.feedback}</p>
                <h3 className="feature-title">{review.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PaternityBookingDetail;