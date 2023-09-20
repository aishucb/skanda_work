import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './home.css'; // Import your CSS styles for Home component

function Home() {
  return (
    <div className="home-container">
      {/* Background Image */}
      <div className="background-image"></div>


      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src="logo.jpg" alt="Logo" />
        </div>
        <h1 className="title">Your Website Title</h1>
      </header>

      {/* Buttons for Write and Read Actions */}
      <div className="button-container">
        <Link to="/write" className="button">
          Write
        </Link>
        <Link to="/read" className="button">
          Read
        </Link>
      </div>
    </div>
  );
}

export default Home;
