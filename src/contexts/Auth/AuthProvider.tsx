import React, { useState } from "react";
import type {  ReactNode } from "react";

import { AuthContext } from "./AuthContext";
import type { AuthContextType, User } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const Maps = (view: string) => {
    console.log("Navigating to:", view);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: "1",
        username: "cyberlearner",
        email: email,
        fullName: "Cyber Learner",
        institution: "University of Yaounde I",
        region: "Centre",
      };
      setUser(mockUser);
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    username: string,
    email: string,
    password: string,
    fullName?: string,
    institution?: string,
    region?: string
  ) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockUser: User = {
        id: "1",
        username,
        email,
        fullName,
        institution,
        region,
      };
      setUser(mockUser);
    } catch (error) {
      console.error("Signup failed:", error);
      throw new Error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    Maps,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
