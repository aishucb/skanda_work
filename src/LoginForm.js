import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  var isAuthenticated= false;
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to a protected page after successful login
     
      navigate('/protected', { state: { isAuthenticated: true } });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const containerStyle = {
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#012b59',
    color: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '300px', // Adjust the width as needed
    margin: '0 auto', // Center the container horizontally
    
  };

  const labelStyle = {
    display: 'block',
    margin: '10px 0',
    fontSize: '16px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid #b4d445',
    color: 'white',
    fontFamily: 'Poppins, sans-serif',
    outline: 'none',
  };

  const buttonStyle = {
    backgroundColor: '#b4d445',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      <div>
        <label style={labelStyle}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <button onClick={handleLogin} style={buttonStyle}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
