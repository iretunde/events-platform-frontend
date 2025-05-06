// ManageUsersCard.jsx
import React from 'react';

const ManageUsersCard = ({ user, onRoleChange }) => {
  const handleRoleChange = async (newRole) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://events-platform-backend.onrender.com/api/users/${user.user_id}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newRole }),
      });

      if (res.ok) {
        alert('User role updated successfully');
        onRoleChange(); // refresh user list
      } else {
        const data = await res.json();
        alert(data.msg || 'Failed to update role');
      }
    } catch (err) {
      console.error('Error updating role:', err);
      alert('An error occurred');
    }
  };

  return (
    <tr style={{ borderBottom: '1px solid #ddd' }}>
      <td style={{ padding: '0.5rem' }}>{user.first_name}</td>
      <td style={{ padding: '0.5rem' }}>{user.last_name}</td>
      <td style={{ padding: '0.5rem' }}>{user.email}</td>
      <td style={{ padding: '0.5rem' }}>{user.role}</td>
      <td style={{ padding: '0.5rem' }}>
        {user.role === 'customer' ? (
          <span
            style={{ color: 'green', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => handleRoleChange('admin')}
          >
            Give admin privileges
          </span>
        ) : user.role === 'admin' ? (
          <span
            style={{ color: 'red', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => handleRoleChange('customer')}
          >
            Remove admin privileges
          </span>
        ) : null}
      </td>
    </tr>
  );
};

export default ManageUsersCard;
