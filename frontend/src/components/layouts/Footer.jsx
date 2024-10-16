import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-3 mt-4 justify-content-between">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <a href="/" className="d-flex align-items-center justify-content-center text-dark pt-3 mb-5">
              <img alt="logo" src="/src/assets/logo/u-r-logo-black.svg" width="200" height="80" />
              {/* <span className="ms-2 h5 font-weight-bold"></span> */}
            </a>
            <div className="d-flex justify-content-around gap-3">
              <a href="/" >
                <FaFacebookF />
              </a>
              <a href="/">
                <FaTwitter />
              </a>
              <a href="/">
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className="col-md-3  ">
            <h5 className="mb-4">Urban  Resource</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark">Resources</a></li>
              <li><a href="/" className="text-dark">About Us</a></li>
              <li><a href="/" className="text-dark">Contact</a></li>
              <li><a href="/" className="text-dark">Blog</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="mb-4">Products</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark">Windframe</a></li>
              <li><a href="/" className="text-dark">Loop</a></li>
              <li><a href="/" className="text-dark">Contrast</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="mb-4">Help</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark">Support</a></li>
              <li><a href="/" className="text-dark">Sign Up</a></li>
              <li><a href="/" className="text-dark">Sign In</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <small>&copy; Arun U R, {new Date().getFullYear()}. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;