import React, { useState } from 'react';
import { generateGoogleCalendarLink } from '../utils/calendar';

const MyEventCard = ({ event, onRemove }) => {
  const [addedToCalendar, setAddedToCalendar] = useState(event.added_to_calendar);

  const handleAddToCalendar = async () => {
    const token = localStorage.getItem('token');

    try {
      console.log(event)
      const calendarUrl = generateGoogleCalendarLink(event);
      window.open(calendarUrl, '_blank'); // open Google Calendar link

      // Then mark as added on your backend
      const response = await fetch(`https://events-platform-backend.onrender.com/api/signups/${event.event_id}/calendar`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAddedToCalendar(true);
      } else {
        const data = await response.json();
        alert(data.msg || 'Failed to update calendar status');
      }
    } catch (err) {
      console.error(err);
      alert('Error while updating calendar status');
    }
  };

  return (
    <div className="event-card">
      <img src={event.image_url} alt="Event" className="event-image" />
      <div className="event-details">
        <p><strong>Name:</strong> {event.name}</p>
        <p><strong>Date:</strong> {event.date.split('T')[0]}</p>
        <p><strong>Time:</strong> {event.start_time} - {event.end_time}</p>
        <p><strong>About:</strong> {event.about}</p>
        <p><strong>Category:</strong> {event.category}</p>
        <p>
          <strong>Added to calendar:</strong>{' '}
          {addedToCalendar ? (
            <span style={{ color: 'green' }}>Yes</span>
          ) : (
            <span
              style={{ color: 'red', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={handleAddToCalendar}
            >
              Add to your calendar
            </span>
          )}
        </p>
        <p
          style={{ color: 'red', textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => onRemove(event.event_id)}
        >
          Remove from My Events
        </p>
      </div>
    </div>
  );
};

export default MyEventCard;
