import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import Header from '../components/Header/Header';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const accessToken = await loginUser(username, password);
      login(accessToken);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Incorrect username or password");
    }
  };

  const loginUser = async (username, password) => {
    const response = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        username: username,
        password: password
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login failed response data:", errorData);
      throw new Error('Login failed');
    }

    const data = await response.json();
    console.log("Response Data: ", data);

    if (!data.token || !data.token.access_token) {
      throw new Error('No access token in response');
    }

    return data.token.access_token;
  };

  return (
    <main style={{alignItems:"center"}}>
      <div className="container">
        <Header />
        <div className='login-container'>
          <div className="login-register-header">
            <h2>Sign into your account</h2>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
          <form onSubmit={submitHandler}>
            <input 
              id="username"
              onChange={e => setUsername(e.target.value)}
              value={username}
              placeholder="Username*"
            />
            <input 
              type="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder="Password*"
            />
            <button type="submit" className="login-register-button">Sign in</button>
          </form>
        </div>
      </div>
    </main>
  );
}
