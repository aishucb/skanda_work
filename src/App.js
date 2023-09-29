import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home'; // Import your other components
import PaymentGateway from './PaymentGateways';
import Login from './LoginForm'; // Import the Login component
import ReadData from './FirestoreDataDisplay';
import OtpApp from './otp';
import RazorpayPayment from './payment';
import RazorpayPaymentAlpha from './payment copy';
import RazorpayPaymentbeta from './payment copy 2';
import RazorpayPaymentgamma from './payment copy 3';
import RazorpayPaymentcharlie from './payment copy 4';

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

        <Route path="/read" element={<RazorpayPayment />} />
        <Route path="/write" element={<OtpApp />} />
        <Route path="/alpharead" element={<RazorpayPaymentAlpha />} />
        <Route path="/betaread" element={<RazorpayPaymentbeta />} />
        <Route path="/gammaread" element={<RazorpayPaymentgamma />} />
        <Route path="/charlieread" element={<RazorpayPaymentcharlie />} />
        <Route path="/payment" element={<PaymentGateway />} />
        {/* Use ProtectedRoute as a regular component */}
        <Route
          path="/protected"
          element={<SubscribedComponent isAuthenticated={isAuthenticated} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/paymentrazor" element={<RazorpayPayment />} />
      </Routes>
    </Router>
  );
}

export default App;
