import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from './config/firebase';

const auth = getAuth(app);

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useEffect(() => {
    // Load the PayPal SDK and render the PayPal button
    const CLIENT_ID = 'ARTsilP9iTm9yB9d8WPRvaoQZuhs8B6y7lISMcYDpQ5u3BQuQXCyU2JxWncOSq_ltnoz8awhZtRrf5fc'; // Replace with your PayPal client ID
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`;
    script.async = true;

    script.onload = () => {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: 'Your Product Description',
                amount: {
                  currency_code: 'USD',
                  value: '10.00', // Replace with the actual amount
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            console.log('Payment completed:', details);
            // Mark payment as completed
            setPaymentCompleted(true);
          });
        },
      }).render('#paypal-button-container');
    };

    document.body.appendChild(script);
  }, []);

  const handleSignUp = async () => {
    try {
      // Attempt to sign up the user using the provided email and password
      await createUserWithEmailAndPassword(auth, email, password);
      
      // Redirect to a protected page after successful signup and payment
      if (paymentCompleted) {
        navigate('/protected');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>

      {/* PayPal button */}
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default SignUp;
