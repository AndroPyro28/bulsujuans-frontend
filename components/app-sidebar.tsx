import React from "react";
import { Sidebar } from "./ui/sidebar";
import AppSidebarMenu from "./app-sidebar-menu";
import AppSidebarHeader from "./app-sidebar-header";
import AppSidebarFooter from "./app-sidebar-footer";
import { Separator } from "./ui/separator";

const AppSidebar = () => {
  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon" className="border-r">
      <AppSidebarHeader />
      <AppSidebarMenu />
      <AppSidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
