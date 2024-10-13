import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img 
          src="https://culturelinkr.com/logo.png" 
          alt="Logo" 
          className="navbar-logo" 
        />
        <h1 className="navbar-title">Culture Linkr</h1>
      </div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
