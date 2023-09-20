import React, { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';

function Form({ onNext }) {
  // Define state for form inputs
  const [aadharCard, setAadharCard] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');

  // State to track OTP verification
  const [otpVerification, setOTPVerification] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Implement form validation logic for Aadhar, mobile, and other fields

    if (aadharCard && mobileNumber && field1 && field2 && field3) {
      // If the mandatory fields are filled, proceed to OTP verification
      setOTPVerification(true);
    } else {
      // Display an error message for missing fields
      alert('Please fill in all mandatory fields.');
    }
  };

  // Handle OTP submission
  // Handle OTP submission
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
  
    // Implement OTP verification logic here
    try {
      const response = await fetch('/verifyOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: '', // Replace with the actual OTP input
          mobileNumber: '', // Replace with the actual mobile number
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        // OTP verification successful, proceed to the next step
  
        // Prepare the data to be pushed to Firebase
        const userData = {
          aadharCard,
          mobileNumber,
          field1,
          field2,
          field3,
          // Add other optional fields here if needed
        };
  
        // Get a reference to the Firebase database
        const db = getDatabase();
        const userRef = ref(db, 'users'); // 'users' is the name of the database node where you want to store the data
  
        // Push the user data to Firebase
        set(userRef, userData)
          .then(() => {
            // Data has been successfully stored in Firebase
            onNext(); // Proceed to the next step
          })
          .catch((error) => {
            console.error('Error storing data in Firebase:', error);
            alert('An error occurred while storing data. Please try again later.');
          });
      } else {
        // Display an error message for OTP verification failure
        alert('OTP verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('An error occurred while verifying OTP. Please try again later.');
    }
  };
  
  return (
    <div>
      {!otpVerification ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Aadhar Card Number (Numerical and Unique):</label>
            <input
              type="text"
              value={aadharCard}
              onChange={(e) => setAadharCard(e.target.value)}
            />
          </div>
          <div>
            <label>Mobile Number (Indian 10-digit):</label>
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div>
            <label>Mandatory Field 1:</label>
            <input
              type="text"
              value={field1}
              onChange={(e) => setField1(e.target.value)}
            />
          </div>
          <div>
            <label>Mandatory Field 2:</label>
            <input
              type="text"
              value={field2}
              onChange={(e) => setField2(e.target.value)}
            />
          </div>
          <div>
            <label>Mandatory Field 3:</label>
            <input
              type="text"
              value={field3}
              onChange={(e) => setField3(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        // OTP Verification Form
        <form onSubmit={handleOTPSubmit}>
          <div>
            <label>Enter OTP:</label>
            <input type="text" />
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
}

export default Form;
