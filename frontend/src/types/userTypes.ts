export type UserFormData = {
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

export type User = {
  _id: string;
  racfid: string;
  password: string;
  firstName: string;
  lastName: string;
};
