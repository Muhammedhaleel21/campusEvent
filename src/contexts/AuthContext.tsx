import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "super_admin" | "admin" | "student" | "alumni";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId?: string;
  status: "active" | "pending" | "rejected";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (data: Partial<User> & { password: string }) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demo
const MOCK_USERS: (User & { password: string })[] = [
  { id: "1", name: "Dr. Sarah Mitchell", email: "admin@college.edu", password: "Admin123!", role: "super_admin", organizationId: "org1", status: "active" },
  { id: "2", name: "James Park", email: "james@college.edu", password: "Admin123!", role: "admin", organizationId: "org1", status: "active" },
  { id: "3", name: "Emily Chen", email: "emily@student.edu", password: "Student1!", role: "student", status: "active" },
  { id: "4", name: "Alex Kumar", email: "alex@alumni.edu", password: "Alumni01!", role: "alumni", status: "active" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const register = (data: Partial<User> & { password: string }) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name || "",
      email: data.email || "",
      role: data.role || "student",
      organizationId: data.organizationId,
      status: data.role === "admin" ? "pending" : "active",
    };
    setUser(newUser);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
