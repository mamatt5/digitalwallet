import axios from 'axios';
import { Alert } from 'react-native';

const API_BASE_URL = `http://${process.env.LOCAL_IP}:8000`;
const WS_BASE_URL = `ws://${process.env.LOCAL_IP}:8000`;

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
  axios
    .post(`${API_BASE_URL}/auth/register`, {
      company_name: companyName,
      ABN: abn,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      phone_number: phoneNumber,
      account_type: accountType,
    })
    .then(() => Alert.alert(' yay'))
    .catch((error) => {
      Alert.alert(error);
    });
};

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
