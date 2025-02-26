import React from "react";
import "./Login.css";
import Loginimg from "../../assets/Login/login.jpg";
import Microsoftimg from "../../assets/Login/Microsoft_logo.svg.png";
import Fbimg from "../../assets/Login/fblogo.webp";

function Login() {
  return (
    <>
      <div className="container-fluid">
        <div className="row login-container">
          {/* <!-- Left Side --> */}
          <div className="col-md-12 d-flex align-items-center justify-content-center">
            <div className="login-box">
            <div className="login-left">
              <h1 className="login-title">Sign in to Agile Signature</h1>

              {/* <!-- Social Login Buttons --> */}
              <a href="#" className="social-btn btn-google">
                <img src={Microsoftimg} alt="" className="me-2" width="20" />
                Continue with Microsoft
              </a>
              <a href="#" className="social-btn btn-facebook">
                <img src={Fbimg} alt="" className="me-2 fb-logo" width="20" />
                Continue with Facebook
              </a>
              <a href="#" className="social-btn btn-sso">
                Continue with SSO
              </a>

              <div className="divider">OR</div>

              {/* <!-- Login Form --> */}
              <form>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  required="true"
                />
                {/* <div className="form-label">Email Is Required</div> */}

                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required="true"
                />
                {/* <div className="form-label">Password Is Required</div> */}

                <button type="submit" className="btn btn-signin">
                  Sign in
                </button>
              </form>

              <div className="links">
                <a href="#"className="text-color">Forgot password?</a>
                <a href="#"className="text-color">Create an account</a>
              </div>

              <div className="terms">
                By signing up you agree with our &nbsp;
                <a href="#" className="text-color">terms of service</a> & &nbsp;<a href="#" className="text-color">privacy policy</a>
              </div>
            </div>
            </div>
          </div>

          {/* <!-- Right Side --> */}
          {/* <div className="col-md-6 login-right">
            <img src={Loginimg} alt="" className="login-image" />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Login;
