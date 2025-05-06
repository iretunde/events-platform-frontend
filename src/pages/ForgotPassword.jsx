import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('An email with the reset link has been sent to you.\n\nYou may need to check your junk/spam mail.');
        navigate('/login');
      } else {
        alert(data.msg || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'sans-serif',
      padding: '2rem'
    }}>
      <h1>Forgot Password</h1>
      <p style={{ maxWidth: '400px', textAlign: 'center', marginBottom: '1rem' }}>
        Enter your email and a reset link will be sent to your mailbox.
      </p>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        style={{
          padding: '0.5rem',
          width: '100%',
          maxWidth: '300px',
          marginBottom: '1rem',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />

      <button
        type="button"
        onClick={handleReset}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: 'yellow',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Send Reset Link
      </button>
    </div>
  );
};

export default ForgotPassword;
