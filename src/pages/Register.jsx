import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('https://events-platform-backend.onrender.com/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registration successful! Please log in.');
        navigate('/login');
      } else {
        alert(data.msg || 'Registration failed');
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'white',
      fontFamily: 'sans-serif',
    }}>
      <h1>Register</h1>

      <form style={{ width: '250px', textAlign: 'center' }} onSubmit={(e) => e.preventDefault()}>
        {/* First Name Field */}
        <div style={{ position: 'relative', marginBottom: '1rem', width: '92%' }}>
          <input
            name="first_name"
            type="text"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        {/* Surname Field */}
        <div style={{ position: 'relative', marginBottom: '1rem', width: '92%' }}>
          <input
            name="last_name"
            type="text"
            placeholder="Surname"
            value={formData.last_name}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        {/* Email Field */}
        <div style={{ position: 'relative', marginBottom: '1rem', width: '92%' }}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        {/* Password Field */}
        <div style={{ position: 'relative', marginBottom: '1rem', width: '92%' }}>
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem' }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              top: '50%',
              right: '-10px',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              fontSize: '1.2rem',
              color: 'gray',
            }}
          >
            <Icon icon={showPassword ? eyeOff : eye} />
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          style={{ width: '100%', marginTop: '0.07rem' }}
        >
          Submit
        </button>
      </form>

      {/* Links */}
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <span>Already have an account? </span>
        <Link to="/login" className="highlight-link">Sign in now!</Link>
        <br />
        <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Register;