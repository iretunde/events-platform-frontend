// NavBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileIcon from './ProfileIcon';
import { jwtDecode } from 'jwt-decode';

const NavBar = () => {
  let role = null;

  // Decode the token from localStorage to get the role
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }

  const baseLinks = [
    { path: '/all-events', label: 'All Events' },
    { path: '/my-events', label: 'My Events' },
  ];

  const adminLinks = [
    { path: '/create-event', label: 'Create Event' },
    { path: '/manage-events', label: 'Manage Events' },
  ];

  const ownerLinks = [
    { path: '/manage-users', label: 'Manage Users' },
  ];

  let allLinks = [...baseLinks];
  if (role === 'admin' || role === 'owner') allLinks = [...allLinks, ...adminLinks];
  if (role === 'owner') allLinks = [...allLinks, ...ownerLinks];

  return (
    <nav className="navbar">
      <div className="nav-links">
        {allLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <ProfileIcon />
    </nav>
  );
};

export default NavBar;
