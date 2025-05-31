import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.footerCenter}>
          <div style={styles.footerLogo}>DNAEASY</div>
          <div style={styles.footerCompany}>DNAEASY Genetic Technology Company Limited</div>
        </div>
        <div style={styles.footerColumns}>
          <div style={styles.footerColumn}>
            <strong>Home Tests</strong>
            <p>DNA Paternity Tests</p>
            <p>Maternity Tests</p>
            <p>Relationship Tests</p>
          </div>
          <div style={styles.footerColumn}>
            <strong>Legal Tests</strong>
            <p>Legal DNA Tests</p>
            <p>Immigration Tests</p>
            <p>Legal Paternity Tests</p>
            <p>FAQs</p>
            <p>Locations</p>
            <p>Blog</p>
            <p>SCC Scope</p>
          </div>
          <div style={styles.footerColumn}>
            <strong>Popular Links</strong>
            <p>Contact Us</p>
            <p>About Us</p>
          </div>
          <div style={styles.footerColumn}>
            <strong>Contact</strong>
            <p>NGO 335 Laird Rd.</p>
            <p>North York, ON</p>
            <p>☎ +1 877-708-7678</p>
            <p>Hours: Friday</p>
            <p>8:30am - 4:30pm EST</p>
          </div>
        </div>
      </div>
      <div style={styles.footerBottom}>
        <p style={styles.footerBottomText}>
          © 2025 Healthy Partners | About Accessibility | Good health | Nondiscrimination statement | Notice of privacy practices | Privacy policy | Surcharge billing | Terms & conditions
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1a2a44',
    color: '#fff',
    padding: '20px 0',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px',
  },
  footerCenter: {
    textAlign: 'center',
    flex: '1',
  },
  footerLogo: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  footerCompany: {
    fontSize: '14px',
    color: '#ccc',
  },
  footerColumns: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: '3',
    gap: '20px',
  },
  footerColumn: {
    flex: '1',
  },
  footerBottom: {
    backgroundColor: '#444',
    padding: '10px 20px',
    textAlign: 'center',
    marginTop: '20px',
  },
  footerBottomText: {
    fontSize: '12px',
    color: '#bbb',
  },
};

export default Footer;