"use client";

import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { Complaint } from "@/types";
import { useParams } from "next/navigation";
import React from "react";
import { ComplaintDetailView } from "./components/complaint-detail-view";
import { is } from "zod/v4/locales";
import { PageLoading } from "@/components/page-loading";

export interface ComplaintQuery {
  data: Complaint;
  success: boolean;
  message: string;
}

const Page = () => {
  const params = useParams();
  const complaint_id = params.id;
  const { data, isPending } = useQueryProcessor<ComplaintQuery>({
    url: `/complaints/show/${complaint_id}`,
    key: ["complaints", complaint_id],
    options: {
      enabled: !!complaint_id,
    },
  });

  const complaint = data?.data;

  if (isPending || !complaint) {
    return (
      <div className="w-full h-full p-10">
        <PageLoading />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-10">
      <ComplaintDetailView complaint={complaint} />
    </div>
  );
};

export default Page;
