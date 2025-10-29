"use client";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { TComplaintSchema, TStoreComplaintSchema } from "@/schema/complaints";

const DATE_FORMAT = `MMM d yyyy`;

export const columns: ColumnDef<TComplaintSchema>[] = [
  {
    accessorKey: "id",
    header: () => {
      return <div className="sr-only dark:text-white">Id</div>;
    },
    cell: ({ row }) => {
      const id = row.getValue("id") as string;

      return <div className="sr-only dark:text-white">{id}</div>;
    },
  },
  {
    accessorKey: "name",
    accessorFn: (row) => {
      const description = row.name || {};
      return description;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Victim Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const victimName = row.original.name;
      return <div className={`flex items-center`}>{victimName}</div>;
    },
  },
  {
    accessorKey: "email",
    accessorFn: (row) => {
      const email = row.email || {};
      return email;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const email = row.original.email;
      return <div className={`flex items-center`}>{email}</div>;
    },
  },

  {
    accessorKey: "contact_number",
    accessorFn: (row) => {
      const contactNo = row.contact_number || {};
      return contactNo;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Contact No. <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const contactNo = row.original.contact_number;
      return <div className={`flex items-center`}>{contactNo}</div>;
    },
  },
  {
    accessorKey: "incident_detail",
    accessorFn: (row) => {
      const description = row.incident_detail || {};
      return description;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Incident Detail <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const description = row.original.incident_detail;
      return <p className={`  w-40 line-clamp-2`}>{description}</p>;
    },
  },
  {
    accessorKey: "status",
    accessorFn: (row) => {
      const status = row;
      return status;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const status = row.original.complaint_status;
      return (
        <div className={``}>
          <Badge
            className={cn(
              "dark:text-white bg-slate-500",
              status === "PENDING" && "bg-slate-500",
              (status === "REJECTED" || status === "CANCELLED") &&
                "bg-rose-700",
              status === "ACCEPTED" && "bg-[#107736]",
              status === "COMPLETED" && "bg-[#16A34A]"
            )}
          >
            {status}
          </Badge>{" "}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    accessorFn: (row) => {
      const createdAt = row.date_of_incident;
      return createdAt;
    },
    header: ({ column }) => {
      return (
        <div
          className=" text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date of Incident
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const dateOfIncident = row.original?.date_of_incident;
      return (
        <div className="">
          {format(new Date(dateOfIncident || new Date()), DATE_FORMAT)}
        </div>
      );
    },
  },
];
