import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

import Header from '../components/Header/Header';

import { loginUser } from '../api/api';


export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

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
                        {/* <Link>Forgot Password?</Link> */}
                        <button type="submit" className="login-register-button">Sign in</button>
                    </form>
                </div>

            </div>

        </main>
    );
}