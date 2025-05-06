// src/components/ManageEventCard.jsx
import React from 'react';

const ManageEventCard = ({ event, onCancel }) => {
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
        src={event.image_url || 'https://cdn-icons-png.flaticon.com/512/4285/4285436.png'}
        alt="Event"
        style={{ width: '150px', height: '150px', borderRadius: '8px', objectFit: 'cover', marginRight: '1.5rem' }}
      />
      <div>
        <p><strong>Name:</strong> {event.name}</p>
        <p><strong>Time:</strong> {event.start_time} - {event.end_time}</p>
        <p><strong>About:</strong> {event.about}</p>
        <p><strong>Category:</strong> {event.category}</p>

        <p
          style={{ color: 'red', textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => onCancel(event.event_id)}
        >
          Cancel Event
        </p>
      </div>
    </li>
  );
};

export default ManageEventCard;
