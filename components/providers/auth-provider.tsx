"use client";

import { apiClient } from "@/hooks/useTanstackQuery";
import { createContext, useEffect, useState } from "react";

export interface AuthUser {
  id: string;
  name: string;
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

const authRoutePatterns = [
  /^\/dashboard(\/.*)?$/, // matches "/dashboard" and anything starting with "/dashboard/"
  /^\/complain(\/.*)?$/,
  /^\/emergency(\/.*)?$/,
  /^\/news(\/.*)?$/,
  /^\/profile(\/.*)?$/,
  /^\/services(\/.*)?$/,
  /^\/tickets(\/.*)?$/,
  /^\/users(\/.*)?$/,
  /^\/complaints(\/.*)?$/,
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isloading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const pathname = window.location.pathname;
      const refreshToken = localStorage.getItem("refresh-token");

      if (!isAuthenticated && refreshToken && authRoutePatterns.some((pattern) => pattern.test(pathname))) {
        try {
          setIsLoading(true);
          console.log("TOKEN REFRESH");
          const res = await apiClient.post("/auth/refresh", { refreshToken });

          if (res.data) {
            await login(res.data.auth, res.data.tokens.accessToken, res.data.tokens.refreshToken);
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          logout();
        }
      }
    };

    fetchUser();
  }, []);

  const hasRole = (role: string) => user?.role.includes(role) ?? false;
  const hasAnyRole = (roles: string[]) => roles.some((r) => user?.role.includes(r)) ?? false;
  const hasAllRoles = (roles: string[]) => roles.every((r) => user?.role.includes(r)) ?? false;
  const hasPermission = (permission: string) => user?.permissions?.includes(permission) ?? false;
  const hasAnyPermission = (permissions: string[]) => permissions.some((p) => user?.permissions?.includes(p)) ?? false;
  const hasAllPermissions = (permissions: string[]) =>
    permissions.every((p) => user?.permissions?.includes(p)) ?? false;

  const login = async (data: AuthUser, access_token: string, refresh_token: string) => {
    setUser(data);
    setIsAuthenticated(true);
    localStorage.setItem("access-token", access_token);
    localStorage.setItem("refresh-token", refresh_token);
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    window.location.href = "/"; // redirect to home or login page
  };

  // if (isloading) {
  //   return <div>Loading...</div>;
  // }

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
