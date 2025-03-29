import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext"; 
import { motion, AnimatePresence } from "framer-motion";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Add state for dropdown
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="navbar">
      <div className="company-logo">
        <img src="/logo trasperent.png" alt="Logo" className="logo-img" />
        <span className="logo-text">
          <span className="gs">Being HR</span>
        </span>
      </div>
      <nav className={`desktop-nav ${isMenuOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/event">Events</Link>
        <Link to="/about">About Us</Link>
        <Link to='/blog'>Blog</Link>
        <Link to="/contact">Contact Us</Link>

        {user ? (
          <div className="profile-dropdown">
            <button className="profile-button" onClick={toggleDropdown}>
              <img src={user.image} alt="Profile" className="profile-img" />
              {user.name} ▼
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <Link to="/profile">My Profile</Link>
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="join-now-button">Join Now</Link>
        )}
      </nav>
      <button className="menu-toggle" onClick={toggleMenu}>☰</button>
   
 {/* Animate Presence for smoother unmount */}
  <AnimatePresence>
    {isMenuOpen && (
      <>
        {/* Sliding Mobile Nav */}
        <motion.nav
          className="mobile-nav"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween", duration: 0.4 }}
        >
          <button className="close-btn" onClick={toggleMenu}>✖</button>
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/event" onClick={toggleMenu}>Events</Link>
          <Link to="/about" onClick={toggleMenu}>About Us</Link>
          <Link to="/blog" onClick={toggleMenu}>Blog</Link>
          <Link to="/contact" onClick={toggleMenu}>Contact Us</Link>
          <Link to="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&client_id=512982533492-mjp24qege6fjg7opc3jc2q7a3osotjkc.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Frecfiesta-c0ab5.firebaseapp.com%2F__%2Fauth%2Fhandler&state=AMbdmDlfTwUIg2YRi4_osmMlaVmquOaV1gKQGDM_4t4sb7zhZ0Ynm4OScW3Lcyull1qEiSZpvwYogJQovOiqcTagUfI_nxFNTUQfx1BKn50P3r110tgeIoexzj8q_HGz4Y6fRRSHbWcJiGmnZZaEfL7aqiAw_LSVI7h2khzTpztumk1WW7R87i_HyyG41myRsgJGQsRXn2ZM7M1G7WC_QKAXzU2yDkDTq0fHxFEgLtS3tmHGgqfx525DIvrLMu6KI7SVgP8qthdgL1xvCvXRjFxLmrCaFh3WdZhB3V9LwINv3efSkXJ_C8zGUf7xh9M3qAzIbxrDGesWLw&scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20profile&prompt=select_account&context_uri=https%3A%2F%2Fawards.recfiesta.com&service=lso&o2v=1&ddm=1&flowName=GeneralOAuthFlow" className="header-button">Sign In with Google</Link>
        </motion.nav>

        {/* Overlay Background */}
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={toggleMenu}
        />
      </>
    )}
  </AnimatePresence>
  </header>
   );
}

export default Header;
