import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home'; // Import your other components
import PaymentGateway from './PaymentGateways';
import Login from './LoginForm'; // Import the Login component
import ReadData from './FirestoreDataDisplay';
import OtpApp from './otp';


import SubscribedComponent from './SubscribedComponent';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Function to handle logout (set isAuthenticated to false)
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<ReadData />} />
        <Route path="/write" element={<OtpApp />} />
        <Route path="/payment" element={<PaymentGateway />} />
        {/* Use ProtectedRoute as a regular component */}
        <Route
          path="/protected"
          element={<SubscribedComponent isAuthenticated={isAuthenticated} />}
        />
        <Route path="/read" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
