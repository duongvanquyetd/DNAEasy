import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Image from '../../component/image/banner/family.jpg'; // Adjust the path as necessary
import DNA from '../../component/image/banner/dna.jpg'; // Adjust the path as necessary
import Doctor from '../../component/image/banner/doctor.jpg'; // Adjust the path as necessary
function Home() {
  return (
    <div className="app">
      {/* Header Section */}
      <header>
        <div className="logo">DNAeasy</div>
        <div className="nav-container">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/service">Service</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/yourappoinment">Appointment</Link></li>
              <li><Link to="/historyBooking">Booking History</Link></li>
            </ul>
          </nav>
        </div>
        <div className="auth-buttons">
          <Link to="/user/login" className="LR-btn">Login</Link>
          <Link to="/user/register" className="LR-btn">Register</Link>
        </div>
      </header>
            <section className="hero-image">
              <img src={Image} alt="Family DNA Banner" />
            </section>

      {/* Main Content Section */}
 <section className="main-content">
        <div className="main-content-left">
          <h2>What is genetic testing and decoding?</h2>
          <p>Genetic analysis is the use of laboratory methods to determine the genetic information of an individual. This information is contained in the DNA (deoxyribonucleic acid) molecule, which is the basic unit of heredity. Genetic analysis can be used to determine a person's intellectual potential, physical potential, nutrition, behavioral tendencies, and health risks.</p>
        </div>
        <div className="main-content-right">
          <img src={DNA} alt="DNA Testing Process" />
        </div>
      </section>
      <section className="main-content2">
        <div className="main-content2-left">
          <img src={Doctor} alt="DNA Testing Process" />
        </div>
        <div className="main-content2-right">
          <h2>Introduction to the system</h2>
          <p>Our DNA testing system empowers individuals to unlock the secrets of their genetic code with precision and ease. By providing accurate, accessible, and confidential DNA analysis, we aim to help you make informed decisions about your health, ancestry, and wellness.
             Our mission is to democratize genetic insights, fostering a deeper understanding of yourself and your unique heritage.</p>
        </div>
      </section>
      {/* Blog Section */}
      <section className="blog-section">
        <h2>Blog DNA Tests VS Home DNA Tests Guide</h2>
        <div className="blog-columns">
          <div className="blog-column">
            <div className="blog-image" style={{ backgroundImage: "url('https://images.pexels.com/photos/7088526/pexels-photo-7088526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}></div>
            <h3>Home DNA Tests: A Complete Guide</h3>
            <p>Home DNA tests are easy to use and confidential. Learn more about how they work and their benefits.</p>
            <Link to="/blog/guide">Read more</Link>
          </div>
          <div className="blog-column">
            <div className="blog-image" style={{ backgroundImage: "url('https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}></div>
            <h3>Home DNA Tests</h3>
            <p>Discover the accuracy of home DNA tests and why using an accredited lab is important.</p>
            <Link to="/blog/accuracy">Read more</Link>
          </div>
          <div className="blog-column">
            <div className="blog-image" style={{ backgroundImage: "url(https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=600)" }}></div>
            <h3>DNA for inbreeding testing</h3>
            <p>Information about DNA tests for consanguinity in French.</p>
            <Link to="/blog/consanguinity">Read more</Link>
          </div>
        </div>
      </section>
    {/* Service Section */}

      <section className="service-section">
        <h2>Our Services</h2>
        <div className="service-columns">
          <div className="service-column">
            <div className="service-image" style={{ backgroundImage: "url('https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=600')" }}></div>
            <h3>DNA Paternity Test</h3>
            <p>Accurate and confidential paternity testing services.</p>
            <Link to="/service/paternity">Learn More</Link>
          </div>
          <div className="service-column">
            <div className="service-image" style={{ backgroundImage: "url('https://images.pexels.com/photos/7088526/pexels-photo-7088526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}></div>
            <h3>DNA Ancestry Test</h3>
            <p>Discover your ancestry and family history with our DNA ancestry tests.</p>
            <Link to="/service/ancestry">Learn More</Link>
          </div>
          <div className="service-column">
            <div className="service-image" style={{ backgroundImage: "url('https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=600')" }}></div>
            <h3>DNA Relationship Test</h3>
            <p>Explore your genetic relationships with our DNA relationship tests.</p>
            <Link to="/service/relationship">Learn More</Link>
          </div>
        </div>  
      </section>
        

      {/* Footer Section */}
      <footer>
        <div className="footer-left">
          <h4>Test</h4>
          <ul>
            <li><Link to="/tests">Home Tests</Link></li>
            <li><Link to="/legal">Legal Tests</Link></li>
            <li><Link to="/relationship">Relationship Tests</Link></li>
          </ul>
        </div>
        <div className="footer-middle">
          <h4>Legal Paternity Tests</h4>
          <ul>
            <li><Link to="/legal-paternity">Learn More</Link></li>
            <li><Link to="/sitemap">Sitemap</Link></li>
          </ul>
        </div>
        <div className="footer-right">
          <h4>Contact Us</h4>
          <p>Contact us: $ 1-800-xxx-xxx</p>
        </div>
      </footer>
      <div className="copyright">
        <p>© 2025 DNAeasy Genetics Technology Company Limited</p>
      </div>
    </div>
  );
}

export default Home;