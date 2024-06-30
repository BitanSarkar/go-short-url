// src/components/Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="contact-info">
        <FontAwesomeIcon icon={faEnvelope} /> 
        <a href="mailto:bitansarkar12345@gmail.com">bitansarkar12345@gmail.com</a>
      </div>
      <div className="social-links">
        <div>
          <FontAwesomeIcon icon={faGithub} />
          <a href="https://github.com/BitanSarkar/go-short-url" target="_blank" rel="noopener noreferrer">
            GitHub Repository
          </a>
        </div>
        <div>
          <FontAwesomeIcon icon={faLinkedin} />
          <a href="https://www.linkedin.com/in/bitan-sarkar-338065162/" target="_blank" rel="noopener noreferrer">
            LinkedIn Profile
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
