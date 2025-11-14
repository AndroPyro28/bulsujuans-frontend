import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { cn } from "../utils";

export enum TicketStatus {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  RESOLVED = "RESOLVED",
}

export const ticketStatusConfig = {
  [TicketStatus.PENDING]: {
    color: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800",
    badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    icon: Clock,
    label: "Pending Review",
  },
  [TicketStatus.RESOLVED]: {
    color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
    badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    icon: CheckCircle2,
    label: "Resolved",
  },
  [TicketStatus.REJECTED]: {
    color: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
    badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    icon: AlertTriangle,
    label: "Rejected",
  },
};
