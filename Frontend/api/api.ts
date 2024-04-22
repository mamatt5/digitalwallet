import axios from 'axios';
import { Alert } from 'react-native';

const API_BASE_URL = 'http://203.219.65.185:8001';


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

export const registerAccount = async (
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
    console.error('Account Registration error:', error);
    throw error;
  }
};

export const registerMerchant = async (
  email: string,
  password: string,
  phoneNumber: string,
  accountType: string,

  companyName: string,
  abn: string
) => {

  try {

    
    // const response = await axios.post(`${API_BASE_URL}/merchants`, {
    //   email,
    //   password,
    //   phone_number: phoneNumber,
    //   account_type: accountType.toLowerCase(),
    //   company_name: companyName,
    //   ABN: abn
    // });

    // const response = await axios.post(`${API_BASE_URL}/merchants`, {
    //   account: account,
    //   company_name: companyName,
    //   ABN: abn
    // });

    axios.post(`${API_BASE_URL}/merchants`, {
      account: {
  
        email: email,
        password: password,
        phone_number: phoneNumber,
        account_type: accountType,
      },
      company_name: companyName,
      ABN: abn
    }).catch(function (error) {
      Alert.alert(error)
    })

   

    // return response.data;
  } catch (error) {
    console.error('Merchant Registration error:', error);
    throw error;
  }
};

export const registerUser = async (
  email: string,
  password: string,
  phoneNumber: string,
  accountType: string,

  firstName: string,
  lastName: string
) => {

  try {
    const response = await axios.post(`${API_BASE_URL}/users`, {
      email,
      password,
      phone_number: phoneNumber,
      account_type: accountType.toLowerCase(),
      
      first_name: firstName,
      last_name: lastName
    });

    return response.data;
  } catch (error) {
    console.error('User Registration error:', error);
    throw error;
  }
};
