'use client'
import { DataTable } from "@/components/data-table";
import React from "react";
import { columns } from "./columns";
import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { storeComplaintSchema, TComplaintSchema, TStoreComplaintSchema } from "@/schema/complaints";
import { Loader2 } from "lucide-react";
import { Complaint, Pagination } from "@/types";
export type ComplainsListProps = {
  data: Complaint[];
  pagination?: Pagination;
  currentPage: number;
};

export const ComplainsList = ({ data, pagination, currentPage }: ComplainsListProps) => {
    
    const {data: complaints, status} = useQueryProcessor<{data: TComplaintSchema[]}>({
    url: '/complaints/list',
    key: ['complaints'],
  })

  
  if(status == 'pending') {
    return <Loader2 />
  }

  if(status === 'error') {
    return null
  }
    
  return (
    <div>
      <DataTable columns={columns} data={data} pageCount={pagination?.totalPages ?? 1} currentPage={currentPage} />
</div>
)
}