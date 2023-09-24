import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './home.css'; // Import your CSS styles for Home component

function Home() {
  return (
    <div className="home-container">
      {/* Background Image */}
      <div className="background-image"></div>
      {/* Buttons for Write and Read Actions */}
      <div className="button-container">
        <Link to="/write" className="button" style={{ backgroundColor: "#162b2b" }}>
          Write
        </Link>
        <Link to="/read" className="button" style={{ backgroundColor: "#162b2b" }}> 
          Read
        </Link>
      </div>
    </div>
  );
}

export default Home;
