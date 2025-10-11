import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.footerGrid}>
          {/* Company Info */}
          <div style={styles.companySection}>
            <h2 style={styles.logo}>DNAEASY</h2>
            <p style={styles.companyName}>
              DNAEASY Genetic Technology Company Limited
            </p>
            <p style={styles.companyDescription}>
              Leading provider of accurate, reliable DNA testing services.
            </p>
          </div>

          {/* Services */}
          <div style={styles.footerColumn}>
            <h3 style={styles.columnTitle}>Our Services</h3>
            <ul style={styles.columnList}>
              {['DNA Paternity Tests', 'Legal DNA Tests', 'Immigration Tests', 'Relationship Tests'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={styles.link}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#60a5fa';
                      e.target.style.paddingLeft = '8px';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#cbd5e1';
                      e.target.style.paddingLeft = '0';
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div style={styles.footerColumn}>
            <h3 style={styles.columnTitle}>Quick Links</h3>
            <ul style={styles.columnList}>
              {['About Us', 'Contact Us', 'FAQs', 'Blog'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={styles.link}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#60a5fa';
                      e.target.style.paddingLeft = '8px';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#cbd5e1';
                      e.target.style.paddingLeft = '0';
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div style={styles.footerColumn}>
            <h3 style={styles.columnTitle}>Contact</h3>
            <div style={styles.contactInfo}>
              <p style={styles.contactText}>NGO 335 Laird Rd.</p>
              <p style={styles.contactText}>North York, ON</p>
              <a
                href="tel:+18777087678"
                style={styles.phoneLink}
                onMouseEnter={(e) => e.target.style.color = '#34d399'}
                onMouseLeave={(e) => e.target.style.color = '#60a5fa'}
              >
                +1 877-708-7678
              </a>
              <p style={styles.contactText}>Mon-Fri: 8:30am - 4:30pm EST</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div style={styles.socialSection}>
          <p style={styles.socialTitle}>Follow Us</p>
          <div style={styles.socialButtons}>
            {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
              <a
                key={social}
                href="#"
                style={styles.socialButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#3b82f6';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div style={styles.footerBottom}>
        <div style={styles.footerBottomContent}>
          <p style={styles.copyright}>
            © 2025 DNAEASY. All rights reserved.
          </p>
          <div style={styles.footerLinks}>
            {['Privacy Policy', 'Terms & Conditions', 'Accessibility'].map((link, index) => (
              <React.Fragment key={link}>
                <a
                  href="#"
                  style={styles.footerLink}
                  onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  {link}
                </a>
                {index < 2 && <span style={styles.separator}>•</span>}
              </React.Fragment>
            ))}

          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    color: '#fff',
    
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 24px 40px',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '40px',
  },
  companySection: {
    gridColumn: 'span 1',
  },
  logo: {
    fontSize: '28px',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #60a5fa, #34d399)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    margin: '0 0 16px 0',
  },
  companyName: {
    color: '#cbd5e1',
    fontSize: '16px',
    margin: '0 0 12px 0',
    lineHeight: '1.5',
  },
  companyDescription: {
    color: '#94a3b8',
    fontSize: '14px',
    lineHeight: '1.6',
    margin: 0,
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  columnTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#f1f5f9',
    margin: '0 0 20px 0',
    paddingBottom: '8px',
    borderBottom: '2px solid #3b82f6',
  },
  columnList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    color: '#cbd5e1',
    textDecoration: 'none',
    display: 'block',
    padding: '6px 0',
    transition: 'all 0.2s ease',
    fontSize: '14px',
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  contactText: {
    color: '#cbd5e1',
    margin: 0,
    fontSize: '14px',
    lineHeight: '1.5',
  },
  phoneLink: {
    color: '#60a5fa',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.2s ease',
  },
  socialSection: {
    textAlign: 'center',
    paddingTop: '30px',
    borderTop: '1px solid #475569',
  },
  socialTitle: {
    color: '#cbd5e1',
    margin: '0 0 20px 0',
    fontSize: '16px',
  },
  socialButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  socialButton: {
    padding: '10px 20px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    color: '#60a5fa',
    textDecoration: 'none',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(59, 130, 246, 0.2)',
  },
  footerBottom: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderTop: '1px solid #475569',
  },
  footerBottomContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  copyright: {
    color: '#94a3b8',
    fontSize: '14px',
    margin: 0,
  },
  footerLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  footerLink: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s ease',
  },
  separator: {
    color: '#64748b',
    fontSize: '14px',
  },

  // Media queries simulation
  '@media (max-width: 768px)': {
    footerBottomContent: {
      flexDirection: 'column',
      textAlign: 'center',
    },
    socialButtons: {
      justifyContent: 'center',
    },
  },
};

export default Footer;