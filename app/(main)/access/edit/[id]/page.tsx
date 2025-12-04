"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { Access } from "@/types";
import { PageLoading } from "@/components/page-loading";
import EditAccessForm from "./components/edit-access-form";

export interface AccessQuery {
  data: Access;
  success: boolean;
  message: string;
}

const Page = () => {
  const params = useParams();
  const access_id = params.id;

  const accessQuery = useQueryProcessor<AccessQuery>({
    url: `/access/show/${access_id}`,
    key: ["access", access_id],
    options: {
      enabled: !!access_id,
    },
  });
  const access = accessQuery?.data?.data;

  if (accessQuery.isPending || !access) {
    return (
      <div className="w-full h-full p-10">
        <PageLoading />
      </div>
    );
  }

  return (
    <div className="bg-[#eeeeee] w-full h-full flex justify-center items-center p-10">
      <EditAccessForm data={access} />
    </div>
  );
};

export default Page;
