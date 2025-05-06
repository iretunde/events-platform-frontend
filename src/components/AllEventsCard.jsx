import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AllEventsCard = ({ event, isAttending, onSignupSuccess }) => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/signups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ event_id: event.event_id }),
      });

      if (response.ok) {
        alert('Event added successfully');
        onSignupSuccess(event.event_id);
        navigate('/my-events');
      } else {
        const data = await response.json();
        alert(data.msg || 'Failed to sign up');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while signing up');
    }
  };

  return (
    <li
      style={{
        display: 'flex',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '1rem',
        marginBottom: '1.5rem',
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
      }}
    >
      <img
        src={event.image_url}
        alt="Event"
        style={{ width: '150px', height: '150px', borderRadius: '8px', objectFit: 'cover', marginRight: '1.5rem' }}
      />
      <div>
        <p><strong>Name:</strong> {event.name}</p>
        <p><strong>Date:</strong> {event.date.split('T')[0]}</p>
        <p><strong>Time:</strong> {event.start_time} - {event.end_time}</p>
        <p><strong>About:</strong> {event.about}</p>
        <p><strong>Category:</strong> {event.category}</p>
        <p>
          <strong>Attending:</strong>{' '}
          {isAttending ? (
            <span className="attending">Added to my events</span>
          ) : (
            <span className="not-attending" onClick={handleSignup}>
              Not currently attending. Click here to add to my events
            </span>
          )}
        </p>
      </div>
    </li>
  );
};

export default AllEventsCard;
