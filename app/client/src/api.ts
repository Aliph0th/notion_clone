import axios from 'axios';
import { AuthSuccessResult, LoginForm, RegistrationForm } from './types';

export const API = axios.create({
   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
   headers: {
      'Content-Type': 'application/json'
   }
});

export const REQUESTS = {
   Register: async (data: RegistrationForm) => {
      const response = await API.post<AuthSuccessResult>('/auth/register', data);
      return response.data;
   },
   Login: async (data: LoginForm) => {
      const response = await API.post<AuthSuccessResult>('/auth/login', data);
      return response.data;
   }
};
