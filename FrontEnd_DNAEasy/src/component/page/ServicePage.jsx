import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Service.css';

const Service = () => {
  const navigate = useNavigate();

  const services = [
    { id: 'paternity', title: 'Paternity DNA Test', price: '1,250,000VND/mẫu', img: 'https://image.shutterstock.com/image-photo/smile-family-portrait-on-shoulder-260nw-2476215249.jpg' },
    { id: 'mother-child', title: 'Mother-Child DNA Testing', price: '1,250,000VND/mẫu', img: 'https://image.shutterstock.com/image-photo/family-parenthood-people-concept-happy-260nw-2341637857.jpg' },
    { id: 'paternal', title: 'Paternal DNA Testing', price: '1,250,000VND/mẫu', img: 'https://cdn.stocksnap.io/img-thumbs/280h/kids-father_NFZION4R4G.jpg' },
    { id: 'maternal-lineage', title: 'Maternal Lineage DNA Testing', price: '1,250,000VND/mẫu', img: 'https://cdn.stocksnap.io/img-thumbs/280h/mother-son_5WGHFLZULM.jpg' },
    { id: 'birth', title: 'Birth DNA Test', price: '1,250,000VND/mẫu', img: 'https://image.shutterstock.com/image-photo/sleeping-baby-boy-12-months-260nw-2556901361.jpg' },
    { id: 'divorce', title: 'DNA Test Divorce', price: '1,250,000VND/mẫu', img: 'https://image.shutterstock.com/image-photo/smiling-mid-adult-couple-hugging-260nw-2006404289.jpg' },
    { id: 'inheritance', title: 'DNA Testing For Inheritance Division', price: '1,250,000VND/mẫu', img: 'https://media.istockphoto.com/id/909908830/photo/microscope-with-lab-glassware.webp?b=1&s=612x612&w=0&k=20&c=fctb7l-gWTRuq_m9MlabFebXzgqqD97pleC2mrCq914=' },
    { id: 'remains', title: 'DNA Testing Of Remains', price: '1,250,000VND/mẫu', img: 'https://media.istockphoto.com/id/1387090964/photo/doctor-working-with-microplate-for-elisa-analysis.webp?b=1&s=612x612&w=0&k=20&c=Gznu-PnZeoaoOn1dntZ2lukNjLnUVaKGgrbA45HhImo=' },
  ];

  const handleBookingClick = (serviceId) => {
    navigate(`/booking/${serviceId}`);
  };

  return (
    <div className="service-page">
      <header>
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

      <section className="banner">
        <h1>DNA Testing Services Update To Meet Your Needs</h1>
      </section>

      <section className="filter-section">
        <button className="filter-btn active">civil</button>
        <button className="filter-btn">legal</button>
        <div className="search-bar">
          <input type="text" placeholder="Search services" />
          <button className="search-btn">Search</button>
        </div>
      </section>

      <section className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <img src={service.img} alt={service.title} className="service-img" />
            <h3>{service.title}</h3>
            <p className="price">{service.price}</p>
            <button
              className="booking-btn"
              onClick={() => handleBookingClick(service.id)}
            >
              Booking
            </button>
          </div>
        ))}
      </section>

      <section className="pagination">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <span>...</span>
        <button>5</button>
      </section>

      <footer className="footer">
        <div className="footer-left">
          <div className="logo">DNAeasy</div>
          <p>DNAeasy Genetic Technology Company Limited</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Home</h4>
            <Link to="/tests">DNA Tests</Link>
            <Link to="/">You Can Do At Home</Link>
          </div>
          <div>
            <h4>Legal Tests</h4>
            <Link to="/legal-paternity">Legal Paternity Tests</Link>
            <Link to="/">Immigration Tests</Link>
            <Link to="/">Locations</Link>
          </div>
          <div>
            <h4>Popular Links</h4>
            <Link to="/">DNA Test</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/">Contact</Link>
          </div>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Phone: +84 123 456 789</p>
          <p>Mon-Fri: 8am-4:30pm</p>
          <p>83</p>
        </div>
      </footer>
    </div>
  );
};

export default Service;