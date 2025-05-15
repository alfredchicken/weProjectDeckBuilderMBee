import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/users/me`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Not logged in");
        const data = await response.json();
        setUser(data.name);
      } catch {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return { user };
};
