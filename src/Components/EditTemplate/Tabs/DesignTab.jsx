import React from 'react';
import './DesignTab.css';

const DesignTab = ({ designTemplates, selectedDesign, handleDesignSelect }) => {
  return (
    <div className="design-tab-container">
      <p className="design-tab-intro">Select a design template for your email signature:</p>
      <div className="design-tab-grid">
        {designTemplates.map((template) => (
          <div
            key={template.id}
            className={`design-tab-card ${selectedDesign === template.id ? "selected" : ""}`}
            onClick={() => handleDesignSelect(template.id)}
            style={{ borderColor: selectedDesign === template.id ? template.color : "#ddd" }}
          >
            <div
              className="design-tab-preview"
              style={{
                background: template.gradient || template.color,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {template.layout === "split" && (
                <div
                  className="design-tab-layout-element"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "30%",
                    height: "100%",
                    background: "rgba(0,0,0,0.2)",
                  }}
                ></div>
              )}
              {template.layout === "bordered" && (
                <div
                  className="design-tab-layout-element"
                  style={{
                    position: "absolute",
                    left: "5px",
                    top: "5px",
                    right: "5px",
                    bottom: "5px",
                    border: `2px solid rgba(255,255,255,0.7)`,
                    borderRadius: "2px",
                  }}
                ></div>
              )}
              {template.layout === "horizontal" && (
                <div
                  className="design-tab-layout-element"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "70%",
                    width: "100%",
                    height: "30%",
                    background: "rgba(0,0,0,0.2)",
                  }}
                ></div>
              )}
              {template.layout === "centered" && (
                <div
                  className="design-tab-layout-element"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "60%",
                    height: "60%",
                    border: "2px solid rgba(255,255,255,0.8)",
                    borderRadius: "50%",
                  }}
                ></div>
              )}
            </div>
            <p className="design-tab-name">{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignTab; 