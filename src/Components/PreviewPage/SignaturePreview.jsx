import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import "./SignaturePreview.css";

const SignaturePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signatureHTML, formData, selectedDesign, activeTab } =
    location.state || {};

  // Sanitize HTML to prevent XSS
  const cleanHTML = DOMPurify.sanitize(signatureHTML || "");

  // Handle Back Navigation - preserve the selected design and all form data
  const handleBack = () => {
    // Navigate back to the editor with the same state
    navigate("/edittemplate", {
      state: {
        preserveDesign: true,
        selectedDesign,
        preserveFormData: true,
        formData,
        activeTab,
      },
      replace: true,
    });
  };

  // Copy Signature to Clipboard
  const copyToClipboard = async () => {
    try {
      if (signatureHTML) {
        await navigator.clipboard.writeText(signatureHTML);

        // Show success message
        const copyMessage = document.getElementById("copy-message");
        copyMessage.style.opacity = "1";
        setTimeout(() => {
          copyMessage.style.opacity = "0";
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // Download Signature as an HTML File
  const downloadHTML = () => {
    if (!signatureHTML) return;

    const blob = new Blob([signatureHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "email-signature.html";
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <div className="preview-page">
      <div className="preview-header">
        <button className="back-button" onClick={handleBack}>
          <i className="bi bi-arrow-left"></i> Back to Editor
        </button>
        <h1>Your Email Signature</h1>
        <p className="preview-description">
          Here's how your signature will appear in emails. You can copy it to
          clipboard or download it as HTML.
        </p>
      </div>

      <div className="preview-container">
        <div className="device-mockup">
          <div className="device-screen">
            <div className="email-compose-mockup">
              <div className="email-body-mockup">
                <div
                  className="signature-preview-content"
                  dangerouslySetInnerHTML={{ __html: cleanHTML }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="preview-actions">
          <div className="action-card">
            <div className="action-icon">📋</div>
            <h3>Copy to Clipboard</h3>
            <p>Copy your signature to paste directly into your email client.</p>
            <button className="action-button primary" onClick={copyToClipboard}>
              Copy Signature
            </button>
            <span id="copy-message" className="copy-message">
              Copied to clipboard!
            </span>
          </div>

          <div className="action-card">
            <div className="action-icon">⬇️</div>
            <h3>Download HTML</h3>
            <p>Download the HTML file to import into your email client.</p>
            <button
              className="action-button secondary"
              onClick={downloadHTML}
              disabled={!signatureHTML}
            >
              Download HTML
            </button>
          </div>

          <div className="action-card">
            <div className="action-icon">✏️</div>
            <h3>Edit Signature</h3>
            <p>Go back to make changes to your signature.</p>
            <button className="action-button tertiary" onClick={handleBack}>
              Back to Editor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignaturePreview;
