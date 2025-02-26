import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./Herosection.css";
import Heroimg from "../assets/HeroPage/heroimg.png";
function HeroSection() {
  return (
    <div>
        
        <div className="bg-white py-5" style={{ backgroundImage: 'url(/path/to/image.jpg)', backgroundSize: 'cover' }}>
  <div className="container">
    <div className="text-center">
      <h2 className="mb-4 custom-heading">
        Why <span className='span-text'>Agile</span> Email <br /> Signature Software?
      </h2>
      <p className="lead text-secondary mb-4 custom-para">
        Agile Email Signature is the world-leading centrally managed solution for email<br />
        signatures for <span className="para-text">Microsoft 365,</span> Google Workspace, Microsoft Exchange, and HCL Domino.
      </p>
    </div>
  </div>
</div>

        <section class="hero py-4">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 mb-5 mb-lg-0">
                    <h1 class="hero-title mb-4">Powerful Centrally Managed Email Signature Designer</h1>
                    
                    <div class="features mb-5">
                        <div class="feature-item">
                            <div class="feature-icon">→</div>
                            <div>
                                <h3 class="h5 mb-2">World's first enterprise private cloud solution</h3>
                                <p class="text-muted mb-0">Secure, Consistent & Compliant signatures across all devices</p>
                            </div>
                        </div>
                        
                        <div class="feature-item">
                            <div class="feature-icon">→</div>
                            <div>
                                <h3 class="h5 mb-2">Powerful designer - dynamic designs & content</h3>
                                <p class="text-muted mb-0">Drag and drop signature blocks, conditional fields & images</p>
                            </div>
                        </div>
                        
                        <div class="feature-item">
                            <div class="feature-icon">→</div>
                            <div>
                                <h3 class="h5 mb-2">Use templates or design your own</h3>
                                <p class="text-muted mb-0">Setup & design signatures to work on all devices</p>
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-dark btn-lg px-4">Start Free Trial →</button>
                </div>
                <div class="col-lg-6">
                    <img src={Heroimg} alt="Email Signature Designer Interface" class="hero-image" />
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default HeroSection