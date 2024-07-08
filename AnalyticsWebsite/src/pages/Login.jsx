import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../components/Header/Header';
import LogoHeader from '../components/LogoHeader/LogoHeader';
import LoginRegisterCard from '../components/LoginRegister/LoginRegisterCard';
import { useAuth } from '../contexts/AuthContext';
import '../index.css';
import '../../src/debugging.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [register, setRegister] = useState(false); 
  const API_BASE_URL = `http://${process.env.REACT_APP_LOCAL_IP}:8000`;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const responseData = await loginUser(username, password);
      
      if (responseData.account.account_type !== "merchant") {
        alert("Only merchant accounts are allowed to log in");
        return;
      }

      login(responseData.token.access_token, responseData.account);
      navigate("/");
    } catch (error) {
      alert("Incorrect username or password");
    }
  };

  const loginUser = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
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
      throw new Error('Login failed');
    }

    const data = await response.json();

    if (!data.token.access_token) {
      throw new Error('No access token in response');
    }

    return data;
  };

  const switchToRegisterComponent = () => {
    setRegister(true);
  };

  if (register) {
     (
      <main style={{alignItems: "center"}}>
        <div className="container">
          <LogoHeader />
          <Header />
          <div className='login-container'>
            <div className="login-register-header">
              <h2>Register for an account</h2>
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
            {/* Registration Form */}
            <form>
              <input
                id="reg-username"
                placeholder="Username*"
              />
              <input
                type="password"
                id="reg-password"
                placeholder="Password*"
              />
              <button
                type="submit"
                className="login-register-button"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <LogoHeader />
      <Header />
      
      <LoginRegisterCard />

      <section>
        <h2>Our pricing plans</h2>
        <p>Our plans are always affordable, and it's completely free to get started.</p>
        
        <div className="payment-plans-container">
          <Link to="" className="payment-option-container free">
            <h1>Dip your toe</h1>
            <p>Just getting started? No problem at all! Our free plan will take you a long way.</p>
            <p className="payment-price">Free</p>
            <p>Perfect for growing businesses.</p>
            <ul>
              <li>Secure payment processing</li>
              <li>Basic sales and financial analytics</li>
              <li>Customer insights</li>
              <li>Loyalty points accumulation</li>
              <li>Basic support</li>
            </ul>
          </Link>
          <Link to="" className="payment-option-container paid">
            <h1>Dive right in</h1>
            <p>Ready for the big time? Our paid plan will help you take your business to the next level.</p>
            <p className="payment-price">$15.00/mo</p>
            <p>Perfect for growing businesses that need more advanced tools.</p>
            <ul>
              <li>Everything in Basic Plan</li>
              <li>Advanced analytics and assessment</li>
              <li>Customisable dashboards</li>
              <li>Enhanced security features</li>
              <li>Priority support</li>
            </ul>
          </Link>
        </div>
      </section>

      <section style={{ marginBottom: "5em" }}>
        <h2
          style={{ marginBottom: "30px" }}
        >
          Get started with the PayPath app
          </h2>
        <div className="get-mobile-app-section">
          <input
            placeholder="mobile number"
            style={{ paddingLeft: "20px", width: "200%", borderRadius: "2rem" }}
          />
          <button
            type="button"
            style={{ marginLeft: "20px" }}
          >
            Text me the app
          </button>
        </div>
      </section>
    </>
  );
}
