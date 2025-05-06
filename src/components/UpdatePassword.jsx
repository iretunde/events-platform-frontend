import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/feather/eye';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { jwtDecode } from 'jwt-decode';

const UpdatePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to change your password.');
      return;
    }

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match.');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.user_id;

      const response = await fetch(`https://events-platform-backend.onrender.com/api/users/${userId}/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg || 'Failed to update password.');
        return;
      }

      alert('Password updated successfully!');
      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
      navigate('/settings');
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Update Password</h2>

      {/* Current Password */}
      <div style={{ position: 'relative', margin: '1rem auto', width: '60%' }}>
        <label style={{ display: 'block', marginBottom: '0.3rem', textAlign: 'left' }}>Current Password:</label>
        <input
          type={showCurrentPassword ? 'text' : 'password'}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        />
        <span
          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          style={{
            position: 'absolute',
            top: '50%',
            right: '-10px',
            transform: 'translateY(5%)',
            cursor: 'pointer',
            color: 'gray',
          }}
        >
          <Icon icon={showCurrentPassword ? eyeOff : eye} />
        </span>
      </div>

      {/* New Password */}
      <div style={{ margin: '1rem auto', width: '60%' }}>
        <label style={{ display: 'block', marginBottom: '0.3rem', textAlign: 'left' }}>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      {/* Confirm New Password */}
      <div style={{ margin: '1rem auto', width: '60%' }}>
        <label style={{ display: 'block', marginBottom: '0.3rem', textAlign: 'left' }}>Confirm New Password:</label>
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>

      {/* Submit Button */}
      <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>
        Submit
      </button>
    </div>
  );
};

export default UpdatePassword;