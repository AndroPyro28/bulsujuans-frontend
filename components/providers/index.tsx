"use client";
import React from "react";
import QueryProvider from "./query-provider";
// import ModalProvider from "./ModalProvider";
import { ThemeProvider } from "next-themes";
import { SocketIoProvider } from "./socket-provider";

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
            {/* <SessionProvider> */}
            {/* <ModalProvider /> */}
            {children}
            {/* </SessionProvider> */}
          </QueryProvider>
        </SocketIoProvider>
      </ThemeProvider>
    </>
  );
};

export default Provider;
