import { useEffect, useState } from "react";
import api from "/../../api/api";

const API_URL = import.meta.env.VITE_API_URL;

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get(`/users/me`);
        setUser(response.data.name);
      } catch {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return { user };
};
