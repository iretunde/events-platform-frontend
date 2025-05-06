import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: 'white',
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ color: 'red', fontSize: '2rem', marginBottom: '1rem' }}>
        Access Denied
      </h1>
      <p style={{ marginBottom: '1.5rem', marginTop: '0.3rem' }}>
        You are not authorised to view this page.
      </p>
      <Link to="/all-events" style={{
        color: 'blue',
        textDecoration: 'underline',
        fontWeight: 'bold'
      }}>
        Return to homepage
      </Link>
    </div>
  );
};

export default AccessDenied;
