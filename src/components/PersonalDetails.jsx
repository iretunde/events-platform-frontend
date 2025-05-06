// src/components/PersonalDetails.jsx
import React, { useEffect, useState } from 'react';

const PersonalDetails = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const decoded = JSON.parse(atob(token.split('.')[1]));
        const userId = decoded.user_id;

        const response = await fetch(`https://events-platform-backend.onrender.com/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserDetails();
  }, []);

  if (!user) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Personal Details</h2>
      <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.1rem' }}>
        <li><strong>First name:</strong> {user.first_name}</li>
        <li><strong>Surname:</strong> {user.last_name}</li>
        <li><strong>Email:</strong> {user.email}</li>
      </ul>
    </div>
  );
};

export default PersonalDetails;
