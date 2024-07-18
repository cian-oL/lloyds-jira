export type RegistrationFormData = {
  racfid: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
};

export type SignInFormData = {
  racfid: string;
  password: number;
};
