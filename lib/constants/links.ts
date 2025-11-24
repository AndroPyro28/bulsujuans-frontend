import {
  HandPlatter,
  House,
  LayoutDashboard,
  LucideIcon,
  Newspaper,
  Siren,
  Tickets,
  UserCog,
  UserLock,
} from "lucide-react";
import { Permission } from "./permissions";

export type MenuLinkType = {
  title: string;
  url: string;
  icon: LucideIcon;
  access: string;
};

export const generaLinks: MenuLinkType[] = [
  {
    title: "Home",
    url: "/dashboard",
    icon: House,
    access: Permission.DASHBOARD_VIEW_LIST,
  },
  {
    title: "Services",
    url: "/services",
    icon: HandPlatter,
    access: Permission.SERVICES_VIEW_LIST,
  },
  {
    title: "News",
    url: "/news",
    icon: Newspaper,
    access: Permission.NEWS_VIEW_LIST,
  },
  {
    title: "Emergency",
    url: "/emergency",
    icon: Siren,
    access: Permission.EMERGENCY_VIEW_LIST,
  },
  {
    title: "Tickets",
    url: "/tickets",
    icon: Tickets,
    access: Permission.TICKETS_VIEW_LIST,
  },

  {
    title: "Users",
    url: "/users",
    icon: LayoutDashboard,
    access: Permission.USERS_VIEW_LIST,
  },
  {
    title: "Roles",
    url: "/roles",
    icon: UserLock,
    access: Permission.ROLES_VIEW_LIST,
  },
];

export const forYouLinks: MenuLinkType[] = [
  {
    title: "Profile",
    url: "/profile",
    icon: UserCog,
    access: Permission.PROFILE_VIEW_PROFILE,
  },
  {
    title: "My Complaints",
    url: "/complaints",
    icon: Tickets,
    access: Permission.COMPLAINT_VIEW_LIST,
  },
];
