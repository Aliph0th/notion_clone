import axios from 'axios';
import { AuthSuccessResult, ChangeInfoForm, ChangePasswordForm, LoginForm, RegistrationForm, User } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API = axios.create({
   baseURL: API_URL,
   headers: {
      'Content-Type': 'application/json'
   },
   withCredentials: true
});

API.interceptors.request.use(config => {
   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
   return config;
});

API.interceptors.response.use(null, async error => {
   const originalRequest = error.config;
   if (error.response.status == 401 && error.config && !error.config._retry) {
      originalRequest._retry = true;
      try {
         const response = await axios.post<{ accessToken: string }>(`${API_URL}/auth/refresh`, null, {
            withCredentials: true
         });
         localStorage.setItem('token', response.data.accessToken);
         return API.request(originalRequest);
      } catch (_) {
         console.error('User not authenticated');
      }
   }
   throw error;
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
   },
   ChangePassword: async ({ id, data }: { id: number; data: ChangePasswordForm }) => {
      await API.patch(`/users/${id}/password`, data);
   },
   PatchUser: async ({ id, data }: { id: number; data: ChangeInfoForm }) => {
      const response = await API.patch(`/users/${id}`, data);
      return response.data;
   }
};
