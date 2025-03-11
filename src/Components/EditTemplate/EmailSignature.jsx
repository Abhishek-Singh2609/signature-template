import { useState, useRef, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTwitter, FaTimes } from "react-icons/fa"
import "./EmailSignature.css"

// Import tab components
import PersonalInfoTab from "./Tabs/PersonalInfoTab"
import SocialTab, { renderSocialIcons } from "./Tabs/SocialTab"
import DesignTab, { designTemplates, getDesignStyle } from "./Tabs/DesignTab"
import ImagesTab from "./Tabs/ImagesTab"
import BannerTab from "./Tabs/BannerTab"
import DisclaimerTab from "./Tabs/DisclaimerTab"

const EmailSignatureCreator = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Check if we're coming back from preview page with preserved state
  const { preserveDesign, selectedDesign: savedDesign, preserveFormData, formData: savedFormData, activeTab: savedActiveTab } = location.state || {}
  
  // Load data from localStorage if available
  const loadFromLocalStorage = () => {
    try {
      const savedState = localStorage.getItem('emailSignatureState')
      if (savedState) {
        return JSON.parse(savedState)
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error)
    }
    return null
  }
  
  // Function to ensure 5 campaigns exist
  const ensureFiveCampaigns = (formDataToUpdate) => {
    if (!formDataToUpdate.campaigns || formDataToUpdate.campaigns.length < 5) {
      const updatedCampaigns = [...(formDataToUpdate.campaigns || [])];
      
      // Add campaigns until we have 5
      while (updatedCampaigns.length < 5) {
        const newId = updatedCampaigns.length + 1;
        updatedCampaigns.push({
          id: newId,
          name: `Campaign ${newId}`,
          image: null,
          startDate: "",
          expiryDate: "",
          active: false,
          links: [
            { url: "", text: "Link 1", area: { x: 0, y: 0, width: 33, height: 100 } },
            { url: "", text: "Link 2", area: { x: 33, y: 0, width: 34, height: 100 } },
            { url: "", text: "Link 3", area: { x: 67, y: 0, width: 33, height: 100 } }
          ]
        });
      }
      
      return {
        ...formDataToUpdate,
        campaigns: updatedCampaigns
      };
    }
    
    return formDataToUpdate;
  };
  
  // Get initial state from localStorage or use default values
  const getInitialState = () => {
    // First check if we're coming back from preview page
    if (preserveFormData && savedFormData) {
      return {
        formData: ensureFiveCampaigns(savedFormData),
        activeTab: savedActiveTab || "Personal Info",
        selectedDesign: savedDesign || "default"
      }
    }
    
    // Then check localStorage
    const localStorageState = loadFromLocalStorage()
    if (localStorageState) {
      return {
        formData: ensureFiveCampaigns(localStorageState.formData),
        activeTab: localStorageState.activeTab || "Personal Info",
        selectedDesign: localStorageState.selectedDesign || "default"
      }
    }
    
    // Default values if nothing is saved
    return {
      formData: ensureFiveCampaigns({
    name: "John Doe",
    jobTitle: "Product Designer",
    company: "Agilesignature.com",
    email: "john.doe@agile.com",
    phone: "+1 (555) 123-4567",
    mobilePhone: "+2 (595) 123-5876",
    location: "San Francisco, CA",
    website: "www.agilesignature.com",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
    youtube: "",
        portfolio: "",
    profileImage: null,
    logo: null,
    banner: null,
    disclaimer: "",
        campaigns: [
          { id: 1, name: "Campaign 1", image: null, startDate: "", expiryDate: "", active: false, links: [
            { url: "", text: "Link 1", area: { x: 0, y: 0, width: 33, height: 100 } },
            { url: "", text: "Link 2", area: { x: 33, y: 0, width: 34, height: 100 } },
            { url: "", text: "Link 3", area: { x: 67, y: 0, width: 33, height: 100 } }
          ] },
          { id: 2, name: "Campaign 2", image: null, startDate: "", expiryDate: "", active: false, links: [
            { url: "", text: "Link 1", area: { x: 0, y: 0, width: 33, height: 100 } },
            { url: "", text: "Link 2", area: { x: 33, y: 0, width: 34, height: 100 } },
            { url: "", text: "Link 3", area: { x: 67, y: 0, width: 33, height: 100 } }
          ] },
          { id: 3, name: "Campaign 3", image: null, startDate: "", expiryDate: "", active: false, links: [
            { url: "", text: "Link 1", area: { x: 0, y: 0, width: 33, height: 100 } },
            { url: "", text: "Link 2", area: { x: 33, y: 0, width: 34, height: 100 } },
            { url: "", text: "Link 3", area: { x: 67, y: 0, width: 33, height: 100 } }
          ] },
          { id: 4, name: "Campaign 4", image: null, startDate: "", expiryDate: "", active: false, links: [
            { url: "", text: "Link 1", area: { x: 0, y: 0, width: 33, height: 100 } },
            { url: "", text: "Link 2", area: { x: 33, y: 0, width: 34, height: 100 } },
            { url: "", text: "Link 3", area: { x: 67, y: 0, width: 33, height: 100 } }
          ] },
        ]
      }),
      activeTab: "Personal Info",
      selectedDesign: "default"
    }
  }
  
  // Get initial state
  const initialState = getInitialState()
  
  const [activeTab, setActiveTab] = useState(initialState.activeTab)
  const [selectedDesign, setSelectedDesign] = useState(initialState.selectedDesign)
  const [formData, setFormData] = useState(initialState.formData)

  // Ensure we have 5 campaigns when the component mounts
  useEffect(() => {
    // Check if we have 5 campaigns
    if (!formData.campaigns || formData.campaigns.length < 5) {
      const updatedFormData = ensureFiveCampaigns(formData);
      setFormData(updatedFormData);
      saveToLocalStorage(updatedFormData);
    }
  }, []);

  // Save state to localStorage
  const saveToLocalStorage = (newFormData, newActiveTab, newSelectedDesign) => {
    try {
      const formDataToSave = newFormData || formData;
      const updatedFormData = ensureFiveCampaigns(formDataToSave);
      
      const stateToSave = {
        formData: updatedFormData,
        activeTab: newActiveTab || activeTab,
        selectedDesign: newSelectedDesign || selectedDesign
      }
      localStorage.setItem('emailSignatureState', JSON.stringify(stateToSave))
      
      // If we're updating formData and it's different from the current state, update the state
      if (newFormData && newFormData !== formData) {
        setFormData(updatedFormData);
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const updatedFormData = { ...formData, [name]: value }
    setFormData(updatedFormData)
    saveToLocalStorage(updatedFormData)
  }

  // Function to generate HTML content of the signature
  const generateSignatureHTML = () => {
    // Create a temporary div to hold the signature
    const tempDiv = document.createElement("div")

    // Clone the signature preview
    const signatureNode = document.querySelector(".signature-preview").cloneNode(true)

    // Append to the temporary div
    tempDiv.appendChild(signatureNode)

    // Return the HTML content
    return tempDiv.innerHTML
  }

  // Function to copy signature to clipboard
  const copyToClipboard = () => {
    const html = generateSignatureHTML()

    // Use the Clipboard API to copy HTML content
    navigator.clipboard
      .writeText(html)
      .then(() => {
        alert("Signature copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
        alert("Failed to copy to clipboard. Please try again.")
      })
  }

  // Function to download HTML
  const downloadHTML = () => {
    const html = generateSignatureHTML()

    // Create a Blob with the HTML content
    const blob = new Blob([html], { type: "text/html" })

    // Create a download link
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "email-signature.html"

    // Trigger the download
    document.body.appendChild(a)
    a.click()

    // Clean up
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 100)
  }

  // Function to navigate to preview page
  const navigateToPreview = () => {
    const signatureHTML = generateSignatureHTML()
    navigate("/preview", { 
      state: { 
        signatureHTML,
        formData,
        selectedDesign,
        activeTab
      } 
    })
  }

  // Update the tab click handler to save active tab to localStorage
  const handleTabClick = (tab) => {
    setActiveTab(tab)
    saveToLocalStorage(null, tab)
  }

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Personal Info":
        return <PersonalInfoTab formData={formData} saveToLocalStorage={saveToLocalStorage} />
      case "Images":
        return <ImagesTab formData={formData} saveToLocalStorage={saveToLocalStorage} />
      case "Social":
        return <SocialTab formData={formData} saveToLocalStorage={saveToLocalStorage} />
      case "Design":
        return <DesignTab 
          selectedDesign={selectedDesign} 
          saveToLocalStorage={(newFormData, newActiveTab, newSelectedDesign) => {
            if (newSelectedDesign && newSelectedDesign !== selectedDesign) {
              setSelectedDesign(newSelectedDesign);
            }
            saveToLocalStorage(newFormData, newActiveTab, newSelectedDesign);
          }} 
        />
      case "Banner":
        return <BannerTab formData={formData} saveToLocalStorage={saveToLocalStorage} />
      case "Disclaimer":
        return <DisclaimerTab formData={formData} saveToLocalStorage={saveToLocalStorage} />
      default:
        return null
    }
  }

  const designStyle = getDesignStyle(selectedDesign)

  // Get active campaigns function - needed in EmailSignature.jsx
  const getActiveCampaigns = () => {
    return formData.campaigns.filter(campaign => 
      campaign.active && campaign.image && 
      !(campaign.startDate && new Date() < new Date(campaign.startDate)) && 
      !(campaign.expiryDate && new Date() > new Date(campaign.expiryDate))
    );
  }

  // Render the signature based on the selected design
  const renderSignature = () => {
    const design = designTemplates.find((d) => d.id === selectedDesign)

    // Split layout design
    if (design.layout === "split") {
      return (
        <div style={designStyle.containerStyle} className="signature-preview split-layout">
          <div style={designStyle.sidebarStyle} className="signature-sidebar">
            {formData.profileImage && (
              <div className="profile-image-container centered">
                <img src={formData.profileImage || "/placeholder.svg"} alt={formData.name} className="profile-image" />
              </div>
            )}
            {formData.logo && (
              <div className="logo-container" style={{ marginTop: "10px" }}>
                <img
                  src={formData.logo || "/placeholder.svg"}
                  alt="Company Logo"
                  style={{
                    maxWidth: "100px",
                    maxHeight: "50px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
            <h3 className="preview-name centered" style={{ color: "white" }}>
              {formData.name}
            </h3>
            <p className="preview-job centered" style={{ color: "rgba(255,255,255,0.8)" }}>
              {formData.jobTitle}
            </p>
            <div className="sidebar-social-icons">{renderSocialIcons(formData)}</div>
            
          </div>
          <div style={designStyle.contentStyle} className="signature-content">
            <p className="preview-company">{formData.company}</p>
            <div className="contact-info">
              <p className="contact-item">
                <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                  📞
                </span>{" "}
                {formData.phone}
              </p>
              {formData.mobilePhone && (
                <p className="contact-item">
                  <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                    📱
                  </span>{" "}
                  {formData.mobilePhone}
                </p>
              )}
              <p className="contact-item">
                <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                  ✉️
                </span>{" "}
                {formData.email}
              </p>
              {formData.website && (
                <p className="contact-item">
                  <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                    🌐
                  </span>{" "}
                  {formData.website}
                </p>
              )}
              {formData.location && (
                <p className="contact-item">
                  <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                    📍
                  </span>{" "}
                  {formData.location}
                </p>
              )}
            </div>
            
            {(getActiveCampaigns().length > 0 || formData.banner) && (
              <div className="banner-container" style={{ display: "none" }}>
                {/* Banners are now shown outside the signature card */}
              </div>
            )}
          </div>
        </div>
      )
    }

    // Centered layout design
    if (design.layout === "centered") {
      return (
        <div
          className="signature-preview centered-layout"
          style={{
            backgroundColor: designStyle.backgroundColor,
            color: designStyle.textColor,
            border: designStyle.borderStyle,
            boxShadow: designStyle.boxShadow,
            textAlign: "center",
            padding: "24px",
          }}
        >
          {formData.profileImage && (
            <div className="profile-image-container centered">
              <img src={formData.profileImage || "/placeholder.svg"} alt={formData.name} className="profile-image" />
            </div>
          )}
          {formData.logo && (
            <div className="logo-container" style={{ marginTop: "10px" }}>
              <img
                src={formData.logo || "/placeholder.svg"}
                alt="Company Logo"
                style={{
                  maxWidth: "100px",
                  maxHeight: "50px",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
          <h3 className="preview-name" style={{ color: designStyle.nameColor }}>
            {formData.name}
          </h3>
          <p className="preview-job">
            {formData.jobTitle} at {formData.company}
          </p>
          <div className="preview-divider" style={designStyle.dividerStyle}></div>
          <div className="centered-contact">
            <p className="contact-item centered-item">
              <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                📞
              </span>{" "}
              {formData.phone}
            </p>
            {formData.mobilePhone && (
              <p className="contact-item centered-item">
                <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                  📱
                </span>{" "}
                {formData.mobilePhone}
              </p>
            )}
            <p className="contact-item centered-item">
              <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                ✉️
              </span>{" "}
              {formData.email}
            </p>
            {formData.website && (
              <p className="contact-item centered-item">
                <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                  🌐
                </span>{" "}
                {formData.website}
              </p>
            )}
            {formData.location && (
              <p className="contact-item centered-item">
                <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                  📍
                </span>{" "}
                {formData.location}
              </p>
            )}
          </div>
          <div className="centered-social">{renderSocialIcons(formData)}</div>
          
          {(getActiveCampaigns().length > 0 || formData.banner) && (
            <div className="banner-container" style={{ display: "none" }}>
              {/* Banners are now shown outside the signature card */}
            </div>
          )}
        </div>
      )
    }

    // Horizontal layout with footer
    if (design.layout === "horizontal") {
      return (
        <div
          className="signature-preview horizontal-layout"
          style={{
            backgroundColor: designStyle.backgroundColor,
            color: designStyle.textColor,
            border: designStyle.borderStyle,
            boxShadow: designStyle.boxShadow,
            padding: "0",
            overflow: "hidden",
          }}
        >
          <div className="horizontal-content" style={{ padding: "24px" }}>
            <div className="horizontal-header">
              {formData.profileImage ? (
                <div className="horizontal-with-image">
                  <div className="profile-image-container">
                    <img
                      src={formData.profileImage || "/placeholder.svg"}
                      alt={formData.name}
                      className="profile-image"
                    />
                  </div>
                  <div className="horizontal-title">
                    <h3 className="preview-name" style={{ color: designStyle.nameColor }}>
                      {formData.name}
                    </h3>
                    <p className="preview-job">
                      {formData.jobTitle} at {formData.company}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="preview-name" style={{ color: designStyle.nameColor }}>
                    {formData.name}
                  </h3>
                  <p className="preview-job">
                    {formData.jobTitle} at {formData.company}
                  </p>
                </div>
              )}
              {formData.logo && (
                <div className="logo-container" style={{ marginTop: "10px" }}>
                  <img
                    src={formData.logo || "/placeholder.svg"}
                    alt="Company Logo"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "50px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
            </div>
            <div className="preview-divider" style={{ backgroundColor: "#e6e6e6" }}></div>
            <div className="preview-contact">
              <div className="contact-left">
                <p className="contact-item">
                  <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                    📞
                  </span>{" "}
                  {formData.phone}
                </p>
                {formData.mobilePhone && (
                <p className="contact-item">
                  <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                      📱
                  </span>{" "}
                    {formData.mobilePhone}
                  </p>
                )}
                  <p className="contact-item">
                    <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                    ✉️
                    </span>{" "}
                  {formData.email}
                  </p>
              </div>
              <div className="contact-right">{renderSocialIcons(formData)}</div>
            </div>
            
            {(getActiveCampaigns().length > 0 || formData.banner) && (
              <div className="banner-container" style={{ display: "none" }}>
                {/* Banners are now shown outside the signature card */}
              </div>
            )}
          </div>
          <div style={designStyle.footerStyle} className="horizontal-footer">
            <div className="footer-social">{renderSocialIcons(formData)}</div>
          </div>
        </div>
      )
    }

    // Bordered layout
    if (design.layout === "bordered") {
      return (
        <div
          className="signature-preview bordered-layout"
          style={{
            backgroundColor: designStyle.backgroundColor,
            color: designStyle.textColor,
            border: designStyle.borderStyle,
            boxShadow: designStyle.boxShadow,
            padding: designStyle.innerPadding,
          }}
        >
          <div className="bordered-content">
            <div className="bordered-header">
              {formData.profileImage ? (
                <div className="horizontal-with-image">
                  <div className="profile-image-container bordered-image">
                    <img
                      src={formData.profileImage || "/placeholder.svg"}
                      alt={formData.name}
                      className="profile-image"
                      style={{ borderColor: designStyle.accentColor }}
                    />
                  </div>
                  <div className="horizontal-title">
                    <h3 className="preview-name" style={{ color: designStyle.nameColor }}>
                      {formData.name}
                    </h3>
                    <p className="preview-job">
                      {formData.jobTitle} at {formData.company}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="preview-name" style={{ color: designStyle.nameColor }}>
                    {formData.name}
                  </h3>
                  <p className="preview-job">
                    {formData.jobTitle} at {formData.company}
                  </p>
                </div>
              )}
              {formData.logo && (
                <div className="logo-container" style={{ marginTop: "10px" }}>
                  <img
                    src={formData.logo || "/placeholder.svg"}
                    alt="Company Logo"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "50px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
            </div>
            <div className="preview-divider" style={{ backgroundColor: designStyle.accentColor, height: "2px" }}></div>
            <div className="preview-contact">
              <div className="contact-left">
                <p className="contact-item">
                  <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                    📞
                  </span>{" "}
                  {formData.phone}
                </p>
                {formData.mobilePhone && (
                  <p className="contact-item">
                    <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                      📱
                    </span>{" "}
                    {formData.mobilePhone}
                  </p>
                )}
                <p className="contact-item">
                  <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                    ✉️
                  </span>{" "}
                  {formData.email}
                </p>
                {formData.website && (
                  <p className="contact-item">
                    <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                      🌐
                    </span>{" "}
                    {formData.website}
                  </p>
                )}
                {formData.location && (
                  <p className="contact-item">
                    <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                      📍
                    </span>{" "}
                    {formData.location}
                  </p>
                )}
              </div>
              <div className="contact-right">{renderSocialIcons(formData)}</div>
            </div>
            
            {(getActiveCampaigns().length > 0 || formData.banner) && (
              <div className="banner-container" style={{ display: "none" }}>
                {/* Banners are now shown outside the signature card */}
              </div>
            )}
          </div>
      </div>
      )
    }

    // Default/Standard layout
    return (
      <div
        className="signature-preview standard-layout"
        style={{
          backgroundColor: designStyle.backgroundColor,
          color: designStyle.textColor,
          // border: designStyle.borderStyle,
          boxShadow: designStyle.boxShadow,
          background: designStyle.gradient || designStyle.backgroundColor,
        }}
      >
        <div className="standard-header">
          {formData.profileImage ? (
            <div className="standard-with-image">
              <div className="profile-image-container">
                <img src={formData.profileImage || "/placeholder.svg"} alt={formData.name} className="profile-image" />
              </div>
              <div>
                <h3 className="preview-name" style={{ color: designStyle.nameColor }}>
                  {formData.name}
                </h3>
                <p className="preview-job">
                  {formData.jobTitle} at {formData.company}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="preview-name" style={{ color: designStyle.nameColor }}>
                {formData.name}
              </h3>
              <p className="preview-job">
                {formData.jobTitle} at {formData.company}
              </p>
            </div>
          )}
          {formData.logo && (
            <div className="logo-container" style={{ marginTop: "10px" }}>
              <img
                src={formData.logo || "/placeholder.svg"}
                alt="Company Logo"
                style={{
                  maxWidth: "100px",
                  maxHeight: "50px",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
        </div>
        <div
          className="preview-divider"
          style={{ backgroundColor: selectedDesign === "minimal" ? designStyle.accentColor : "#e6e6e6" }}
        ></div>
        <div className="preview-contact">
          <div className="contact-left">
            <p className="contact-item">
              <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                📞
              </span>{" "}
              {formData.phone}
            </p>
            {formData.mobilePhone && (
              <p className="contact-item">
                <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                  📱
                </span>{" "}
                {formData.mobilePhone}
              </p>
            )}
            <p className="contact-item">
              <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                ✉️
              </span>{" "}
              {formData.email}
            </p>
            {formData.website && (
              <p className="contact-item">
                <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                  🌐
                </span>{" "}
                {formData.website}
              </p>
            )}
            {formData.location && (
              <p className="contact-item">
                <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                  📍
                </span>{" "}
                {formData.location}
              </p>
            )}
          </div>
          <div className="contact-right">{renderSocialIcons(formData)}</div>
        </div>
        {(getActiveCampaigns().length > 0 || formData.banner) && (
          <div className="banner-container" style={{ display: "none" }}>
            {/* Banners are now shown outside the signature card */}
          </div>
        )}
      </div>
    )
  }

  return (
  <div>
    <h2 style={{textAlign:"center", marginTop:"0 auto", color:"black", fontWeight:"700", fontSize:"2.5rem"}}>Customize Your Email Signature</h2>
    <div className="editor-container">
      <div className="content">
        <div className="form-section">
          <div className="tabs">
            {["Personal Info", "Images", "Social", "Design", "Banner", "Disclaimer"].map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {renderTabContent()}
        </div>

        <div className="preview-section">
          <h2 className="preview-title">Preview</h2>
          <p className="preview-subtitle">Here's how your signature will appear in emails</p>

          {renderSignature()}

          {/* Display banners outside of signature-preview card without text labels */}
          {(getActiveCampaigns().length > 0 || formData.banner) && (
            <div className="banners-outside-preview" style={{ marginTop: "8px" }}>
              <div>
                {getActiveCampaigns().map((campaign) => (
                  <div key={campaign.id} style={{ position: "relative", marginBottom: "10px" }}>
                    <img
                      src={campaign.image}
                      alt={campaign.name}
                      style={{ width: "75%", height: "auto", maxHeight: "100px", borderRadius: "4px" }}
                    />
                    {/* Clickable areas */}
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                      {campaign.links.map((link, index) => (
                        link.url && (
                          <a 
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={link.text}
                            style={{
                              position: "absolute",
                              left: `${link.area.x}%`,
                              top: `${link.area.y}%`,
                              width: `${link.area.width}%`,
                              height: `${link.area.height}%`,
                              display: "block",
                              zIndex: 2,
                              cursor: "pointer"
                            }}
                          />
                        )
                      ))}
                    </div>
                  </div>
                ))}
                {formData.banner && (
                  <div>
                    <img
                      src={formData.banner}
                      alt="Banner"
                      style={{ width: "100%", height: "auto", maxHeight: "100px", objectFit: "cover", borderRadius: "4px" }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {formData.disclaimer && (
            <div
              className="disclaimer-preview"
              style={{
                marginTop: "20px",
                fontSize: "12px",
                color: "#666",
                paddingTop: "15px",
            
                borderRadius: "4px",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: formData.disclaimer }} />
            </div>
          )}

          <div className="d-flex justify-content-end my-4">
                   <button className="btn " style={{backgroundColor:"#4285F4", color:"white"}} onClick={navigateToPreview}>
                     <i className="bi bi-check2-circle me-2"></i>
                     Preview
                   </button>
                 </div>

          <div className="action-buttons">
            <button className="btns btns-primary" onClick={copyToClipboard}>
              <span className="btns-icon">📋</span> Copy to Clipboard
            </button>
            <button className="btns btns-secondary" onClick={downloadHTML}>
              <span className="btns-icon">⬇️</span> Download HTML
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailSignatureCreator


