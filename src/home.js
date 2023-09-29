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
        <Link to="/write" className="button" style={{ backgroundColor: "#ffa200ad", borderColor: "#e7eff0", color: "white",padding:"60px"}}>
          Write
        </Link>
        <Link to="/read" className="button"  style={{ backgroundColor: "#ffa200ad", borderColor: "#e7eff0", color: "white",padding:"60px"}}> 
          Read
        </Link>
        <br/>
      </div>
      <div className="button-container" style={{padding:"50px"}}>
        <Link to="/alpharead" className="button" style={{ backgroundColor: "black", borderColor: "#e7eff0", color: "white",padding:"20px"}}>
          ALPHA
        </Link>
        <Link to="/betaread" className="button"  style={{ backgroundColor: "black", borderColor: "#e7eff0", color: "white",padding:"20px"}}> 
          BETA
        </Link>
        <Link to="/gammaread" className="button" style={{ backgroundColor: "black", borderColor: "#e7eff0", color: "white",padding:"20px"}}>
          GAMMA
        </Link>
        <Link to="/charlieread" className="button" style={{ backgroundColor: "black", borderColor: "#e7eff0", color: "white",padding:"20px"}}>
          CHARLIE
        </Link>
        <br/>
      </div>
    </div>
  );
}

export default Home;
