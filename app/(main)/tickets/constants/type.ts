import { AlertTriangle, BookOpen, CheckCircle2, Clock, Loader, Search } from "lucide-react";

export enum TicketStatus {
  PENDING = "PENDING",
  UNDER_REVIEW = "UNDER_REVIEW",
  BEING_STUDIED = "BEING_STUDIED",
  BEING_PROCESS = "BEING_PROCESS",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
}

export type ColumnType = "PENDING" | "RESOLVED" | "BEING_PROCESS" | "BEING_STUDIED" | "UNDER_REVIEW" | "REJECTED";

export const ticketStatusConfig = {
  [TicketStatus.PENDING]: {
    color: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    icon: Clock,
    label: "Pending",
    status_color: "bg-amber-500",
  },

  [TicketStatus.UNDER_REVIEW]: {
    color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    icon: Search,
    label: "Under Review",
    status_color: "bg-blue-500",
  },

  [TicketStatus.BEING_STUDIED]: {
    color: "bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800",
    badge: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    icon: BookOpen,
    label: "Being Studied",
    status_color: "bg-indigo-500",
  },

  [TicketStatus.BEING_PROCESS]: {
    color: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800",
    badge: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    icon: Loader,
    label: "In Process",
    status_color: "bg-purple-500",
  },

  [TicketStatus.RESOLVED]: {
    color: "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    icon: CheckCircle2,
    label: "Resolved",
    status_color: "bg-emerald-500",
  },

  [TicketStatus.REJECTED]: {
    color: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
    badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    icon: AlertTriangle,
    label: "Rejected",
    status_color: "bg-red-500",
  },
};

export const COLUMNS: ColumnType[] = [
  "PENDING",
  "UNDER_REVIEW",
  "BEING_STUDIED",
  "BEING_PROCESS",
  "RESOLVED",
  "REJECTED",
];

export const COLUMN_LABELS: Record<ColumnType, string> = {
  PENDING: "Pending",
  UNDER_REVIEW: "Under Review",
  BEING_STUDIED: "Being Studied",
  BEING_PROCESS: "Being Process",
  RESOLVED: "Resolved",
  REJECTED: "Rejected",
};
