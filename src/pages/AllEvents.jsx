import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import AllEventsCard from '../components/AllEventsCard';

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [signedUpEventIds, setSignedUpEventIds] = useState([]);
  const [loading, setLoading] = useState(true); // <-- loading state

  useEffect(() => {
    const fetchEventsAndSignups = async () => {
      const token = localStorage.getItem('token');

      try {
        const resEvents = await fetch('http://localhost:5000/api/events');
        const eventsData = await resEvents.json();

        const resSignups = await fetch('http://localhost:5000/api/signups/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const signupsData = await resSignups.json();

        const signedUpIds = signupsData.events.map(ev => ev.event_id);

        setEvents(eventsData.events);
        setSignedUpEventIds(signedUpIds);
      } catch (err) {
        console.error('Failed to fetch events or signups', err);
      } finally {
        setLoading(false); // <-- stop loading after fetch completes
      }
    };

    fetchEventsAndSignups();
  }, []);

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <NavBar />

      {loading && (
        <div style={{ height: '4px', width: '100%', backgroundColor: '#FFD700', animation: 'loadingBar 1s infinite' }} />
      )}

      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center' }}>All Events</h1>
        <ol style={{ maxWidth: '700px', margin: '2rem auto', padding: 0 }}>
          {!loading &&
            events.map(event => (
              <AllEventsCard
                key={event.event_id}
                event={event}
                isAttending={signedUpEventIds.includes(event.event_id)}
                onSignupSuccess={() => setSignedUpEventIds(prev => [...prev, event.event_id])}
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default AllEvents;
