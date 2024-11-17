import axios from 'axios';
import { RegistrationForm, User } from './types';

export const API = axios.create({
   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
   headers: {
      'Content-Type': 'application/json'
   }
});

export const REQUESTS = {
   Register: async (data: RegistrationForm) => {
      return await API.post<User>('/auth/register', data);
   }
};
