import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { cn } from "../utils";

export enum ComplaintStatus {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  RESOLVED = "RESOLVED",
}

export function getComplaintStatusClass(status: string) {
  return cn(
    "dark:text-white bg-slate-500", // default
    status === ComplaintStatus.PENDING && "bg-slate-500",
    status === ComplaintStatus.REJECTED && "bg-rose-700",
    status === ComplaintStatus.RESOLVED && "bg-[#16A34A]"
  );
}

export const complaintStatusConfig = {
  [ComplaintStatus.PENDING]: {
    color: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800",
    badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    icon: Clock,
    label: "Pending Review",
  },
  [ComplaintStatus.REJECTED]: {
    color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
    badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    icon: CheckCircle2,
    label: "Resolved",
  },
  [ComplaintStatus.RESOLVED]: {
    color: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
    badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    icon: AlertTriangle,
    label: "Rejected",
  },
};
