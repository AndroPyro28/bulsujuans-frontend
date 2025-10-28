import { DataTable } from "@/components/data-table";
import React from "react";
import { columns } from "./columns";
import { Complaint, Pagination } from "@/types";

export type ComplainsListProps = {
  data: Complaint[];
  pagination?: Pagination;
  currentPage: number;
};

export const ComplainsList = ({ data, pagination, currentPage }: ComplainsListProps) => {
  return (
    <div>
      <DataTable columns={columns} data={data} pageCount={pagination?.totalPages ?? 1} currentPage={currentPage} />
    </div>
  );
};
