import axios from "axios";
import { Alert } from "react-native";

const API_BASE_URL = "http://192.168.202.195:8000";

export const loginUser = async (email: string, password: string) => {
  try {
    const requestData = new URLSearchParams({
      grant_type: "",
      username: email,
      password,
      client_id: "",
      client_secret: "",
      scope: "",
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
  lastName: string
) => {
  axios
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
    .then(() => Alert.alert(" yay"))
    .catch(function (error) {
      Alert.alert(error);
    });
};

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
