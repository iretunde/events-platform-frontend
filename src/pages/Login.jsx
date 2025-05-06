import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useAuth } from '../context/AuthContext'; // import the context
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // use login function from context

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/all-events');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://events-platform-backend.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, data.user.role); // update both localStorage and context
        console.log("ROLE:", data.user.role)
        navigate('/all-events');
      } else {
        alert(data.msg || 'Login failed');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
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
      <h1>Login</h1>

      <form style={{ width: '250px', textAlign: 'center' }} onSubmit={(e) => e.preventDefault()}>
        {/* Email Field */}
        <div style={{ position: 'relative', marginBottom: '1rem', width: '92%' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        {/* Password Field */}
        <div style={{ position: 'relative', marginBottom: '1rem', width: '92%' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          style={{
            width: '100%',
            marginTop: '0.1rem',
            backgroundColor: 'yellow',
            border: 'none',
            padding: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
      </form>

      {/* Links */}
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <span>First time here? </span>
        <Link to="/register" className="highlight-link">Register now!</Link>
        <br />
        <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;