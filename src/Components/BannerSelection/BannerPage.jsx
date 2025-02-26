import React, { useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react";
import "./BannerPage.css";

function BannerSelectionPage({ onBack, onComplete, selectedSignature }) {
  const [addBanner, setAddBanner] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [hoveredBanner, setHoveredBanner] = useState(null);

  // Sample banner data - replace with your actual banners
  const banners = [
    {
      id: 1,
      name: "Corporate Blue",
      previewUrl: "/api/placeholder/600/80",
      description: "Professional corporate banner with blue gradient"
    },
    {
      id: 2,
      name: "Holiday Special",
      previewUrl: "/api/placeholder/600/80",
      description: "Festive holiday-themed banner"
    },
    {
      id: 3,
      name: "Summer Promotion",
      previewUrl: "/api/placeholder/600/80",
      description: "Bright summer promotion banner"
    },
    {
      id: 4,
      name: "Product Launch",
      previewUrl: "/api/placeholder/600/80",
      description: "New product announcement banner"
    },
    {
      id: 5,
      name: "Minimalist",
      previewUrl: "/api/placeholder/600/80",
      description: "Clean, simple design with company colors"
    },
    {
      id: 6,
      name: "Event Invitation",
      previewUrl: "/api/placeholder/600/80",
      description: "Banner for upcoming events and webinars"
    }
  ];

  // Handle the initial yes/no choice
  const handleBannerChoice = (choice) => {
    setAddBanner(choice);
  };

  // Handle banner selection
  const handleSelectBanner = (bannerId) => {
    setSelectedBanner(bannerId);
  };

  // Handle completion
//   const handleComplete = () => {
//     onComplete({
//       signature: selectedSignature,
//       banner: addBanner ? selectedBanner : null
//     });
//   };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center mb-4">
        <button 
          className="btn btn-outline-secondary me-3" 
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          <span className="ms-1">Back to Signatures</span>
        </button>
        <h2 className="mb-0">Customize Your Email Signature</h2>
      </div>

      {/* Signature Preview */}
      {/* <div className="card mb-4 p-3 border-primary">
        <h4 className="card-header bg-white">Your Selected Signature</h4>
        <div className="card-body"> */}
          {/* This would show the actual selected signature */}
          {/* <div className="signature-preview p-3 border">
            {selectedSignature ? (
              <p>Your selected signature would display here</p>
            ) : (
              <p>No signature selected yet</p>
            )}
          </div>
        </div>
      </div> */}

      {addBanner === null ? (
        /* Initial Banner Question */
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Would you like to add a banner to your email signature?</h4>
          </div>
          <div className="card-body">
            <p>Banners can help promote events, products, or reinforce your brand message.</p>
            
            <div className="d-flex justify-content-center gap-3 mt-4">
              {/* <button 
                className="btn btn-lg btn-outline-success px-5"
                onClick={() => handleBannerChoice(true)}
              >
                <Check size={20} className="me-2" />
                Yes, add a banner
              </button> */}
              <button 
                className="btn btn-lg  px-5"
                // onClick={() => handleBannerChoice(false)}
              >
                <X size={20} className="me-2" />
                No, continue without banner
              </button>
            </div>
          </div>
        </div>
      ) : addBanner ? (
        /* Banner Selection */
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Select a Banner</h4>
          </div>
          <div className="card-body">
            <p className="mb-4">Choose a banner to add to your email signature:</p>
            
            <div className="row g-4">
              {banners.map(banner => (
                <div key={banner.id} className="col-md-6">
                  <div 
                    className={`card position-relative ${selectedBanner === banner.id ? 'border-success' : ''}`}
                    style={{
                      border: hoveredBanner === banner.id ? "2px solid #0d6efd" : 
                             selectedBanner === banner.id ? "2px solid #28a745" : "",
                      cursor: "pointer",
                      transition: "border 0.2s ease"
                    }}
                    onClick={() => handleSelectBanner(banner.id)}
                    onMouseEnter={() => setHoveredBanner(banner.id)}
                    onMouseLeave={() => setHoveredBanner(null)}
                  >
                    <img 
                      src={banner.previewUrl} 
                      className="img-fluid"
                      alt={banner.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{banner.name}</h5>
                      <p className="card-text">{banner.description}</p>
                    </div>
                    {selectedBanner === banner.id && (
                      <div className="position-absolute" style={{ top: "10px", right: "10px" }}>
                        <span className="badge bg-success rounded-circle p-2">
                          <Check size={16} />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* Action Buttons */}
      <div className="d-flex justify-content-end mt-4">
        {addBanner !== null && (
          <button 
            className="btn btn-primary btn-lg"
            onClick={handleComplete}
            disabled={addBanner === true && selectedBanner === null}
          >
            {addBanner === false ? "Finish" : "Continue with Selected Banner"}
          </button>
        )}
      </div>
    </div>
  );
}

export default BannerSelectionPage;