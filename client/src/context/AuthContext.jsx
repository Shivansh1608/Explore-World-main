import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const res = await API.get("/auth/me");
          setUser(res.data.data);
        }
      } catch (err) {
        localStorage.removeItem("accessToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    const { user: userData, accessToken } = res.data.data;
    localStorage.setItem("accessToken", accessToken);
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password, bio) => {
    const res = await API.post("/auth/register", { name, email, password, bio });
    const { user: userData, accessToken } = res.data.data;
    localStorage.setItem("accessToken", accessToken);
    setUser(userData);
    return userData;
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch {
      // Ignore
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

