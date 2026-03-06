import Axios from 'axios';
import { store } from '@/lib/store';
import { clearCredentials } from '@/features/auth/store';

import { API_URL } from '@/config/env';

export const axios = Axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      if (globalThis.window !== undefined) {
        // Clear Redux state so the app doesn't think we are still logged in
        store.dispatch(clearCredentials());

        // Prevent redirect loop if already on login page
        if (!globalThis.location.pathname.includes('/login')) {
          globalThis.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);
