import { useEffect } from 'react';
import { useUser } from '../state/user.atom';
import { ApiClient } from './api-client';

const url = import.meta.env.VITE_API_URL;
if (!url) throw new Error('Please provide URL');
const api = new ApiClient(url);

export function useApi() {
  const [user] = useUser();

  // Sync app state with API client
  useEffect(() => {
    api.setToken(user?.token ?? null);
  }, [user?.token]);

  return api;
}
