import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
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
        404 - Page Not Found
      </h1>
      <p style={{ marginBottom: '1.5rem' ,marginTop: '0.4rem' }}>
        The page you’re looking for doesn’t exist.
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

export default NotFound;
