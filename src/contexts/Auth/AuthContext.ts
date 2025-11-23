import { createContext } from "react";

export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  institution?: string;
  region?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    username: string,
    email: string,
    password: string,
    fullName?: string,
    institution?: string,
    region?: string
  ) => Promise<void>;
  logout: () => void;
  Maps: (view: string) => void;
}

// Context creation only - no provider logic
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
