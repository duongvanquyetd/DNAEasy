import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../component/image/banner/family.jpg'; // Adjust the path as necessary
import DNA from '../../component/image/banner/dna.jpg'; // Adjust the path as necessary
import Doctor from '../../component/image/banner/doctor.jpg'; // Adjust the path as necessary
import '../css/HomePage.css';
import Header from '../Header.jsx'; 
import Footer from '../Footer.jsx';

  function Home() {
  const [blogs, setBlogs] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Sample API endpoint for blogs (replace with your actual API URL)
    fetch('https://api.example.com/blogs')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Error fetching blogs:', error));

    // Sample API endpoint for services (replace with your actual API URL)
    fetch('https://api.example.com/services')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  return (
    <div className="app">
      <Header />
      {/* Hero Section */}
      <section className="hero-image">
        <div className="hero-overlay"></div>
        <img src={Image} alt="Family DNA Banner" className="hero-img" />
        <div className="hero-content">
          <h1>Uncover Your Genetic Story</h1>
          <p>Discover the secrets of your DNA with our advanced testing services</p>
          <Link to="/service" className="cta-btn">Get Started</Link>
        </div>
      </section>
      
      {/* Main Content Section */}
      <section className="main-content">
        <div className="main-content-left">
          <h2>What is Genetic Testing?</h2>
          <p>Genetic analysis uses advanced laboratory methods to decode your DNA, revealing insights into your intellectual potential, physical traits, nutrition needs, behavioral tendencies, and health risks.</p>
        </div>
        <div className="main-content-right">
          <img src={DNA} alt="DNA Testing Process" className="content-img" />
        </div>
      </section>

      <section className="main-content2">
        <div className="main-content2-left">
          <img src={Doctor} alt="DNA Testing Process" className="content-img" />
        </div>
        <div className="main-content2-right">
          <h2>Our DNA System</h2>
          <p>Our cutting-edge DNA testing system provides accurate, confidential, and accessible genetic insights. We empower you to understand your health, ancestry, and wellness, helping you make informed decisions about your future.</p>
        </div>
      </section>

      {/* Blog Section with Dynamic Data */}
      <section className="blog-section">
        <h2>Explore Our Blog</h2>
        <div className="blog-columns">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div className={`blog-column ${index % 2 === 0 ? 'card-left' : 'card-right'}`} key={index}>
                <img src={blog.imageUrl || 'https://images.pexels.com/photos/7088526/pexels-photo-7088526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} alt={blog.title || 'Blog Image'} className="blog-image" />
                <h3>{blog.title || 'Default Title'}</h3>
                <p>{blog.description || 'No description available.'}</p>
                <Link to={`/blog/${blog.id || 'default'}`} className="blog-btn">Read More</Link>
              </div>
            ))
          ) : (
            <React.Fragment>
              <div className="blog-column card-left">
                <img src="https://images.pexels.com/photos/7088526/pexels-photo-7088526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Home DNA Tests Guide" className="blog-image" />
                <h3>Home DNA Tests: Guide</h3>
                <p>Home DNA tests are easy to use and confidential.</p>
                <Link to="/blog/guide" className="blog-btn">Read More</Link>
              </div>
              <div className="blog-column card-right">
                <img src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Home DNA Tests" className="blog-image" />
                <h3>Home DNA Tests</h3>
                <p>Discover the accuracy of home DNA tests and why using an accredited lab is important.</p>
                <Link to="/blog/accuracy" className="blog-btn">Read More</Link>
              </div>
              <div className="blog-column card-left">
                <img src="https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=600" alt="DNA Inbreeding Testing" className="blog-image" />
                <h3>DNA for Inbreeding Testing</h3>
                <p>Information about DNA tests for consanguinity in French.</p>
                <Link to="/blog/consanguinity" className="blog-btn">Read More</Link>
              </div>
            </React.Fragment>
          )}
        </div>
      </section>

      {/* Service Section with Dynamic Data */}
      <section className="service-section">
        <h2>Our Services</h2>
        <div className="service-columns">
          {services.length > 0 ? (
            services.map((service, index) => (
              <div className={`service-column ${index % 2 === 0 ? 'card-left' : 'card-right'}`} key={index}>
                <img src={service.imageUrl || 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=600'} alt={service.title || 'Service Image'} className="service-image" />
                <h3>{service.title || 'Default Title'}</h3>
                <p>{service.description || 'No description available.'}</p>
                <Link to={`/service/${service.id || 'default'}`} className="service-btn">Learn More</Link>
              </div>
            ))
          ) : (
            <React.Fragment>
              <div className="service-column card-left">
                <img src="https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=600" alt="DNA Paternity Test" className="service-image" />
                <h3>DNA Paternity Test</h3>
                <p>Accurate and confidential paternity testing services.</p>
                <Link to="/service/paternity" className="service-btn">Learn More</Link>
              </div>
              <div className="service-column card-right">
                <img src="https://images.pexels.com/photos/7088526/pexels-photo-7088526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="DNA Ancestry Test" className="service-image" />
                <h3>DNA Ancestry Test</h3>
                <p>Discover your ancestry and family history with our DNA ancestry tests.</p>
                <Link to="/service/ancestry" className="service-btn">Learn More</Link>
              </div>
              <div className="service-column card-left">
                <img src="https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=600" alt="DNA Relationship Test" className="service-image" />
                <h3>DNA Relationship Test</h3>
                <p>Explore your genetic relationships with our DNA relationship tests.</p>
                <Link to="/service/relationship" className="service-btn">Learn More</Link>
              </div>
            </React.Fragment>
          )}
        </div>  
      </section>
                  <section className="testimonials-section">
  <h2>What Our Customers Say</h2>
  <div className="testimonial-carousel">
    {/* Map over testimonials array */}
    <div className="testimonial-card">
      <img src="customer1.jpg" alt="Customer" />
      <p>"The process was easy and results were fast!"</p>
      <span>- Jane D.</span>
    </div>
    {/* ... */}
  </div>
  </section>
   <section className="testimonials-section">
  <h2>What Experts Say</h2>
  <div className="testimonial-carousel">
    <div className="testimonial-card">
      <img src="doctor1.jpg" alt="Doctor" />
      <p>
        "This DNA testing system is highly reliable and scientifically robust. It ensures accurate results with strict confidentiality — exactly what medical professionals and patients need."
      </p>
      <span>- Dr. Nguyen Thi Lan, Geneticist</span>
    </div>
    {/* Bạn có thể thêm nhiều bác sĩ khác nếu cần */}
  </div>
</section>

<section className="how-it-works-section">
  <h2 className="how-title">How It Works</h2>
  <div className="how-steps">
    <div className="how-step">
      <div className="how-icon">🧬</div>
      <h3>Order Your Kit</h3>
      <p>Purchase your DNA test kit online and receive it at your doorstep.</p>
    </div>
    <div className="how-step">
      <div className="how-icon">🧑‍🔬</div>
      <h3>Collect Your Sample</h3>
      <p>Follow the simple instructions to collect your DNA sample safely.</p>
    </div>
    <div className="how-step">
      <div className="how-icon">📈</div>
      <h3>Get Your Results</h3>
      <p>Access your confidential results online in just a few days.</p>
    </div>
  </div>
</section>
      <Footer />
      </div>
  );
      }

      
export default Home;