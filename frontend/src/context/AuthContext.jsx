import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await api.get("/users/me");
      setUser({ name: res.data.name, role: res.data.role });
    } catch (error) {
      // Suppress "Session expired" error and 401 errors
      if ((error.response && error.response.status === 401) || error.isAuthSessionExpired) {
        setUser(null);
      } else {
        setUser(null);
      }
    }
  };

  const login = async (name, password) => {
    try {
      await api.post("/users/login", { name, password });
      await checkAuth(); // Auth-Status nach dem Login aktualisieren
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
    } catch (error) {}
    setUser(null);
  };

  // Beim App-Start  prüfen, ob eingeloggt
  useEffect(() => {
    checkAuth();
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
