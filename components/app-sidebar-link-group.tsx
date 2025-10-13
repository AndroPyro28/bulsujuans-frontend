import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MenuLinkType } from "@/lib/constants/links";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type AppSidebarLinkGroupProps = {
  title: string;
  links: MenuLinkType[];
  withBadge?: boolean;
};
const AppSidebarLinkGroup = ({ title, links, withBadge = false }: AppSidebarLinkGroupProps) => {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {links.map((item) => {
            const isActive = pathname === item.url; // ✅ Simple active check
            return (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url} className="flex items-center gap-2 w-full">
                  <SidebarMenuButton isActive={isActive} className="w-full justify-start cursor-pointer">
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>

                    {withBadge && (
                      <SidebarMenuBadge className="p-1 rounded-full bg-yellow-300 text-slate-800">24</SidebarMenuBadge>
                    )}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
export default AppSidebarLinkGroup;
