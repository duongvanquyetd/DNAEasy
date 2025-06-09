import React from 'react';
import { Link } from 'react-router-dom';
import '../css/BookingDetail.css';
import Footer from '../Footer';
import Header from '../Header';

const MotherChildBookingDetail = () => {
  return (
    <div className="booking-page">
      <Header />
      <main className="main-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-overlay"></div>
          <img 
            src="https://image.shutterstock.com/image-photo/mother-hugging-child-happy-portrait-260nw-1234567890.jpg" 
            alt="Mother-Child DNA Test"
            className="hero-image" 
          />
          <div className="hero-content">
            <h1 className="hero-title">Mother-Child DNA Test</h1>
            <p className="hero-subtitle">Reassurance Through Scientific Certainty</p>
            <p className="hero-price">1,250,000 VND/sample</p>
            <button className="hero-cta">Book Now</button>
          </div>
        </section>

        {/* Overview Section */}
        <section className="overview-section">
          <div className="overview-content">
            <div className="overview-text">
              <h2 className="section-title">Why Choose Our Mother-Child DNA Test?</h2>
              <p className="section-description">
                Our Mother-Child DNA Test provides accurate and confidential verification of maternal relationships. Using advanced technology, we ensure trustworthy results with fast turnaround and complete privacy.
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
          <p className="cta-description">Take the first step towards reassurance with our trusted Mother-Child DNA Test.</p>
          <button className="cta-button">Book Your Test Today</button>
        </section>

        {/* Customer Ratings Section */}
        <section className="ratings-section">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-description">
            Hear from others who have experienced our trusted and professional mother-child DNA testing services.
          </p>
          <div className="ratings-grid">
            {[
              {
                name: 'Emily R.',
                rating: 5,
                feedback: 'The process was straightforward and the results came quickly. I felt supported throughout the entire experience.',
              },
              {
                name: 'Anna L.',
                rating: 4,
                feedback: 'Very professional service with clear communication. The results were reliable and delivered on time.',
              },
              {
                name: 'Lisa K.',
                rating: 5,
                feedback: 'I was impressed by the confidentiality and speed. The staff made the process stress-free!',
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

export default MotherChildBookingDetail;