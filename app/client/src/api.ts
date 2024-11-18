import axios from 'axios';
import { AuthSuccessResult, LoginForm, RegistrationForm, User } from './types';

export const API = axios.create({
   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
   headers: {
      'Content-Type': 'application/json'
   }
});

API.interceptors.request.use(config => {
   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
   return config;
});

export const REQUESTS = {
   Register: async (data: RegistrationForm) => {
      const response = await API.post<AuthSuccessResult>('/auth/register', data);
      return response.data;
   },
   Login: async (data: LoginForm) => {
      const response = await API.post<AuthSuccessResult>('/auth/login', data);
      return response.data;
   },
   GetMyself: async () => {
      const response = await API.get<User>('/users/myself');
      return response.data;
   }
};
