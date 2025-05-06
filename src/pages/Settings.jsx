import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import UpdatePassword from '../components/UpdatePassword';
import PersonalDetails from '../components/PersonalDetails'; // updated

const Settings = () => {
  const [activeSetting, setActiveSetting] = useState('update-password');

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <NavBar />
      <div
        style={{
          display: 'flex',
          margin: '2rem auto',
          maxWidth: '900px',
          gap: '2rem',
          padding: '0 1rem',
        }}
      >
        {/* Sidebar */}
        <div style={{ width: '200px', borderRight: '1px solid #ddd' }}>
          <div
            onClick={() => setActiveSetting('update-password')}
            style={{
              cursor: 'pointer',
              padding: '0.5rem',
              borderBottom: activeSetting === 'update-password' ? '2px solid yellow' : 'none',
            }}
          >
            Update Password
          </div>
          <div
            onClick={() => setActiveSetting('personal-details')}
            style={{
              cursor: 'pointer',
              padding: '0.5rem',
              borderBottom: activeSetting === 'personal-details' ? '2px solid yellow' : 'none',
            }}
          >
            Personal Details
          </div>
        </div>

        {/* Panel */}
        <div style={{ flex: 1 }}>
          {activeSetting === 'update-password' && <UpdatePassword />}
          {activeSetting === 'personal-details' && <PersonalDetails />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
