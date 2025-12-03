"use client";

import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Access } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useConfirm } from "@/hooks/use-confirm";
import { TUpdateAccessSchema } from "@/schema/access";
import { useMutateProcessor } from "@/hooks/useTanstackQuery";
import { useParams } from "next/navigation";

export const columns: ColumnDef<Access>[] = [
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
      const name = row.name || {};
      return name;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Access Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const victimName = row.original.name;
      return <div className={`flex items-center`}>{victimName}</div>;
    },
  },
  {
    accessorKey: "desc",
    accessorFn: (row) => {
      const desc = row.desc || {};
      return desc;
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
      const email = row.original.desc;
      return <div className={`flex items-center`}>{email}</div>;
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
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.original?.createdAt;
      return <div className="">{formatDate(createdAt)}</div>;
    },
  },

  {
    id: "actions",
    size: 50,
    minSize: 50,
    cell: ({ row }) => {
      const params = useParams();

      const data = row.original;
      const auth = useAuth();

      const [DeleteRoleConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this record. This action is permanent and cannot be undone."
      );

      const canDeleteAccess = auth.hasPermission("access:delete");
      const role_id = params.id;

      const deleteAccess = useMutateProcessor<TUpdateAccessSchema, unknown>({
        url: `/access/destroy_ra/${data.id}?role_id=${role_id}`,
        key: ["access"],
        method: "DELETE",
      });

      const onDelete = async () => {
        const confirmed = await confirm();

        if (confirmed) {
          deleteAccess.mutate(
            {},
            {
              onSuccess: () => {
                console.log("Access deleted successfully");
              },
            }
          );
        }
      };

      return (
        <div className="flex justify-center items-center">
          <DeleteRoleConfirmDialog />
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="bg-blue-500/30 text-slate-900 cursor-pointer">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="flex items-center gap-2 text-red-600"
                disabled={!canDeleteAccess}
                onClick={onDelete}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
                <span>Remove</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
