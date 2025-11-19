"use client";
import { ArrowUpDown, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { TComplaintSchema, TStoreComplaintSchema } from "@/schema/complaints";
import { Complaint } from "@/types";
import Link from "next/link";
import { ticketStatusConfig } from "@/lib/constants/status";
import { useAuth } from "@/hooks/useAuth";

const DATE_FORMAT = `MMM d yyyy`;

export const columns: ColumnDef<Complaint>[] = [
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
      const status = row.original.ticket.status as keyof typeof ticketStatusConfig;
      const config = ticketStatusConfig[status] || ticketStatusConfig.PENDING;

      return (
        <div className={``}>
          <Badge className={cn("dark:text-white bg-slate-500", config.color, config.badge)}>{config.label}</Badge>
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
      return <div className="">{format(new Date(dateOfIncident || new Date()), DATE_FORMAT)}</div>;
    },
  },
  {
    id: "actions",
    size: 50,
    minSize: 50,
    cell: ({ row }) => {
      const data = row.original;
      const auth = useAuth();

      const canViewComplaintDetai = auth.hasPermission("complaint:view_detail");
      const canDeleteComplaint = auth.hasPermission("complaint:delete");

      return (
        <div className="flex justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="bg-blue-500/30 text-slate-900 cursor-pointer">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2" disabled={!canViewComplaintDetai}>
                <Eye className="h-4 w-4 text-blue-500" />
                <Link href={`/complaints/${data.id}`}>View details</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="flex items-center gap-2 text-red-600" disabled={!canDeleteComplaint}>
                <Trash2 className="h-4 w-4 text-red-600" />
                <span>Remove details</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
