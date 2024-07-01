import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../components/Header/Header';
import { registerAccount } from '../api/api';

import LogoHeader from '../components/LogoHeader/LogoHeader';

const Register = () => {

    const [companyName, setCompanyName] = useState('');
    const [ABN, setABN] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [accountType, setAccountType] = useState('');

    const validateForm = () => {
        if (!firstName || !lastName || !password) {
            setErrorMessage("All fields are required.");
            return false;
        }
        // if (password.length < 6) {
        //     setErrorMessage("Password must be at least 6 characters long.");
        //     return false
        // }
        setErrorMessage('');
        return true;
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (!validateForm()) 
            return;

        
    }

  return (

    <>
        <LogoHeader />

        <div className="container">

            <Header />

            <div className="register-container">

                <div className="login-register-header">
                    <h2>Register for an account</h2>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>

                <form onSubmit={submitHandler}>
                    <input 
                        name="firstName" 
                        type="text" 
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        placeholder='First Name*'
                    />

                    <input 
                        name="lastName" 
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        placeholder='Last Name*'
                    />

                    <input 
                        name="ABN" 
                        type="text"
                        value={ABN}
                        onChange={e => setABN(e.target.value)}
                        placeholder='ABN*'
                    />

                    <input 
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Password*'
                    />

                    <button type="submit" className="login-register-button">Register</button>
                </form>

            </div>
            
        </div>

    </>

  )
}

export default Register