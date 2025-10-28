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

const DATE_FORMAT = `MMM d yyyy`;

export const columns: ColumnDef<{
  id: string;
  status: string;
  victimName: string;
  email: string;
  contactNo: string;
  description: string;
  createdAt: string | Date;
}>[] = [
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
    accessorKey: "victimName",
    accessorFn: (row) => {
      const description = row.description || {};
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
      // const {firstname, middlename, lastname} = row.original.profile
      const victimName = row.original.victimName;
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
    accessorKey: "contactNo",
    accessorFn: (row) => {
      const contactNo = row.contactNo || {};
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
      const contactNo = row.original.contactNo;
      return <div className={`flex items-center`}>{contactNo}</div>;
    },
  },
  {
    accessorKey: "description",
    accessorFn: (row) => {
      const description = row.description || {};
      return description;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Description <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const description = row.original.description;
      return <p className={`  w-40 line-clamp-2`}>{description}</p>;
    },
  },
  {
    accessorKey: "status",
    accessorFn: (row) => {
      const status = row.status;
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
      // const yearEnrolled = row.getValue('') as Date
      const status = row.original.status as string;

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
      const createdAt = row.createdAt;
      return createdAt;
    },
    header: ({ column }) => {
      return (
        <div
          className=" text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.original?.createdAt;
      return (
        <div className="">
          {format(new Date(createdAt || new Date()), DATE_FORMAT)}
        </div>
      );
    },
  },
];
