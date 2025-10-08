"use client";
import React from "react";
import QueryProvider from "./query-provider";
// import ModalProvider from "./ModalProvider";
import { ThemeProvider } from "next-themes";
import { SocketIoProvider } from "./socket-provider";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "./auth-provider";
const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="bulsujuans"
      >
        <SocketIoProvider>
          <QueryProvider>
            <AuthProvider>
              {/* <SessionProvider> */}
              {/* <ModalProvider /> */}
              {children}
              <Toaster position="top-center" />
              {/* </SessionProvider> */}
            </AuthProvider>
          </QueryProvider>
        </SocketIoProvider>
      </ThemeProvider>
    </>
  );
};

export default Provider;
