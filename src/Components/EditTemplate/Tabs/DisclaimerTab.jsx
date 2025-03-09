import React from 'react';
import RichTextEditor from '../RichTextEditor';
import './DisclaimerTab.css';

const DisclaimerTab = ({ formData, handleInputChange }) => {
  return (
    <div className="disclaimer-tab-form">
      <div className="disclaimer-tab-section">
        <label className="disclaimer-tab-label" htmlFor="disclaimer">Disclaimer</label>
        <RichTextEditor
          value={formData.disclaimer}
          onChange={handleInputChange}
          placeholder="Enter your disclaimer text here..."
        />
      </div>
    </div>
  );
};

export default DisclaimerTab; 