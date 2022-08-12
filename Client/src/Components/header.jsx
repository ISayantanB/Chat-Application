import { Component } from "react";
import React from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
          <div className="container-fluid">
            <span className="navbar-brand text-warning" href="#">Messaging App</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link active text-light text-decoration-none">Home</Link>
                </li>
              </ul>
              <span className="navbar-text pr-2">
                <Link to="/signin" className="text-decoration-none"><button className="nav-link btn-secondary text-wrap border border-info rounded-pill text-light">Sign In</button></Link>
              </span>
              <span className="navbar-text px-2">
                <Link to="/login" className="text-decoration-none"><button className="nav-link btn-secondary text-wrap border border-info rounded-pill text-light">Login</button></Link>
              </span>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Header;