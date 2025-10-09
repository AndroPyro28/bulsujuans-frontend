"use client";
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketIoProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [socket, setSocket] = useState<ReturnType<typeof ClientIO> | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = ClientIO(process.env.NEXT_PUBLIC_BACKEND_URL!, {
      transports: ["websocket"], // optional, skip polling
    });

    socketInstance.on("connect", () => {
      console.log("connected");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("disconnected");
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>;
};
