import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../components/Header/Header';
import { registerAccount } from '../api/api';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [accountType, setAccountType] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [ABN, setABN] = useState('');
    const [categoryId, setCategoryId] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


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

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!validateForm())
            return;

        try {
            const responseData = await registerAccount(email, password, phoneNumber,
                accountType, companyName, ABN, categoryId, firstName, lastName);
            navigate("/");
        } catch (error) {
            alert(responseData);
        }
    }

    const handleAccountTypeChange = (event) => {
        setAccountType(event.target.value);
    };

    return (
        <main style={{ alignItems: "center" }}>

            <div className="container">

                <Header />

                <div className='register-container'>

                    <div className="login-register-header">
                        <h2>Register for an account</h2>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div>
                            <label>Email:</label>
                            <input
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                name="password" 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Phone Number:</label>
                            <input
                                name="phoneNumber"
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Account Type:</label>
                            <select value={accountType} onChange={handleAccountTypeChange} required>
                                <option value="">Select</option>
                                <option value="user">User</option>
                                <option value="merchant">Merchant</option>
                            </select>
                        </div>
                        {accountType === 'user' && (
                            <>
                                <div>
                                    <label>First Name:</label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Last Name:</label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </>
                        )}
                        {accountType === 'merchant' && (
                            <>
                                <div>
                                    <label>Company Name:</label>
                                    <input
                                        name="companyName"
                                        type="text"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>ABN:</label>
                                    <input
                                        name="abn"
                                        type="text"
                                        value={ABN}
                                        onChange={(e) => setABN(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Category ID:</label>
                                    <input
                                        name="categoryId"
                                        type="number"
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(Number(e.target.value))}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        <button type="submit" className="login-register-button">Register</button>
                    </form>
                </div>

            </div>
        </main>
    )
}

export default Register