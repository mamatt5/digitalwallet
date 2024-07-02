import axios from 'axios';
import { LOCAL_IP } from '@env';

const API_BASE_URL = `http://${LOCAL_IP}:8000`;
const WS_BASE_URL = `ws://${LOCAL_IP}:8001`;

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
        email,
        password,
        phone_number: phoneNumber,
        account_type: accountType,
      });
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

export const getCard = async (cardId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cards/getcard/${cardId}`);
    return response.data;
  } catch (error) {
    console.error('Get Card error:', error);
    throw error;
  }
}

export const fetchLoyaltyCards = async (walletId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/loyaltycards/getcardsfromwallet/${walletId}`);
    return response.data;
  } catch (error) {
    console.error('Get Wallet Loyalty Cards error:', error);
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

export const deleteCardById = async (cardId: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/cards/deletecard/${cardId}`);
    return response.data;
  } catch (error) {
    console.error('Delete Card error:', error);
    throw error;
  }
}

export const addLoyaltyCard = async (cardNumber: string, expiryDate: string, memberName: string, walletId: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/loyaltycards/addcard`, {
      card_number: cardNumber,
      card_expiry: expiryDate,
      member_name: memberName,
      wallet_id: walletId,
    });
    return response.data;
  } catch (error) {
    console.error('Add Loyalty Card error:', error);
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
};

export const getAllMerchants = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/accounts/getmerchants`);
    return response.data;
  } catch (error) {
    console.error('Get all Merchants error:', error);
    throw error;
  }
};


export const getAllMerchantsAndVouchers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/accounts/getmerchantandvouchers`);
    return response.data;
  } catch (error) {
    console.error('Get all Vouchers error:', error);
    throw error;
  }
};

export const AddVoucherToUser = async(userId: string, voucherId: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/accounts/addVoucher/${userId}/${voucherId}`);
    return response.data;
  } catch (error) {
    console.error('Add voucher error:', error);
    throw error;
  }
}

export const getVouchersForUser = async(userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/vouchers/getvouchersforuser/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Add voucher error:', error);
    throw error;
  }
}

export const deleteVoucherForUser = async(voucherId: string, userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/vouchers/getvouchersforuser/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Add voucher error:', error);
    throw error;
  }
}


export const getAccount = async (accountId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/accounts/getaccount/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Get Account error:', error);
    throw error;
  }
};

export const getAccountFromEmail = async (email: string) => {
  try {
    
    const response = await axios.get(`${API_BASE_URL}/accounts/getaccountfromemail/${email}`);
    return response
  } catch (error) {
    console.error('Get Account From Email error:', error);
    throw error;
  }
};

export const mobileExist = async (mobileNumber: string) => {
  try {
    
    const response = await axios.get(`${API_BASE_URL}/accounts/getaccountfrommobile/${mobileNumber}`);
    return response
  } catch (error) {
    console.error('Get Mobile error:', error);
    throw error;
  }
}

export const updatePassword = async (email: string, password: string) => { 
  try {
    const response = await axios.patch(`${API_BASE_URL}/accounts/updatepassword/${email}`, { password });
    return response.data;
  } catch (error) {
    console.error('Update Password error:', error);
    throw error;
  }
};

export const getTransactions = async (cardId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/gettransactions/${cardId}`);
    return response.data;
  } catch (error) {
    console.error('Get Transactions by card error:', error);
    throw error;
  }
};

export const getTransactionsByWallet = async (walletId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/gettransactions/wallet/${walletId}`);
    return response.data;
  } catch (error) {
    console.error('Get Transactions by wallet error:', error);
    throw error;
  }
}

export const getTransactionsBySender = async (walletId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/gettransactions/sender/${walletId}`);
    return response.data;
  } catch (error) {
    console.error('Get Transactions by sender error:', error);
    throw error;
  }
}

export const getItems = async (transactionId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/getitems/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error('Get Items error:', error);
    throw error;
  }
}

export const checkTransaction = async (transaction_ref: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/checktransaction/${transaction_ref}`);
    return response.data;
  } catch (error) {
    console.error('Check Transaction error:', error);
    throw error;
  }
}

export const addTransaction = async (transaction) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/transactions/addtransaction`, transaction);
    return response.data;
  } catch (error) {
    console.error('Add Transaction error:', error.response.data);
    throw error;
  }
};

export const addAPPoints = async (transaction) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/transactions/addpoints`, transaction);
    return response.data;
  } catch (error) {
    console.error('Add AP points error:', error.response.data);
    throw error;
  }
};

export const getAPPoints = async (walletId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wallets/getpoints/${walletId}`);
    return response.data;
  } catch (error) {
    console.error('Get AP points error:', error);
    throw error;
  }
}

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
