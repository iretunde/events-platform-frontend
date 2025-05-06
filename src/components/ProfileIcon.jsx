import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the context

const ProfileIcon = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout function from context

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (e) => {
    if (
      !e.target.closest('.profile-container') &&
      !e.target.closest('.dropdown-menu')
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="profile-container" style={{ position: 'relative' }}>
      <div
        onClick={handleProfileClick}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#FFD700',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
        }}
      >
        <span role="img" aria-label="Profile Icon">👤</span>
      </div>

      {dropdownVisible && (
        <div
          className="dropdown-menu"
          style={{
            position: 'absolute',
            right: 0,
            marginTop: '0.5rem',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '5px',
            overflow: 'hidden',
            zIndex: 1000,
            minWidth: '120px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            onClick={() => {
              navigate('/settings');
              setDropdownVisible(false);
            }}
            style={{
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              borderBottom: '1px solid #eee',
              textAlign: 'left',
            }}
          >
            Settings
          </div>
          <div
            onClick={() => {
              logout(); // now using context logout
              navigate('/login');
              setDropdownVisible(false);
            }}
            style={{
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              color: 'red',
              textAlign: 'left',
            }}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
