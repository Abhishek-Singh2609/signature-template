"use client"

import { useState, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube,FaTwitter, FaTimes } from "react-icons/fa"
import "./EmailSignature.css"

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
  
  // Get initial state from localStorage or use default values
  const getInitialState = () => {
    // First check if we're coming back from preview page
    if (preserveFormData && savedFormData) {
      return {
        formData: savedFormData,
        activeTab: savedActiveTab || "Personal Info",
        selectedDesign: savedDesign || "default"
      }
    }
    
    // Then check localStorage
    const localStorageState = loadFromLocalStorage()
    if (localStorageState) {
      return {
        formData: localStorageState.formData,
        activeTab: localStorageState.activeTab || "Personal Info",
        selectedDesign: localStorageState.selectedDesign || "default"
      }
    }
    
    // Default values if nothing is saved
    return {
      formData: {
    name: "John Doe",
    jobTitle: "Product Designer",
    company: "Agilesignature.com",
    email: "john.doe@agile.com",
    phone: "+1 (555) 123-4567",
    phone2: "",
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
      },
      activeTab: "Personal Info",
      selectedDesign: "default"
    }
  }
  
  // Get initial state
  const initialState = getInitialState()
  
  const [activeTab, setActiveTab] = useState(initialState.activeTab)
  const [selectedDesign, setSelectedDesign] = useState(initialState.selectedDesign)
  const imageInputRef = useRef(null)
  const logoInputRef = useRef(null)
  const [formData, setFormData] = useState(initialState.formData)

  // Save state to localStorage
  const saveToLocalStorage = (newFormData, newActiveTab, newSelectedDesign) => {
    try {
      const stateToSave = {
        formData: newFormData || formData,
        activeTab: newActiveTab || activeTab,
        selectedDesign: newSelectedDesign || selectedDesign
      }
      localStorage.setItem('emailSignatureState', JSON.stringify(stateToSave))
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

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const updatedFormData = { ...formData, [type]: event.target.result }
        setFormData(updatedFormData)
        saveToLocalStorage(updatedFormData)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (type) => {
    const updatedFormData = { ...formData, [type]: null }
    setFormData(updatedFormData)
    saveToLocalStorage(updatedFormData)
  }

  const triggerImageUpload = () => {
    imageInputRef.current.click()
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          logo: e.target.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerLogoUpload = () => {
    logoInputRef.current.click()
  }

  const removeLogo = () => {
    const updatedFormData = { ...formData, logo: null }
    setFormData(updatedFormData)
    saveToLocalStorage(updatedFormData)
  }

  // Campaign banner functions
  const handleCampaignNameChange = (id, value) => {
    const updatedFormData = {
      ...formData,
      campaigns: formData.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, name: value } : campaign
      ),
    }
    setFormData(updatedFormData)
    saveToLocalStorage(updatedFormData)
  }

  const handleCampaignImageUpload = (e, id) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const updatedFormData = {
          ...formData,
          campaigns: formData.campaigns.map((campaign) =>
            campaign.id === id ? { ...campaign, image: event.target.result } : campaign
          ),
        }
        setFormData(updatedFormData)
        saveToLocalStorage(updatedFormData)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCampaignExpiryChange = (id, value) => {
    const updatedFormData = {
      ...formData,
      campaigns: formData.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, expiryDate: value } : campaign
      ),
    }
    setFormData(updatedFormData)
    saveToLocalStorage(updatedFormData)
  }

  const handleCampaignStartDateChange = (id, value) => {
    const updatedFormData = {
      ...formData,
      campaigns: formData.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, startDate: value } : campaign
      ),
    }
    setFormData(updatedFormData)
    saveToLocalStorage(updatedFormData)
  }

  const handleCampaignLinkChange = (campaignId, linkIndex, field, value) => {
    const updatedFormData = {
      ...formData,
      campaigns: formData.campaigns.map((campaign) => {
        if (campaign.id === campaignId) {
          const updatedLinks = [...campaign.links]
          updatedLinks[linkIndex] = {
            ...updatedLinks[linkIndex],
            [field]: value
          }
          return { ...campaign, links: updatedLinks }
        }
        return campaign
      })
    }
    setFormData(updatedFormData)
    saveToLocalStorage(updatedFormData)
  }

  const removeCampaignImage = (id) => {
    const updatedFormData = {
      ...formData,
      campaigns: formData.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, image: null } : campaign
      ),
    }
    setFormData(updatedFormData)
    saveToLocalStorage(updatedFormData)
  }

  const toggleCampaignActive = (id) => {
    const campaign = formData.campaigns.find((c) => c.id === id)
    
    if (!campaign || !campaign.image || isCampaignExpired(campaign.expiryDate, campaign.startDate)) {
      return
    }
    
    const updatedFormData = {
      ...formData,
      campaigns: formData.campaigns.map((c) =>
        c.id === id ? { ...c, active: !c.active } : c
      ),
    }
    setFormData(updatedFormData)
    saveToLocalStorage(updatedFormData)
  }

  // Check if campaign is expired or not yet started
  const isCampaignExpired = (expiryDate, startDate) => {
    const today = new Date();
    
    // Check if campaign has not started yet
    if (startDate) {
      const start = new Date(startDate);
      if (today < start) return true; // Not yet started
    }
    
    // Check if campaign has expired
    if (expiryDate) {
      const expiry = new Date(expiryDate);
      if (today > expiry) return true; // Expired
    }
    
    return false; // Campaign is active
  }

  // Get active campaigns
  const getActiveCampaigns = () => {
    const activeCampaigns = formData.campaigns.filter(campaign => 
      campaign.active && campaign.image && !isCampaignExpired(campaign.expiryDate, campaign.startDate)
    )
    return activeCampaigns
  }

  // Design templates - expanded with more aesthetic options
  const designTemplates = [
    {
      id: "default",
      name: "Default Blue",
      color: "#3498db",
      layout: "standard",
    },
    {
      id: "dark",
      name: "Dark Professional",
      color: "#2c3e50",
      layout: "standard",
    },
    {
      id: "minimal",
      name: "Minimal Gray",
      color: "#7f8c8d",
      layout: "standard",
    },
    {
      id: "vibrant",
      name: "Vibrant Purple",
      color: "#9b59b6",
      layout: "standard",
    },
    {
      id: "green",
      name: "Natural Green",
      color: "#27ae60",
      layout: "standard",
    },
    {
      id: "modern",
      name: "Modern Split",
      color: "#e74c3c",
      layout: "split",
    },
    {
      id: "elegant",
      name: "Elegant Gold",
      color: "#f39c12",
      layout: "centered",
    },
    {
      id: "clean",
      name: "Clean Teal",
      color: "#16a085",
      layout: "horizontal",
    },
    {
      id: "gradient",
      name: "Gradient Blue",
      color: "brown",
      gradient: "linear-gradient(135deg, #3498db, #2980b9)",
      layout: "standard",
    },
    {
      id: "bordered",
      name: "Bordered Card",
      color: "#8e44ad",
      layout: "bordered",
    },
    {
      id: "banner",
      name: "Banner Design",
      color: "#34495e",
      layout: "banner",
    },
  ]

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

  // Update the design selection to save to localStorage
  const handleDesignSelect = (designId) => {
    setSelectedDesign(designId)
    saveToLocalStorage(null, null, designId)
  }

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Personal Info":
        return (
          <div className="form">
            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
              <label className="labeltext-width" htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} style={{ width: "50%" }} />
            </div>

            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
              <label className="labeltext-width" htmlFor="jobTitle">Job Title</label>
              <input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} style={{ width: "50%" }} />
            </div>

            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
              <label className="labeltext-width" htmlFor="company">Company</label>
              <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} style={{ width: "50%" }} />
            </div>

            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
              <label className="labeltext-width" htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: "50%" }} />
            </div>

            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
              <label className="labeltext-width" htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} style={{ width: "50%" }} />
            </div>

            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
              <label className="labeltext-width" htmlFor="phone2"> Phone</label>
              <input type="tel" id="phone2" name="phone2" value={formData.phone2} onChange={handleInputChange} style={{ width: "50%" }} />
            </div>

            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
              <label className="labeltext-width" htmlFor="location">Location</label>
              <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} style={{ width: "50%" }} />
            </div>

            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
              <label className="labeltext-width" htmlFor="website">Website</label>
              <input type="text" id="website" name="website" value={formData.website} onChange={handleInputChange} style={{ width: "50%" }} />
            </div>
          </div>
        )
      case "Social":
        return (
          <div className="form">
            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
              <label className="label-width" htmlFor="linkedin"><FaLinkedin size={25} style={{color:"#0077b5"}}/></label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/johndoe"
                style={{ width: "50%" }}
              />
            </div>

            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
              <label className="label-width" htmlFor="twitter"><span style={{fontSize:"25px",color:"#000"}}>𝕏</span></label>
              <input
                type="url"
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                placeholder="https://twitter.com/johndoe"
                style={{ width: "50%" }}
              />
            </div>

            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
              <label className="label-width" htmlFor="instagram"><FaInstagram size={25} style={{color:"#c32aa3"}}/></label>
              <input
                type="url"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="https://instagram.com/johndoe"
                style={{ width: "50%" }}
              />
            </div>

            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
              <label className="label-width" htmlFor="facebook"><FaFacebook size={25} style={{color:"#3b5998"}}/></label>
              <input
                type="url"
                id="facebook"
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                placeholder="https://facebook.com/johndoe"
                style={{ width: "50%" }}
              />
            </div>
            
            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
              <label className="label-width" htmlFor="youtube"><FaYoutube size={25} style={{color:"#ff0000"}}/></label>
              <input
                type="url"
                id="youtube"
                name="youtube"
                value={formData.youtube}
                onChange={handleInputChange}
                placeholder="https://youtube.com/johndoe"
                style={{ width: "50%" }}
              />
            </div>
            
            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
              <label className="label-width" htmlFor="portfolio"><span style={{fontSize:"25px",color:"#000"}}>🔗</span></label>
              <input
                type="url"
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleInputChange}
                placeholder="https://portfolio.com/johndoe"
                style={{ width: "50%" }}
              />
            </div>
          </div>
        )
      case "Design":
        return (
          <div className="design-options">
            <p className="design-intro">Select a design template for your email signature:</p>
            <div className="design-grid">
              {designTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`design-card ${selectedDesign === template.id ? "selected" : ""}`}
                  onClick={() => handleDesignSelect(template.id)}
                  style={{ borderColor: selectedDesign === template.id ? template.color : "#ddd" }}
                >
                  <div
                    className="design-preview"
                    style={{
                      background: template.gradient || template.color,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {template.layout === "split" && (
                      <div
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
                  <p className="design-name">{template.name}</p>
                </div>
              ))}
            </div>
          </div>
        )
      case "Images":
        return (
          <div className="form">
            <div className="image-upload-section">
              <label>Profile Image</label>
              <div className="image-upload-container">
                {formData.profileImage ? (
                  <div className="image-preview-container">
                    <img src={formData.profileImage || "/placeholder.svg"} alt="Profile" className="image-preview" />
                    <button className="remove-image-btn" onClick={() => removeImage("profileImage")}>
                      <FaTimes size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder" onClick={() => imageInputRef.current.click()}>
                    <span className="upload-icon">📷</span>
                    <span>Upload</span>
                  </div>
                )}
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={(e) => handleImageUpload(e, "profileImage")}
                  accept="image/*"
                  className="hidden-input"
                />
              </div>
              <p className="image-tip">Recommended: Image at least should be 100x100px</p>
            </div>

            <div className="image-upload-section" style={{ marginTop: "20px" }}>
              <label>Company Logo</label>
              <div className="image-upload-container">
                {formData.logo ? (
                  <div className="image-preview-container" style={{ position: "relative" }}>
                    <img src={formData.logo || "/placeholder.svg"} alt="Logo" className="image-preview" />
                    <button
                      className="remove-image-btn"
                      onClick={() => removeLogo()}
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        background: "rgba(0,0,0,0.5)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ) : (
                  <div
                    className="upload-placeholder"
                    onClick={() => logoInputRef.current.click()}
                    style={{
                      width: "100px",
                      height: "100px",
                      border: "2px dashed #ddd",
                      borderRadius: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span className="upload-icon">📷</span>
                    <span>Upload</span>
                  </div>
                )}
                <input
                  type="file"
                  ref={logoInputRef}
                  onChange={(e) => handleImageUpload(e, "logo")}
                  accept="image/*"
                  className="hidden-input"
                  style={{ display: "none" }}
                />
              </div>
              <p className="image-tip">Recommended: Logo should be at least 100x100px</p>
            </div>
          </div>
        )
      case "Banner":
        return (
          <div className="form">
            <div className="campaign-banners-section" style={{ marginTop: "10px" }}>
              <h3 style={{ marginBottom: "15px" }}>Campaign Banners</h3>
              
              {formData.campaigns.map((campaign) => (
                <div key={campaign.id} className="campaign-item" style={{ 
                  marginBottom: "20px", 
                  padding: "15px", 
                  border: "1px solid #ddd", 
                  borderRadius: "8px",
                  backgroundColor: campaign.active ? "rgba(52, 152, 219, 0.1)" : "transparent",
                  borderColor: campaign.active ? "#3498db" : "#ddd"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                    <div className="form-group" style={{ margin: "0", flex: "2", marginRight: "10px" }}>
                      <label htmlFor={`campaign-name-${campaign.id}`}>Campaign Name</label>
                      <input
                        type="text"
                        id={`campaign-name-${campaign.id}`}
                        value={campaign.name}
                        onChange={(e) => handleCampaignNameChange(campaign.id, e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>
                    
                    <div className="form-group" style={{ margin: "0", flex: "1.5", marginRight: "10px" }}>
                      <label htmlFor={`campaign-start-${campaign.id}`}>Start Date</label>
                      <input
                        type="date"
                        id={`campaign-start-${campaign.id}`}
                        value={campaign.startDate}
                        onChange={(e) => handleCampaignStartDateChange(campaign.id, e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>
                    
                    <div className="form-group" style={{ margin: "0", flex: "1.5" }}>
                      <label htmlFor={`campaign-expiry-${campaign.id}`}>Expiry Date</label>
                      <input
                        type="date"
                        id={`campaign-expiry-${campaign.id}`}
                        value={campaign.expiryDate}
                        onChange={(e) => handleCampaignExpiryChange(campaign.id, e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ display: "", marginTop: "10px" }}>
                    <div className="image-upload-container" style={{ flex: "1", marginRight: "15px" }}>
                      {campaign.image ? (
                        <div className="image-preview-container" style={{ position: "relative" }}>
                          <img
                            src={campaign.image}
                            alt={`Campaign ${campaign.id}`}
                      className="image-preview"
                            style={{ width: "100%", height: "auto", maxHeight: "150px", objectFit: "cover" }}
                    />
                    <button
                      className="remove-image-btn"
                            onClick={() => removeCampaignImage(campaign.id)}
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        background: "rgba(0,0,0,0.5)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ) : (
                  <div
                    className="upload-placeholder"
                          onClick={() => document.getElementById(`campaign-upload-${campaign.id}`).click()}
                    style={{
                      width: "100%",
                            height: "150px",
                      border: "2px dashed #ddd",
                      borderRadius: "4px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span className="upload-icon">🖼️</span>
                          <span>Upload Campaign Banner</span>
                  </div>
                )}
                <input
                        id={`campaign-upload-${campaign.id}`}
                  type="file"
                        onChange={(e) => handleCampaignImageUpload(e, campaign.id)}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
                    
                    <div style={{ flex: "1 1 15%" }}>
                      <label style={{ display: "block", marginBottom: "8px", marginTop: "15px", fontWeight: "500" }}>Banner Links (Clickable Areas)</label>
                      
                      {campaign.links.map((link, index) => (
                        <div key={index} style={{ 
                          marginBottom: "10px", 
                          padding: "8px", 
                          backgroundColor: "#f9f9f9", 
                          borderRadius: "4px",
                          border: "1px solid #eee"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
                            <div style={{ 
                              width: "20px", 
                              height: "20px", 
                              borderRadius: "50%", 
                              backgroundColor: index === 0 ? "#ff6b6b" : index === 1 ? "#51cf66" : "#339af0", 
                              color: "white", 
                              display: "flex", 
                              alignItems: "center", 
                              justifyContent: "center",
                              marginRight: "8px",
                              fontSize: "11px",
                              fontWeight: "bold"
                            }}>
                              {index + 1}
                            </div>
                            <div style={{ flex: 1 }}>
                              <input
                                type="text"
                                placeholder={`Link ${index + 1} Text`}
                                value={link.text}
                                onChange={(e) => handleCampaignLinkChange(campaign.id, index, 'text', e.target.value)}
                                style={{
                                  width: "100%",
                                  padding: "6px",
                                  borderRadius: "4px",
                                  border: "1px solid #ddd",
                                  fontSize: "13px"
                                }}
                              />
                            </div>
                          </div>
                          <input
                            type="url"
                            placeholder="https://example.com"
                            value={link.url}
                            onChange={(e) => handleCampaignLinkChange(campaign.id, index, 'url', e.target.value)}
                            style={{
                              width: "100%",
                              padding: "6px",
                              borderRadius: "4px",
                              border: "1px solid #ddd",
                              fontSize: "13px"
                            }}
                          />
                          {/* <div style={{ 
                            marginTop: "4px", 
                            fontSize: "11px", 
                            color: "#666",
                            display: "flex",
                            alignItems: "center"
                          }}>
                            {index === 0 ? "Left section" : index === 1 ? "Middle section" : "Right section"}
                          </div> */}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: "14px", color: "#666" }}>
                      {isCampaignExpired(campaign.expiryDate, campaign.startDate) ? (
                        <span style={{ color: "red" }}>
                          {campaign.startDate && new Date() < new Date(campaign.startDate) 
                            ? "Not started yet" 
                            : "Expired"}
                        </span>
                      ) : campaign.expiryDate ? (
                        <span>Active until: {new Date(campaign.expiryDate).toLocaleDateString()}</span>
                      ) : (
                        <span>No expiry date set</span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleCampaignActive(campaign.id)}
                      disabled={!campaign.image || isCampaignExpired(campaign.expiryDate, campaign.startDate)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: campaign.active ? "#2ecc71" : "#3498db",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: campaign.image && !isCampaignExpired(campaign.expiryDate, campaign.startDate) ? "pointer" : "not-allowed",
                        opacity: campaign.image && !isCampaignExpired(campaign.expiryDate, campaign.startDate) ? "1" : "0.5",
                      }}
                    >
                      {campaign.active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case "Disclaimer":
        return (
          <div className="form">
            <div className="form-group" style={{ marginTop: "20px" }}>
              <label htmlFor="disclaimer">Disclaimer</label>
              <textarea
                id="disclaimer"
                name="disclaimer"
                value={formData.disclaimer}
                onChange={handleInputChange}
                rows="4"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  resize: "vertical",
                }}
                placeholder="Enter your disclaimer text here..."
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  // Get style based on selected design
  const getDesignStyle = () => {
    const design = designTemplates.find((d) => d.id === selectedDesign)

    const baseStyle = {
      nameColor: design.color,
      accentColor: design.color,
      backgroundColor: selectedDesign === "dark" ? "#2c3e50" : "white",
      textColor: selectedDesign === "dark" ? "white" : "#333",
      borderStyle: selectedDesign === "minimal" ? "none" : "1px solid #e6e6e6",
      boxShadow: selectedDesign === "minimal" ? "none" : "0 2px 10px rgba(0, 0, 0, 0.05)",
      gradient: design.gradient || null,
      layout: design.layout,
    }

    // Add specific styling based on layout
    if (design.layout === "split") {
      return {
        ...baseStyle,
        containerStyle: {
          display: "flex",
          background: baseStyle.backgroundColor,
        },
        sidebarStyle: {
          width: "120px",
          backgroundColor: design.color,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
        },
        contentStyle: {
          flex: 1,
          padding: "20px",
        },
      }
    }

    if (design.layout === "bordered") {
      return {
        ...baseStyle,
        borderStyle: `3px solid ${design.color}`,
        innerPadding: "16px",
      }
    }

    if (design.layout === "horizontal") {
      return {
        ...baseStyle,
        footerStyle: {
          backgroundColor: design.color,
          marginTop: "16px",
          padding: "12px",
          color: "white",
          borderRadius: "0 0 8px 8px",
        },
      }
    }

    if (design.layout === "centered") {
      return {
        ...baseStyle,
        textAlign: "center",
        dividerStyle: {
          width: "60%",
          margin: "12px auto",
          height: "2px",
          background: design.color,
        },
      }
    }

    return baseStyle
  }

  const designStyle = getDesignStyle()

  // Render social icons
  const renderSocialIcons = () => {
    const hasAnySocial =
      formData.linkedin || formData.twitter || formData.instagram || formData.facebook || formData.youtube || formData.portfolio
    if (!hasAnySocial) return null

    return (
      <div className="social-icons">
        {formData.linkedin && (
          <span className="social-icon linkedin">
            <FaLinkedin />
          </span>
        )}
        {formData.twitter && <span className="social-icon twitter">𝕏</span>}
        {formData.instagram && (
          <span className="social-icon instagram">
            <FaInstagram />
          </span>
        )}
        {formData.facebook && (
          <span className="social-icon facebook">
            <FaFacebook />
          </span>
        )}
        {formData.youtube && (
          <span className="social-icon youtube">
            <FaYoutube />
          </span>
        )}
        {formData.portfolio && (
          <span className="social-icon portfolio" style={{ fontSize: "16px" }}>
            🔗
          </span>
        )}
      </div>
    )
  }

  // Render the signature based on the selected design
  const renderSignature = () => {
    const design = designTemplates.find((d) => d.id === selectedDesign)

    // Split layout design
    if (design.layout === "split") {
      return (
        <>
          <div style={designStyle.containerStyle} className="signature-preview split-layout">
            <div style={designStyle.sidebarStyle} className="signature-sidebar">
              {formData.profileImage && (
                <div className="profile-image-container centered">
                  <img src={formData.profileImage || "/placeholder.svg"} alt={formData.name} className="profile-image" />
                </div>
              )}
              <h3 className="preview-name centered" style={{ color: "white" }}>
                {formData.name}
              </h3>
              <p className="preview-job centered" style={{ color: "rgba(255,255,255,0.8)" }}>
                {formData.jobTitle}
              </p>
              <div className="sidebar-social-icons">{renderSocialIcons()}</div>
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
            <div style={designStyle.contentStyle} className="signature-content">
              <p className="preview-company">{formData.company}</p>
              <div className="contact-info">
                <p className="contact-item">
                  <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                    📞
                  </span>{" "}
                  {formData.phone}
                </p>
                {formData.phone2 && (
                  <p className="contact-item">
                    <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                      📞
                    </span>{" "}
                    {formData.phone2}
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
                <div className="banner-container" style={{ marginTop: "10px", width: "100%" }}>
                  {getActiveCampaigns().map((campaign) => (
                    <div key={campaign.id} style={{ position: "relative", marginBottom: "5px" }}>
                      <img
                        src={campaign.image}
                        alt={campaign.name}
                        style={{ width: "100%", height: "auto", maxHeight: "100px", objectFit: "cover" }}
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
                    <img
                      src={formData.banner}
                      alt="Banner"
                      style={{ width: "100%", height: "auto", maxHeight: "100px", objectFit: "cover" }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Disclaimer outside of signature-preview */}
          {formData.disclaimer && (
            <div
              className="disclaimer"
              style={{
                marginTop: "20px",
                fontSize: "12px",
                color: "#666",
                borderTop: "1px solid #eee",
                paddingTop: "10px",
                backgroundColor: "#f9f9f9",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              <strong>Disclaimer:</strong> {formData.disclaimer}
            </div>
          )}
        </>
      )
    }

    // Centered layout
    if (design.layout === "centered") {
      return (
        <>
          <div className="signature-preview centered-layout" style={designStyle.containerStyle}>
            {formData.profileImage && (
              <div className="profile-image-container centered">
                <img src={formData.profileImage || "/placeholder.svg"} alt={formData.name} className="profile-image" />
              </div>
            )}
            <h3 className="preview-name centered" style={{ color: designStyle.nameColor }}>
              {formData.name}
            </h3>
            <p className="preview-job centered">
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
              {formData.phone2 && (
                <p className="contact-item centered-item">
                  <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                    📞
                  </span>{" "}
                  {formData.phone2}
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
            <div className="centered-social">{renderSocialIcons()}</div>
            
            {(getActiveCampaigns().length > 0 || formData.banner) && (
              <div className="banner-container" style={{ marginTop: "10px", width: "100%" }}>
                {getActiveCampaigns().map((campaign) => (
                  <div key={campaign.id} style={{ position: "relative", marginBottom: "5px" }}>
                    <img
                      src={campaign.image}
                      alt={campaign.name}
                      style={{ width: "100%", height: "auto", maxHeight: "100px", objectFit: "cover" }}
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
                  <img
                    src={formData.banner}
                    alt="Banner"
                    style={{ width: "100%", height: "auto", maxHeight: "100px", objectFit: "cover" }}
                  />
                )}
              </div>
            )}
          </div>
          
          {/* Disclaimer outside of signature-preview */}
          {formData.disclaimer && (
            <div
              className="disclaimer"
              style={{
                marginTop: "20px",
                fontSize: "12px",
                color: "#666",
                borderTop: "1px solid #eee",
                paddingTop: "10px",
                backgroundColor: "#f9f9f9",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
               {formData.disclaimer}
            </div>
          )}
        </>
      )
    }

    // Horizontal layout
    if (design.layout === "horizontal") {
      return (
        <>
          <div
            className="signature-preview horizontal-layout"
            style={{
              backgroundColor: designStyle.backgroundColor,
              color: designStyle.textColor,
              border: designStyle.borderStyle,
              boxShadow: designStyle.boxShadow,
              background: designStyle.gradient || designStyle.backgroundColor,
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
                  {formData.phone2 && (
                    <p className="contact-item">
                      <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                        📞
                      </span>{" "}
                      {formData.phone2}
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
                <div className="contact-right">{renderSocialIcons()}</div>
              </div>
              
              {(getActiveCampaigns().length > 0 || formData.banner) && (
                <div className="banner-container" style={{ marginTop: "10px", width: "100%" }}>
                  {getActiveCampaigns().map((campaign) => (
                    <div key={campaign.id} style={{ position: "relative", marginBottom: "5px" }}>
                      <img
                        src={campaign.image}
                        alt={campaign.name}
                        style={{ width: "100%", height: "auto", maxHeight: "100px", objectFit: "cover" }}
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
                    <img
                      src={formData.banner}
                      alt="Banner"
                      style={{ width: "100%", height: "auto", maxHeight: "100px", objectFit: "cover" }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Disclaimer outside of signature-preview */}
          {formData.disclaimer && (
            <div
              className="disclaimer"
              style={{
                marginTop: "20px",
                fontSize: "12px",
                color: "#666",
                borderTop: "1px solid #eee",
                paddingTop: "10px",
                backgroundColor: "#f9f9f9",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              <strong>Disclaimer:</strong> {formData.disclaimer}
            </div>
          )}
        </>
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
                <p className="contact-item">
                  <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                    📞
                  </span>{" "}
                  {formData.phone2}
                </p>
              </div>
              <div className="contact-right">{renderSocialIcons()}</div>
            </div>
            
            {(getActiveCampaigns().length > 0 || formData.banner) && (
              <div className="banner-container" style={{ marginTop: "10px", width: "100%" }}>
                {getActiveCampaigns().map((campaign) => (
                  <div key={campaign.id} style={{ position: "relative", marginBottom: "5px" }}>
                    <img
                      src={campaign.image}
                      alt={campaign.name}
                      style={{ width: "100%", height: "auto", maxHeight: "100px", objectFit: "cover" }}
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
                  <img
                    src={formData.banner}
                    alt="Banner"
                    style={{ width: "100%", height: "auto", maxHeight: "100px", objectFit: "cover" }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )
    }

    // Default/Standard layout
    return (
      <>
        <div className="signature-preview standard-layout">
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
              {formData.phone2 && (
                <p className="contact-item">
                  <span className="contact-icon" style={{ color: designStyle.accentColor }}>
                    📞
                  </span>{" "}
                  {formData.phone2}
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
            <div className="contact-right">{renderSocialIcons()}</div>
          </div>
          {(getActiveCampaigns().length > 0 || formData.banner) && (
            <div className="banner-container" style={{ marginTop: "10px", width: "100%" }}>
              {getActiveCampaigns().map((campaign) => (
                <div key={campaign.id} style={{ position: "relative", marginBottom: "5px" }}>
                  <img
                    src={campaign.image}
                    alt={campaign.name}
                    style={{ width: "100%", height: "auto", maxHeight: "100px", objectFit: "cover" }}
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
                <img
                  src={formData.banner}
                  alt="Banner"
                  style={{ width: "100%", height: "auto", maxHeight: "100px", objectFit: "cover" }}
                />
              )}
            </div>
          )}
        </div>
        
        {/* Disclaimer outside of signature-preview */}
        {formData.disclaimer && (
          <div
            className="disclaimer"
            style={{
              marginTop: "20px",
              fontSize: "12px",
              color: "#666",
              borderTop: "1px solid #eee",
              paddingTop: "10px",
              backgroundColor: "#f9f9f9",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            <strong>Disclaimer:</strong> {formData.disclaimer}
          </div>
        )}
      </>
    )
  }

  return (
    <div className="container">
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

          <div className="d-flex justify-content-end my-4">
                   <button className="btn btn-success" onClick={navigateToPreview}>
                     <i className="bi bi-check2-circle me-2"></i>
                     OK, I'm done
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
  )
}

export default EmailSignatureCreator


