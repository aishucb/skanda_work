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
        <Link to="/write" className="button" style={{ backgroundColor: "#e7eff0", color: "#012b59"}}>
          Write
        </Link>
        <Link to="/read" className="button" style={{ backgroundColor: "#e7eff0", color: "#012b59" }}> 
          Read
        </Link>
        <br/>
        <Link to="/login"  style={{ backgroundColor: "#e7eff0", color: "#012b59"}}>
          Login
        </Link>
        <Link to="/signup"  style={{ backgroundColor: "#e7eff0", color: "#012b59" }}> 
          signup
        </Link>
      </div>
    </div>
  );
}

export default Home;
