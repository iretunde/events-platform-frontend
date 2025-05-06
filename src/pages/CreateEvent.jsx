import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavBar from '../components/NavBar';

const CreateEvent = () => {
  const navigate = useNavigate();
  const {role} = useAuth()
    
  useEffect(() => {
    if (role === 'customer'){
      navigate('/access-denied')
    }
  })

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [about, setAbout] = useState('');
  const [category, setCategory] = useState('');

  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    times.push(`${String(hour).padStart(2, '0')}:00`);
    times.push(`${String(hour).padStart(2, '0')}:30`);
  }

  const categories = [
    'Community',
    'Education',
    'Networking',
    'Tech',
    'Health',
    'Finance',
    'Entertainment',
    'Sports',
    'Art',
    'Food',
    'Music',
    'Business',
    'Career',
    'Science',
    'Literature',
    'Politics',
    'Environment',
    'Travel',
    'Culture',
    'Fashion',
    'Wellness',
    'Fitness',
    'Philosophy',
    'Spirituality',
    'Workshops',
    'Conferences',
    'Fundraising',
    'Volunteering',
    'Gaming',
    'Startup',
    'Parenting',
    'Animals',
    'Photography',
    'Anime'
  ];

  const handleSubmit = async () => {
    if (!name || !date || !startTime || !endTime || !about || !category) {
      alert('Please fill in all the fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('https://events-platform-backend.onrender.com/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          date,
          start_time: startTime,
          end_time: endTime,
          about,
          category,
        }),
      });

      if (response.ok) {
        alert('Event created successfully');
        navigate('/manage-events');
      } else {
        const data = await response.json();
        alert(data.msg || 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('An error occurred while creating the event');
    }
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <NavBar />
      <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem' }}>
        <h1 style={{ textAlign: 'center' }}>Create Event</h1>

        <div style={{ marginBottom: '1rem' }}>
          <label>Event Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '96%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ width: '96%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Start Time:</label>
          <select
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          >
            <option value="">Select Start Time</option>
            {times.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>End Time:</label>
          <select
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          >
            <option value="">Select End Time</option>
            {times.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>About (Please include the address if applicable):</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={4}
            style={{ width: '96%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          style={{ width: '100%', padding: '0.75rem', backgroundColor: 'yellow', border: 'none', cursor: 'pointer' }}
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;
