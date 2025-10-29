'use client'
import { DataTable } from "@/components/data-table";
import React from "react";
import { columns } from "./columns";
import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { storeComplaintSchema, TComplaintSchema, TStoreComplaintSchema } from "@/schema/complaints";
import { Loader2 } from "lucide-react";

export const ComplainsList = () => {

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
      <DataTable columns={columns} data={complaints?.data || []} />
    </div>
  );
};
