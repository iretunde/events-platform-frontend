import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [tokenValid, setTokenValid] = useState(null); // null = loading, true = valid, false = invalid
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await fetch(`https://events-platform-backend.onrender.com/api/users/verify-reset-token/${token}`);
        setTokenValid(res.ok);
      } catch (err) {
        setTokenValid(false);
      }
    };

    validateToken();
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
      const response = await fetch(`https://events-platform-backend.onrender.com/api/users/reset-password/${token}`, {
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

  if (tokenValid === null) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Validating reset link...</p>;
  }

  if (tokenValid === false) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'white',
        fontFamily: 'sans-serif'
      }}>
        <h1 style={{ color: 'red' }}>Invalid Reset Link</h1>
        <p>You can only reset your password using a valid link sent to your email.</p>
        <button onClick={() => navigate('/all-events')}>Go to the homepage</button>
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
      fontFamily: 'sans-serif'
    }}>
      <h1>Reset Password</h1>

      <form style={{ width: '440px', textAlign: 'center' }} onSubmit={(e) => e.preventDefault()}>
        <div style={{ margin: '1rem auto', width: '60%' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', textAlign: 'left' }}>New Password:</label>
          <input
            type="password"
            style={{ width: '100%', padding: '0.5rem' }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div style={{ margin: '1rem auto', width: '60%' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', textAlign: 'left' }}>Confirm New Password:</label>
          <input
            type="password"
            style={{ width: '100%', padding: '0.5rem' }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleSubmit} style={{ marginTop: '1rem' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;