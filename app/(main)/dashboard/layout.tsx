"use client";

import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import React from "react";

type DashboardLayoutPops = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutPops) => {
  const { isOpen, handleChange } = useSidebarState();
  return (
    <SidebarProvider defaultOpen={isOpen} onOpenChange={handleChange} open={isOpen}>
      <AppSidebar />
      <main className="w-full min-h-screen flex flex-col">
        <div className="w-full p-2 lg:px-8 sticky top-0 flex justify-between items-center border-b bg-background">
          <SidebarTrigger className="cursor-pointer" />
        </div>
        <div className="p-2 lg:p-8 overflow-auto">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
