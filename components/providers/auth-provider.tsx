"use client";

import { apiClient } from "@/hooks/useTanstackQuery";
import { createContext, useEffect, useState } from "react";

interface AuthUser {
  id: string;
  email: string;
  role: string;
  permissions: string[];
}

type AuthContextType = {
  isAuthenticated: boolean;
  user?: AuthUser | null;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasAllRoles: (roles: string[]) => boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  login: (authUser: AuthUser, access_token: string, refresh_token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  hasRole: () => false,
  hasAnyRole: () => false,
  hasAllRoles: () => false,
  hasPermission: () => false,
  hasAnyPermission: () => false,
  hasAllPermissions: () => false,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isloading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated) {
        try {
          setIsLoading(true);
          const res = await apiClient.get("/api/auth/refresh-token");
          setUser(res.data.user);
          setIsAuthenticated(true);
          localStorage.setItem("access_token", JSON.stringify(res.data.accessToken));
          localStorage.setItem("refresh_token", JSON.stringify(res.data.refreshToken));
        } catch (error) {
          console.error("Failed to refresh token:", error);
          logout();
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUser();
  }, []);

  const hasRole = (role: string) => user?.role.includes(role) ?? false;
  const hasAnyRole = (roles: string[]) => roles.some((r) => user?.role.includes(r)) ?? false;
  const hasAllRoles = (roles: string[]) => roles.every((r) => user?.role.includes(r)) ?? false;
  const hasPermission = (permission: string) => user?.permissions.includes(permission) ?? false;
  const hasAnyPermission = (permissions: string[]) => permissions.some((p) => user?.permissions.includes(p)) ?? false;
  const hasAllPermissions = (permissions: string[]) => permissions.every((p) => user?.permissions.includes(p)) ?? false;

  const login = async (data: AuthUser, access_token: string, refresh_token: string) => {
    setUser(data);
    setIsAuthenticated(true);
    localStorage.setItem("access_token", JSON.stringify(access_token));
    localStorage.setItem("refresh_token", JSON.stringify(refresh_token));
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/"; // redirect to home or login page
  };

  if (isloading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        hasRole,
        hasAnyRole,
        hasAllRoles,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
