import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, registerUser, saveToken, getStoredToken, logout as apiLogout } from "../api/auth";

export type AuthUser = { id: string; email: string; name?: string } | null;
type AuthContextType = {
  user: AuthUser;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ladda användardata från localStorage vid start
  useEffect(() => {
    const storedToken = getStoredToken();
    if (storedToken) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        getCurrentUser()
          .then((currentUser) => {
            if (currentUser) {
              setUser(currentUser);
              localStorage.setItem("user", JSON.stringify(currentUser));
            }
          })
          .catch(() => {
            apiLogout();
            setUser(null);
          });
      } catch (err) {
        console.error("Failed to load user from storage", err);
      }
    }
    setIsLoading(false);
  }, []);

  async function login(email: string, password: string) {
    const response = await loginUser({ email, password });
    saveToken(response.token, response.user);
    setUser(response.user);
  }

  async function register(email: string, password: string, name: string) {
    const response = await registerUser({ email, password, name });
    saveToken(response.token, response.user);
    setUser(response.user);
  }

  function logout() {
    apiLogout();
    setUser(null);
  }

  if (isLoading) {
    return <div>Laddar...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}