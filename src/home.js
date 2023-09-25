import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './home.css'; // Import your CSS styles for Home component

function Home() {
  return (
    <div className="home-container">
      {/* Background Image */}
      <h1 id='heading'>Neque porro quisquam est qui dolorem ipsum quia dolor</h1>
      <div className="background-image">
      
      </div>
      {/* Buttons for Write and Read Actions */}
      <div className="button-container">
        <Link to="/write" className="button" style={{ backgroundColor: "#040404a8", borderColor: "#e7eff0", color: "white",padding:"60px"}}>
          Write
        </Link>
        <Link to="/read" className="button"  style={{ backgroundColor: "#040404a8", borderColor: "#e7eff0", color: "white",padding:"60px"}}> 
          Read
        </Link>
        <br/>
      </div>
      <div className="button-container" style={{textAlign:"center"}}>
      <Link to="/login"  style={{ backgroundColor: "#33333300", color: " #f99436"}}>
          Login
        </Link>
        <Link to="/payment"  style={{ backgroundColor: "#33333300", color: " #f99436" }}> 
          signup
        </Link>
        </div>
    </div>
  );
}

export default Home;
