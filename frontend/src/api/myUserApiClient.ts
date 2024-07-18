import { RegistrationFormData, SignInFormData } from "../types/userTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (formData: RegistrationFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Something with wrong with registration");
  }

  return response.json();
};

export const signInUser = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Something with wrong with sign in");
  }

  return response.json();
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};
