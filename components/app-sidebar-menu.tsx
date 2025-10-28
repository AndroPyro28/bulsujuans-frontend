"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SidebarContent, SidebarSeparator, useSidebar } from "./ui/sidebar";
import { forYouLinks, generaLinks, MenuLinkType } from "@/lib/constants/links";
import { useAuth } from "@/hooks/useAuth";
import AppSidebarLinkGroup from "./app-sidebar-link-group";

const AppSidebarMenu = () => {
  const { state } = useSidebar();
  const { hasPermission, user } = useAuth();
  const [collapsible, setCollapsible] = useState(false);

  const isCollapse = state === "collapsed";

  useEffect(() => {
    setCollapsible(state === "collapsed");
  }, [state]);

  const filterLinksByPermission = useCallback(
    (links: MenuLinkType[]) => links.filter((link) => hasPermission(link.access)),
    [hasPermission]
  );

  const filteredLinks = useMemo(
    () => ({
      general: filterLinksByPermission(generaLinks), //filterLinksByPermission(generaLinks) todo: update seeder and uncomment this code
      forYou: filterLinksByPermission(forYouLinks),
    }),
    [filterLinksByPermission]
  );

  console.log(filteredLinks, user)
  return (
    <SidebarContent>
      {isCollapse && filteredLinks.general.length > 0 && <SidebarSeparator />}
      {filteredLinks.general.length > 0 && <AppSidebarLinkGroup title="Menu" links={filteredLinks.general} />}

      {isCollapse && filteredLinks.general.length > 0 && <SidebarSeparator />}
      {filteredLinks.forYou.length > 0 && <AppSidebarLinkGroup title="For you" links={filteredLinks.forYou} />}
    </SidebarContent>
  );
};

export default AppSidebarMenu;
