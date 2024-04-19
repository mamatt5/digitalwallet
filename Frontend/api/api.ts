import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.110:8000';


export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (
  email: string,
  password: string,
  phoneNumber: string,
  accountType: string
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      email,
      password,
      phone_number: phoneNumber,
      account_type: accountType.toLowerCase(),
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
