import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const EditTemplate = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    website: "",
    address: "",
    companySize: "",
    image: "https://via.placeholder.com/64",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-6 mb-4">
          <h2 className="mb-4">Signature details</h2>
          <form>
            {["name", "title", "company", "website", "address"].map((field) => (
              <div className="mb-1" key={field}>
                <label htmlFor={field} className="form-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                />
              </div>
            ))}
            <div className="mb-3">
              <label htmlFor="companySize" className="form-label">Company Size</label>
              <select className="form-select" id="companySize" value={formData.companySize} onChange={handleChange}>
                <option value="">Select company size</option>
                {["1-10", "11-50", "51-200", "201-500", "501+"].map(size => (
                  <option key={size} value={size}>{size} employees</option>
                ))}
              </select>
            </div>
            {/* <button type="button" className="btn btn-outline-primary w-100 text-start mb-3">
              <span className="me-2">+</span> Add a field
            </button> */}
            <div className="text-center border border-2 border-dashed rounded p-4">
              <input type="file" accept="image/*" className="d-none" id="imageUpload" onChange={handleImageChange} disabled={isSubmitted} />
              <label htmlFor="imageUpload" className="d-block cursor-pointer">
                <div className="mb-3">
                  <div className="d-inline-block rounded-circle bg-light p-3">
                    <span className="h4">↑</span>
                  </div>
                </div>
                <p className="mb-0">Upload image</p>
              </label>
            </div>
          </form>
        </div>

        <div className="col-lg-6" style={{marginTop: "50px"}}>
          <div className="card">
            <div className="card-header bg-light">New Message</div>
            <div className="card-body">
              <div className="border-top pt-4">
                <div className="mb-4">
                  <img src="src/assets/Demo/image.png" alt="Demo" />
                </div>
                <div className="d-flex gap-3">
                  <img src={formData.image} alt="Profile" className="rounded-circle" width="64" height="64" />
                  <div>
                    <h3 className="h5 mb-1">Jorden Smith</h3>
                    <p className="text-muted mb-1">CTO at T&M Corporate marketing</p>
                    <p className="small text-muted">www.tmcorporateproperties.com | 1937 Fieldcrest Road, NY 10011</p>
                    <div className="mt-2">
                      {["facebook", "instagram", "linkedin", "twitter", "tiktok"].map((platform) => (
                        <a key={platform} href="#" className={`me-2 text-${platform === "instagram" ? "danger" : platform === "twitter" ? "dark" : "primary"}`}>
                          <i className={`bi bi-${platform}`}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                {/* <div className="mt-3">
                  <p className="small text-muted">
                    Create your own <a href="#" className="text-decoration-none text-danger">email signature</a>
                  </p>
                </div>
                <div className="mt-4">
                  <input type="text" className="form-control bg-light" placeholder="Add an app here (disclaimer, banner...)" />
                </div> */}
                {/* <div className="mt-3">
                  <button className="btn btn-outline-danger">× Remove branding</button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="mt-4 text-end">
            <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitted}>
              {isSubmitted ? "Card Ready!" : "OK, done"}
            </button>
          </div>
        </div>
      </div>
      <footer className="mt-5 text-center small text-muted mb-4">
        By signing up, you agree to our <a href="#" className="text-decoration-none">Terms of Use</a> and <a href="#" className="text-decoration-none">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default EditTemplate;
