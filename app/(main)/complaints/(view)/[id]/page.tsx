"use client";

import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { Complaint } from "@/types";
import { useParams } from "next/navigation";
import React from "react";
import { ComplaintDetailView } from "./components/complaint-detail-view";

export interface ComplaintQuery {
  data: Complaint;
  success: boolean;
  message: string;
}

const Page = () => {
  const params = useParams();
  const complaint_id = params.id;
  const { data } = useQueryProcessor<ComplaintQuery>({
    url: `/complaints/show/${complaint_id}`,
    key: ["complaints", complaint_id],
    options: {
      enabled: !!complaint_id,
    },
  });

  const complaint = data?.data;

  if (!complaint) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Complaint not found</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-10">
      <ComplaintDetailView complaint={complaint} />
    </div>
  );

  // return (
  //   <div>
  //     <pre>
  //       <code>{JSON.stringify(data?.data, null, 2)}</code>
  //     </pre>
  //   </div>
  // );
};

export default Page;
