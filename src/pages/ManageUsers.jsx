import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import ManageUsersCard from '../components/ManageUsersCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { role } = useAuth();

  useEffect(() => {
    if (role !== 'owner') {
      navigate('/access-denied');
    }
  }, [role, navigate]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://events-platform-backend.onrender.com/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      } else {
        alert('Failed to fetch users');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <NavBar />

      {loading && (
        <div
          style={{
            height: '4px',
            width: '100%',
            backgroundColor: '#FFD700',
            animation: 'loadingBar 1s infinite',
          }}
        />
      )}

      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center' }}>Manage Users</h1>
        {!loading && (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid black', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem' }}>First Name</th>
                <th style={{ padding: '0.5rem' }}>Surname</th>
                <th style={{ padding: '0.5rem' }}>Email</th>
                <th style={{ padding: '0.5rem' }}>Role</th>
                <th style={{ padding: '0.5rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <ManageUsersCard key={user.user_id} user={user} onRoleChange={fetchUsers} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
