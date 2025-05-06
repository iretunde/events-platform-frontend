import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import ManageEventCard from '../components/ManageEventCard';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { role } = useAuth();

  useEffect(() => {
    if (role === 'customer') {
      navigate('/access-denied');
    }
  }, [role, navigate]);

  const fetchEvents = async () => {
    const token = localStorage.getItem('token');
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const user_id = decoded.user_id;

    try {
      const res = await fetch(`https://events-platform-backend.onrender.com/api/events?created_by=${user_id}`);
      const data = await res.json();
      setEvents(data.events);
    } catch (err) {
      console.error('Failed to fetch events', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (event_id) => {
    const confirm = window.confirm('Are you sure you want to cancel this event?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`https://events-platform-backend.onrender.com/api/events/${event_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert('Event cancelled successfully');
        fetchEvents();
      } else {
        const data = await res.json();
        alert(data.msg || 'Failed to cancel event');
      }
    } catch (err) {
      console.error(err);
      alert('Error cancelling event');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <NavBar />

      {loading && (
        <div style={{ height: '4px', width: '100%', backgroundColor: '#FFD700', animation: 'loadingBar 1s infinite' }} />
      )}

      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center' }}>Manage Events</h1>
        <ol style={{ maxWidth: '700px', margin: '2rem auto', padding: 0 }}>
          {!loading && events.length === 0 ? (
            <p style={{ textAlign: 'center' }}>You haven't created any events.</p>
          ) : (
            events.map(event => (
              <li key={event.event_id} style={{ listStyle: 'none' }}>
                <ManageEventCard event={event} onCancel={handleCancel} />
              </li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
};

export default ManageEvents;
