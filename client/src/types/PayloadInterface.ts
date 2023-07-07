export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  name: string;
  phone: string;
  confirmPassword: string;
}

export interface EmployerRegisterPayload extends LoginPayload {
  _id: string;
  companyName: string;
  industry: string;
  confirmPassword: string;
  location: string;
  image: string;
  about: string;
}

export interface UserDataPayload {
  _id: any;
  name: string;
  email: string;
  phone: number;
  password?: string;
  isGoogleUser?: boolean;
  isActive?: boolean;
  education?: Array<object>;
  skills?: Array<string>;
  createdAt?: Date;
  image?:string;
}

export interface JobCreationPayload {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  requirements: Array<string>;
  responsibilities: Array<string>;
  salary: number;
  openings: number;
  employerId: string;
}
