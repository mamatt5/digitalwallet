import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../index.css';
import '../../src/debugging.css';

import Header from '../components/Header/Header';
import LogoHeader from '../components/LogoHeader/LogoHeader';

import { loginUser } from '../api/api';

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);

    // const setBearer = props.bearer
    // const setWrapper = props.setWrapper
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()

        try{
            const responseData = await loginUser(username, password);
            navigate("/");
        } catch(error){
            alert("Incorrect username or password");
        }
    }
    
    const switchToRegisterComponent = () => {
        e.preventDefault()
        setRegister = true;
    }

    // should i create a login component card and then 
    // pass in props to change what various buttons or links say?


    return (
        <>
            <LogoHeader />

            <div className="container">

                <Header />

                <div className='login-container'>
                    
                    <div className="login-register-header">
                        <h2>Sign into your account</h2>
                        {/* <p>Don't have an account? <Link to="/register">Register</Link></p> */}
                        <p>Don't have an account? <span onClick={() => switchToRegisterComponent()}>Register</span></p>
                    </div>

                    {/* { register && ()

                    } */}
                    
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
                        {/* <Link>Forgot Password?</Link> */}
                        <button 
                            type="submit" 
                            className="login-register-button"
                            style={{marginTop: "0"}}
                        >
                            Sign in
                        </button>
                    </form>

                </div>

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
                            <p>Ready for the big time? Our paid plan will help you
                            take your business to the next level.</p>
                            
                            <p className="payment-price">$15.00/mo</p>
                            <p>Perfect for growing businesses that need more advanced tools.</p>
                            <ul>
                                <li>Everything in Basic Plan</li>
                                <li>Advanced analytics and reporting</li>
                                <li>Customisable dashboards</li>
                                <li>Enhanced security features</li>
                                <li>Priority support</li>
                            </ul>
                        </Link>

                    </div>

                </section>

                <section style={{marginBottom: "7em"}}>
                    
                    <h2>Get started with the PayPath app</h2>

                    <div className="get-mobile-app-section">
                        <input 
                            placeholder="mobile number"
                            style={{paddingLeft: "20px", width: "200%"}}
                        />
                        <button
                            type="button"
                            style={{marginLeft: "20px"}}
                        >
                            Text me the app
                        </button>
                    </div>

                </section>

            </div>

        </>

    );
}