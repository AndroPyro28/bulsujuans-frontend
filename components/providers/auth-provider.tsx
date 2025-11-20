"use client";

import { apiClient } from "@/hooks/useTanstackQuery";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { PageLoading } from "../page-loading";
import { forYouLinks, generaLinks } from "@/lib/constants/links";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

type AuthContextType = {
  isLoading: boolean;
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
  isLoading: false,
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

const authorizedRoutePatterns = [...generaLinks, ...forYouLinks];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  // ----------------------------
  // FETCH USER USING REFRESH-TOKEN
  // ----------------------------
  useEffect(() => {
    const fetchUser = async () => {
      const refreshToken = localStorage.getItem("refresh-token");

      if (!refreshToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await apiClient.post("/auth/refresh", {
          refreshToken,
        });

        const data = res.data;

        if (!data || !data.auth || !data.tokens?.accessToken || !data.tokens?.refreshToken) {
          await logout();
        } else {
          await login(data.auth, data.tokens.accessToken, data.tokens.refreshToken);

          /* if current pathname is existing in the authorizedRoutePatterns redirect it eslse redirect to profile */
          const route = authorizedRoutePatterns.find((r) => pathname.startsWith(r.url));

          if (route) {
            router.replace(pathname);
          } else {
            router.replace("/profile");
          }
        }

        setTimeout(() => {
          setIsLoading(false);
        }, 700);
      } catch (error) {
        logout();
      }
    };

    fetchUser();
  }, []);

  // ---------------------------------
  // ROUTE PROTECTION
  // ---------------------------------
  useEffect(() => {
    if (isAuthenticated && pathname !== "/") {
      // check route permissions
      const route = authorizedRoutePatterns.find((r) => pathname.startsWith(r.url));

      if (route) {
        const requiredPermission = route.access;

        if (!hasPermission(requiredPermission)) {
          router.replace("/unauthorized");
        }
      }
    }
  }, [isLoading, isAuthenticated, pathname, user]);

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
    router.push("/");
  };

  if (isLoading && pathname !== "/") {
    return <PageLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
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
