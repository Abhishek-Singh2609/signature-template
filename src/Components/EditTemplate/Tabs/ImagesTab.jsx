import React from 'react';
import { FaTimes } from "react-icons/fa";
import './ImagesTab.css';

const ImagesTab = ({ formData, imageInputRef, logoInputRef, handleImageUpload, removeImage, removeLogo }) => {
  return (
    <div className="images-tab-form">
      <div className="images-tab-section">
        <label className="images-tab-label">Profile Image</label>
        <div className="images-tab-upload-container">
          {formData.profileImage ? (
            <div className="images-tab-preview-container">
              <img src={formData.profileImage || "/placeholder.svg"} alt="Profile" className="images-tab-preview" />
              <button className="images-tab-remove-btn" onClick={() => removeImage("profileImage")}>
                <FaTimes size={12} />
              </button>
            </div>
          ) : (
            <div className="images-tab-upload-placeholder" onClick={() => imageInputRef.current.click()}>
              <span className="images-tab-upload-icon">📷</span>
              <span>Upload</span>
            </div>
          )}
          <input
            type="file"
            ref={imageInputRef}
            onChange={(e) => handleImageUpload(e, "profileImage")}
            accept="image/*"
            className="images-tab-hidden-input"
          />
        </div>
        <p className="images-tab-tip">Recommended: Image at least should be 100x100px</p>
      </div>

      <div className="images-tab-section">
        <label className="images-tab-label">Company Logo</label>
        <div className="images-tab-upload-container">
          {formData.logo ? (
            <div className="images-tab-preview-container">
              <img src={formData.logo || "/placeholder.svg"} alt="Logo" className="images-tab-preview" />
              <button className="images-tab-remove-btn" onClick={() => removeLogo()}>
                <FaTimes size={12} />
              </button>
            </div>
          ) : (
            <div className="images-tab-upload-placeholder" onClick={() => logoInputRef.current.click()}>
              <span className="images-tab-upload-icon">📷</span>
              <span>Upload</span>
            </div>
          )}
          <input
            type="file"
            ref={logoInputRef}
            onChange={(e) => handleImageUpload(e, "logo")}
            accept="image/*"
            className="images-tab-hidden-input"
          />
        </div>
        <p className="images-tab-tip">Recommended: Logo should be at least 100x100px</p>
      </div>
    </div>
  );
};

export default ImagesTab; 