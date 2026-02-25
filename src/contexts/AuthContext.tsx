import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "user" | "admin";

interface AuthUser {
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback((email: string, password: string): boolean => {
    // Mock login: admin@diwali.com / admin123 => admin, anything else => user
    if (email === "admin@diwali.com" && password === "admin123") {
      setUser({ email, role: "admin" });
      return true;
    }
    if (password.length >= 4) {
      setUser({ email, role: "user" });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
};
