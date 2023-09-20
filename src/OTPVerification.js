import React, { useState } from 'react';
import { initializeApp } from 'firebase/app'; // Import initializeApp from firebase/app
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'; // Import specific methods from firebase/auth
import { getAuth } from 'firebase/auth'; // Import getAuth from firebase/auth
import firebaseConfig from './firebaseConfig'; // Import your Firebase config

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the auth object

function OTPVerification() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleSendOTP = () => {
    const appVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    });

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmation) => {
        setConfirmationResult(confirmation);
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
      });
  };

  const handleVerifyOTP = () => {
    confirmationResult
      .confirm(verificationCode)
      .then((userCredential) => {
        // OTP verification successful
        const user = userCredential.user;
        console.log('OTP verification successful:', user);
      })
      .catch((error) => {
        console.error('Error verifying OTP:', error);
      });
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <div>
        <label>Enter Phone Number:</label>
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <button onClick={handleSendOTP}>Send OTP</button>

      {confirmationResult && (
        <div>
          <label>Enter OTP:</label>
          <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
          <button onClick={handleVerifyOTP}>Verify OTP</button>
        </div>
      )}
    </div>
  );
}

export default OTPVerification;
