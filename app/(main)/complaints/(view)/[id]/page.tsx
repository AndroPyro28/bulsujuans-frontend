"use client";

import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { Complaint } from "@/types";
import { useParams } from "next/navigation";
import React from "react";
import { ComplaintDetailView } from "./components/complaint-detail-view";
import { PageLoading } from "@/components/page-loading";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link href="/roles">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Roles
            </Button>
          </Link>

          <Link href={`/complaints/edit/${data.data.id}`}>
            <Button>Edit</Button>
          </Link>
        </div>

        <ComplaintDetailView complaint={complaint} />
      </div>
    </div>
  );
};

export default Page;
