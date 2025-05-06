import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tokenMissing, setTokenMissing] = useState(false);

  useEffect(() => {
    if (!token) {
      setTokenMissing(true);
    }
  }, [token]);

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      alert('Please fill in both fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/reset-password/${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Password updated successfully.');
        navigate('/login');
      } else {
        alert(data.msg || 'Password reset failed.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  if (tokenMissing) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'white',
        fontFamily: 'sans-serif',
        transform: 'translateY(-5%)'
      }}>
        <h1 style={{ color: 'red' }}>Invalid Reset Link</h1>
        <p>You can only reset your password using a valid link sent to your email.</p>
        <button onClick={() => navigate('/login')}>Back to Login</button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'white',
      fontFamily: 'sans-serif',
      transform: 'translateY(-5%)'
    }}>
      <h1>Reset Password</h1>

      <form style={{ width: '440px', textAlign: 'center' }} onSubmit={(e) => e.preventDefault()}>
        {/* New Password */}
        <div style={{ margin: '1rem auto', width: '60%' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', textAlign: 'left' }}>New Password:</label>
          <input
            type="password"
            style={{ width: '100%', padding: '0.5rem' }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {/* Confirm New Password */}
        <div style={{ margin: '1rem auto', width: '60%' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', textAlign: 'left' }}>Confirm New Password:</label>
          <input
            type="password"
            style={{ width: '100%', padding: '0.5rem' }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button type="button" onClick={handleSubmit} style={{ marginTop: '1rem' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;