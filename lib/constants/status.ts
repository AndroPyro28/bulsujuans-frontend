import { cn } from "../utils";

export enum ComplaintStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  ONGOING = "ONGOING",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
}

export function getComplaintStatusClass(status: string) {
  return cn(
    "dark:text-white bg-slate-500", // default
    status === ComplaintStatus.PENDING && "bg-slate-500",
    status === ComplaintStatus.REJECTED && "bg-rose-700",
    status === ComplaintStatus.ACCEPTED && "bg-[#107736]",
    status === ComplaintStatus.ONGOING && "bg-[#15803D]",
    status === ComplaintStatus.COMPLETED && "bg-[#16A34A]"
  );
}
