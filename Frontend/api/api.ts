import axios from 'axios';
import { Alert } from 'react-native';
import { LOCAL_IP } from '@env';

const API_BASE_URL = `http://${LOCAL_IP}:8000`;
const WS_BASE_URL = `ws://${LOCAL_IP}:8000`;

export const loginUser = async (email: string, password: string) => {
  try {
    const requestData = new URLSearchParams({
      grant_type: '',
      username: email,
      password,
      client_id: '',
      client_secret: '',
      scope: '',
    });

    const response = await axios.post(`${API_BASE_URL}/auth/login`, requestData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
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
  accountType: string,
  companyName: string,
  abn: string,
  firstName: string,
  lastName: string,
) => {
    
    try {
      const response = await axios
      .post(`${API_BASE_URL}/auth/register`, {
        company_name: companyName,
        ABN: abn,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        phone_number: phoneNumber,
        account_type: accountType,
      })
      return response.data;
    } catch (error) {
      console.error('Registration Error:', error);
      throw error;
    }

    
};

export const getWalletCards = async (walletId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cards/getcardsfromwallet/${walletId}`);
    return response.data;
  } catch (error) {
    console.error('Get Wallet Cards error:', error);
    throw error;
  }
};

export const addCard = async (cardNumber: string, expiryDate: string, cardCVV: string, walletId: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cards/addcard`, {
      card_number: cardNumber,
      card_expiry: expiryDate,
      card_cvv: cardCVV,
      wallet_id: walletId,
    });
    return response.data;
  } catch (error) {
    console.error('Add Card error:', error);
    throw error;
  }
};

export const getUser = async (accountId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/accounts/getuser/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Get User error:', error);
    throw error;
  }
};

export const getMerchant = async (accountId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/accounts/getmerchant/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Get Merchant error:', error);
    throw error;
  }
}

export const getAccountFromEmail = async (email: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/accounts/getaccount/${email}`);
    return response.data
  } catch (error) {
    console.error('Get Account From Email error:', error);
    throw error;
  }
}

export const updatePassword = async (email: string, password: string) => { 
  try {
    const response = await axios.patch(`${API_BASE_URL}/accounts/updatepassword/${email}`, {password});
    return response.data
  } catch (error) {
    console.error('Update Password error:', error);
    throw error;
  }
}



//   // return response.data;
// } catch (error) {
//   console.error('Merchant Registration error:', error);
//   throw error;
//   }
// };

// export const registerUser = async (
//   email: string,
//   password: string,
//   phoneNumber: string,
//   accountType: string,

//   firstName: string,
//   lastName: string
// ) => {

//   try {
//     const response = await axios.post(`${API_BASE_URL}/users`, {
//       email,
//       password,
//       phone_number: phoneNumber,
//       account_type: accountType.toLowerCase(),

//       first_name: firstName,
//       last_name: lastName
//     });

//     return response.data;
//   } catch (error) {
//     console.error('User Registration error:', error);
//     throw error;
//   }
// };


export const validateQRCodeData = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/validate_qr`, data);
    return response.data;
  } catch (error) {
    console.error('Error validating QR code data:', error);
    throw error;
  }
};

export const connectToWebSocket = (relativeUrl: string, onMessage: (data: any) => void) => {
  const ws = new WebSocket(`${WS_BASE_URL}${relativeUrl}`);

  ws.onopen = () => console.log('WebSocket connected');
  ws.onclose = (event) => console.log('WebSocket closed', event);
  ws.onerror = (error) => console.error('WebSocket error', error);

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  return () => {
    ws.close();
  };
};
