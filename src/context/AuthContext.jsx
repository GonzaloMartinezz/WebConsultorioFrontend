import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "mc_user";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = ({ nombre, apellido, email }) => {
    const data = { nombre, apellido, email };
    setUser(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return ctx;
}

