import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import Message from '../Message/Message.jsx';

import { TextField, FormControl, InputLabel, OutlinedInput, IconButton, 
    InputAdornment, Button, Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import '../../index.css'

const LoginRegisterCard = () => {

    const { login } = useAuth();

    // login states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // register states
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [accountType, setAccountType] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [ABN, setABN] = useState('');
    const [categoryId, setCategoryId] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // track states for login/register view
    const [heading, setHeading] = useState("Sign into your account");
    const [question, setQuestion] = useState("Don't have an account?");
    const [linkTitle, setLinkTitle] = useState("Register");
    const [buttonTitle, setButtonTitle] = useState("Sign in");

    // states to send sanitised feedback for user
    const [initialMessage, setInitialMessage] = useState("");
    const [initialMessageType, setInitialMessageType] = useState("");

    // track whether user is seeing the register component or login component
    const [isRegister, setIsRegister] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    const validateForm = () => {
        if (!firstName || !lastName || !password) {
            setInitialMessage("All fields are required");
            setInitialMessageType("error");
            return false;
        }
        // if (password.length < 6) {
        //     setErrorMessage("Password must be at least 6 characters long.");
        //     return false
        // }
        return true;

    };

    const loginUser = async (username, password) => {

        try {
            console.log('Attempting login with:', { username, password });
    
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
                console.error('Login failed:', errorData);
                throw new Error('Login failed');
            }
    
            const data = await response.json();
            console.log('Login successful:', data);
    
            if (!data.token.access_token) {
                console.error('No access token in response');
                throw new Error('No access token in response');
            }
    
            return data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
        
    };

    const switchComponent = () => {

        if (linkTitle === "Register") {
            setIsLogin(false);
            setIsRegister(true);

            setHeading("Register for an account");
            setQuestion("Already have an account?");
            setLinkTitle("Sign in");
            setButtonTitle("Register");

        } else if (linkTitle === "Sign in") {
            setIsRegister(false);
            setIsLogin(true);

            setHeading("Sign into your account");
            setQuestion("Don't have an account?");
            setLinkTitle("Register");
            setButtonTitle("Sign in");
        };
    };

    const handleLoginOrRegister = async (e) => {

        e.preventDefault()

        // Clear the initial message and message type
        setInitialMessage("");
        setInitialMessageType("");

        if (buttonTitle === "Register") {

            if (!validateForm())
                return;
    
            try {
                const responseData = await registerAccount(email, password, phoneNumber,
                    accountType, companyName, ABN, categoryId, firstName, lastName);

                navigate("/");

                console.log("register response data:", responseData);

            } catch (error) {
                alert(responseData);

            }

        } else if (buttonTitle === "Sign in") {

            console.log("username:", username, "password:", password);

            try {

                console.log("accessing loginUser function....")

                const responseData = await loginUser(username, password);

                console.log("login responseData:", responseData)

                if (responseData.account.account_type !== "merchant") {
                    setInitialMessage("Only merchant accounts are allowed to log in");
                    setInitialMessageType("error");
                    return;

                }

                login(responseData.token.access_token, responseData.account);

                navigate("/");

            } catch(error) {
                setInitialMessage("Incorrect username or password");
                setInitialMessageType("error")

            } 
        }
    };

    const handleAccountTypeChange = (event) => {
        setAccountType(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  return (

    <div className='login-container'>
                    
        <div className="login-register-header">
        
            <h2>{heading}</h2>

            <p>{question}
                <span 
                    style={{
                            cursor: "pointer",
                            color: "violet",
                        }}
                    onClick={() => switchComponent()}
                >
                    {/* add whitespace before link */}
                    {" " + linkTitle} 
                </span>
            </p>
            
        </div>

        <Message initialMessage={initialMessage} initialMessageType={initialMessageType} />
                    
        <form onSubmit={handleLoginOrRegister}>
        
            { isLogin && (
                <>
                    <TextField
                        required
                        id="reg-username"
                        label="Username"
                        variant="outlined"
                        aria-label="Username"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        fullWidth
                        className="custom-text-field"
                        InputProps={{ className: 'custom-input' }}
                        InputLabelProps={{ className: 'custom-label' }}
                    />
                </>
            )}

            { isRegister && (
                <>
                    <TextField
                        required
                        id="email"
                        label="Email"
                        variant="outlined"
                        aria-label="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        fullWidth
                        sx={{}}
                        className="custom-text-field"
                    />

                    <TextField
                        required
                        id="phone-number"
                        label="Phone number"
                        variant="outlined"
                        aria-label="phone number"
                        onChange={e => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                        fullWidth
                        sx={{}}
                        className="custom-text-field"
                    />
                </>
            )}

            <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="reg-password">Password *</InputLabel>
                <OutlinedInput
                    required
                    id="reg-password"
                    label="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="custom-text-field"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment
                            position="end"
                            className="custom-input-adornment"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: "10px",
                                height: '100%',
                                '& .MuiIconButton-root': {
                                    padding: 0, 
                                },
                            }}
                        >
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={togglePasswordVisibility}
                                edge="end"
                                className="custom-icon-button"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 0,
                                    '&:hover': {
                                        backgroundColor: 'transparent', 
                                    },
                                    '&:focus': {
                                        backgroundColor: 'transparent', 
                                        outline: 'none',
                                        boxShadow: 'none',
                                    },
                                }}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>

            { isRegister && (
                <>
                    <select 
                        aria-label="account type"
                        value={accountType} 
                        onChange={handleAccountTypeChange} 
                        style={{marginBottom:"20px"}}
                        required
                    >
                        <option value="">Select account type</option>
                        <option value="user">User</option>
                        <option value="merchant">Merchant</option>
                    </select>

                    {accountType === "user" && (
                        <>
                            <TextField
                                required
                                id="first-name"
                                label="First name"
                                variant="outlined"
                                aria-label="first name"
                                onChange={e => setFirstName(e.target.value)}
                                value={firstName}
                                fullWidth
                                sx={{}}
                                className="custom-text-field"
                            />
                            <TextField
                                required
                                id="last-name"
                                label="Last Name"
                                variant="outlined"
                                aria-label="last name"
                                onChange={e => setLastName(e.target.value)}
                                value={lastName}
                                fullWidth
                                sx={{}}
                                className="custom-text-field"
                            />
                            
                        </>
                    )}

                    {accountType === "merchant" && (
                        <>
                            <TextField
                                required
                                id="company-name"
                                label="Company Name"
                                variant="outlined"
                                aria-label="company name"
                                onChange={e => setCompanyName(e.target.value)}
                                value={companyName}
                                fullWidth
                                sx={{}}
                                className="custom-text-field"
                            />

                            <TextField
                                required
                                id="ABN"
                                label="ABN"
                                variant="outlined"
                                aria-label="ABN"
                                onChange={e => setABN(e.target.value)}
                                value={ABN}
                                fullWidth
                                sx={{}}
                                className="custom-text-field"
                            />

                            <div className="form-structure">
                                <label>Category ID:</label>
                                <input
                                    required
                                    name="categoryId"
                                    type="number"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(Number(e.target.value))}
                                    style={{marginBottom:"0"}}
                                    className="categoryID"
                                />
                            </div>

                        </>
                    )}
                    
                </>
            )}

            <Button
                type="submit"
                variant="contained"
                // color="primary"
                className="login-register-button"
                sx={{ 
                    backgroundColor: 'var(--primary)',
                    padding: "10px 0",
                    borderRadius: "5px",
                    textTransform: "none",
                    fontSize: "1em",
                    '&:hover': {
                        backgroundColor: 'var(--secondary)', // Change this to the desired hover color
                    }
                 }}
              >
                {buttonTitle}
              </Button>
            
        </form>
    </div>

  )
}

export default LoginRegisterCard