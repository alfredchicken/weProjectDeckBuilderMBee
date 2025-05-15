import { createContext, useContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_URL}/users/me`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUser(data.name);
    } catch {
      setUser(null);
    }
  };

  const login = async (name, password) => {
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Login fehlgeschlagen");
    }

    await checkAuth(); // nach Login sofort prüfen
  };

  const logout = async () => {
    await fetch(`${API_URL}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  useEffect(() => {
    checkAuth(); // beim Start prüfen
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
