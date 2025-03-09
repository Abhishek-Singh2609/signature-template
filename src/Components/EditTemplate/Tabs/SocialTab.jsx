import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";
import './SocialTab.css';

const SocialTab = ({ formData, handleInputChange }) => {
  return (
    <div className="social-tab-form">
      <div className="social-form-group">
        <label className="social-label" htmlFor="linkedin">
          <FaLinkedin size={25} className="social-icon-linkedin" />
        </label>
        <input
          type="url"
          id="linkedin"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleInputChange}
          placeholder="https://linkedin.com/in/johndoe"
          className="social-input"
        />
      </div>

      <div className="social-form-group">
        <label className="social-label" htmlFor="twitter">
          <span className="social-icon-twitter">𝕏</span>
        </label>
        <input
          type="url"
          id="twitter"
          name="twitter"
          value={formData.twitter}
          onChange={handleInputChange}
          placeholder="https://twitter.com/johndoe"
          className="social-input"
        />
      </div>

      <div className="social-form-group">
        <label className="social-label" htmlFor="instagram">
          <FaInstagram size={25} className="social-icon-instagram" />
        </label>
        <input
          type="url"
          id="instagram"
          name="instagram"
          value={formData.instagram}
          onChange={handleInputChange}
          placeholder="https://instagram.com/johndoe"
          className="social-input"
        />
      </div>

      <div className="social-form-group">
        <label className="social-label" htmlFor="facebook">
          <FaFacebook size={25} className="social-icon-facebook" />
        </label>
        <input
          type="url"
          id="facebook"
          name="facebook"
          value={formData.facebook}
          onChange={handleInputChange}
          placeholder="https://facebook.com/johndoe"
          className="social-input"
        />
      </div>
      
      <div className="social-form-group">
        <label className="social-label" htmlFor="youtube">
          <FaYoutube size={25} className="social-icon-youtube" />
        </label>
        <input
          type="url"
          id="youtube"
          name="youtube"
          value={formData.youtube}
          onChange={handleInputChange}
          placeholder="https://youtube.com/johndoe"
          className="social-input"
        />
      </div>
      
      <div className="social-form-group">
        <label className="social-label" htmlFor="portfolio">
          <span className="social-icon-portfolio">🔗</span>
        </label>
        <input
          type="url"
          id="portfolio"
          name="portfolio"
          value={formData.portfolio}
          onChange={handleInputChange}
          placeholder="https://portfolio.com/johndoe"
          className="social-input"
        />
      </div>
    </div>
  );
};

export default SocialTab; 