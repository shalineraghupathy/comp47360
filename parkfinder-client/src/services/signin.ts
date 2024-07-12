import axios from "axios";

const API_BASE_URL = "http://34.245.187.188:8080/api/v1/auth";

// Define the request types
interface UserRegisterRequest {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
}

interface UserSignInRequest {
  userEmail: string;
  userPassword: string;
}

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// Define the response types
interface UserRegisterResponse {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  message: string;
}

interface UserSignInResponse {
  token: string;
  message: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
}

// API calls
export const registerUser = async (
  request: UserRegisterRequest
): Promise<UserRegisterResponse> => {
  const response = await axios.post<UserRegisterResponse>(
    `${API_BASE_URL}/registerUser`,
    request
  );
  return response.data;
};

export const userSignIn = async (
  request: UserSignInRequest
): Promise<UserSignInResponse> => {
  const response = await axios.post<UserSignInResponse>(
    `${API_BASE_URL}/signin`,
    request
  );
  return response.data;
};

export const resendVerificationEmail = async (email: string): Promise<void> => {
  await axios.post(`${API_BASE_URL}/resendVerificationEmail`, null, {
    params: { email },
  });
};

export const forgotPassword = async (email: string): Promise<void> => {
  await axios.post(`${API_BASE_URL}/forgotPassword`, null, {
    params: { email },
  });
};

export const resetPassword = async (
  request: ResetPasswordRequest
): Promise<void> => {
  await axios.post(`${API_BASE_URL}/resetPassword`, request);
};
