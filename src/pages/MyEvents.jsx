import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import MyEventCard from '../components/MyEventCard';

const MyEvents = () => {
  const [events, setEvents] = useState([]);


  const fetchUserEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/signups/user', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setEvents(data.events);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const handleRemove = async (event_id) => {
    const token = localStorage.getItem('token');
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const user_id = decoded.user_id;

    try {
      const res = await fetch(`http://localhost:5000/api/signups/${event_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id }),
      });

      if (res.ok) {
        alert('Event deleted successfully from My Events');
        fetchUserEvents(); // re-fetch events after deletion
      } else {
        alert('Could not remove event');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserEvents();
  }, []);

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <NavBar />
      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center' }}>My Events</h1>
        <ol style={{ maxWidth: '600px', margin: '2rem auto' }}>
          {events.length === 0 ? (
            <p style={{ textAlign: 'center' }}>You have not signed up for any events.</p>
          ) : (
            events.map((event, index) => (
              <li key={event.event_id} style={{ listStyle: 'none' }}>
                <MyEventCard event={event} onRemove={handleRemove} />
              </li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
};

export default MyEvents;
