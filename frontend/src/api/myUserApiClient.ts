import { User, UserFormData, SignInFormData } from "../types/userTypes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (formData: UserFormData): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Something with wrong with registration");
  }

  return response.json();
};

export const signInUser = async (formData: SignInFormData): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Something with wrong with sign in");
  }

  return response.json();
};

export const getUser = async (): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Profile Information");
  }

  return response.json();
};

export const updateUser = async (userData: UserFormData): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to update User Profile");
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

export const signOutUser = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-out`, {
    method: "POST",
    headers: {
      "Content-Type": "json/application",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};
