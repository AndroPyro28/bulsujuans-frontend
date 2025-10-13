import React from "react";

import { SidebarHeader, SidebarMenu, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import Logo from "./../public/assets/app-logo.png";
import Image from "next/image";

const AppSidebarHeader = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center justify-center gap-2">
            <Image src={Logo} alt="Logo" width={70} height={70} className="rounded-full border" />
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default AppSidebarHeader;
