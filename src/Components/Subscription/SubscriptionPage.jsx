"use client"

import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./SubscriptionPage.css"
import { FaCheck, FaInfoCircle } from "react-icons/fa"

function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState("annually")

  const handleBillingChange = (cycle) => {
    setBillingCycle(cycle)
  }

  return (
    <div className="container-fluid subscription-container">
      <div className="row justify-content-center">
        <div className="text-center mb-3">
         <h1 className="display-4 fw-bold mb-3">Choose Your Plan</h1>
         <p className="lead mx-auto" style={{ maxWidth: "700px" }}>
           Select the perfect plan for your needs. Upgrade or downgrade at any time.
         </p>
       </div>
      </div>

      <div className="row justify-content-center pricing-row">
        {/* Basic Plan */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="pricing-card">
            <h2 className="plan-name">Monthly</h2>

            <div className="price-container">
              <span className="price">$0.99</span>
              <span className="price-period">user/ month</span>
            </div>


            <p className="plan-description">Create professional and consistent signatures for your organization.</p>

            <button className="cta-button">Start free trial</button>

            <div className="features-list">
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Centrally managed</span>
                
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Unlimited designs</span>
                
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Compatible with all devices</span>
                
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Department signatures</span>
                
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Works with all email clients</span>
                
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Flexible deployment</span>
                
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Legal disclaimers</span>
                
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>24/7 Customer support</span>
                
              </div>
            </div>
          </div>
        </div>

        {/* Plus Plan */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="pricing-card best-value">
            <div className="best-value-badge">Most Popular</div>
            <h2 className="plan-name">Yearly</h2>

            <div className="price-container">
              <span className="price plus-plan-price">$12</span>
              <span className="price-period"><strong>25% OFF</strong></span>
              <span className="price">$9</span>
              <span className="price-period">user/ month</span>
            </div>

            <div className="total-price">
              <p></p>
            </div>

            <p className="plan-description">Get advanced features & analytics for your signatures.</p>

            <button className="cta-button">Start free trial</button>

            <div className="features-list">
              <div className="included-features">All the benefits of Basic and:</div>

              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Signature analytics</span>
                
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Multiple organizations</span>
                
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Campaigns</span>
                
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Shared inbox</span>
                
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Custom directory sync</span>
                
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Employee lifecycle automation</span>
                
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Details editable by employee</span>
                
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Dedicated onboarding specialist</span>
                
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Dedicated customer success manager</span>
                
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="pricing-card">
            <h2 className="plan-name">Enterprise</h2>

            <div className="enterprise-icon">
              <svg viewBox="0 0 24 24" width="64" height="64" stroke="#0d3b66" strokeWidth="1.5" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>

            <p className="plan-description enterprise-description">
              Securely manage your signatures at the highest scale.
            </p>

            <button className="cta-button enterprise-cta">Contact sales</button>

            <div className="features-list">
              <div className="included-features">All the benefits of Plus and:</div>

              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>SAML single sign on - Integrate an identity provider to securely sign in to WiseStamp</span>
        
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>External access control - Enhance account privacy with customized access settings</span>
        
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Audit log - Record account activities for enhanced security, accountability, and compliance</span>
        
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage










