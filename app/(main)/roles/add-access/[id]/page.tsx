"use client";

import React from "react";
import { Option } from "@/types";
import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { useParams } from "next/navigation";
import { PageLoading } from "@/components/page-loading";
import AddAccessForm from "./components/create-add-access-form";

type accessOptionQuery = {
  data: Option[];
  success: boolean;
  message: string;
};

const Page = () => {
  const params = useParams();
  const role_id = params.id as string;

  const { data: accessOptions, isLoading: isAccessOptionsLoading } = useQueryProcessor<accessOptionQuery>({
    url: "/access/options",
    key: ["access-options", role_id],
    queryParams: {
      role_id,
    },
  });

  if (isAccessOptionsLoading || !accessOptions) {
    return (
      <div className="w-full h-full p-10">
        <PageLoading />
      </div>
    );
  }

  return (
    <div className="bg-[#eeeeee] w-full h-full flex justify-center items-center p-10">
      <AddAccessForm accessOptions={accessOptions.data} role_id={role_id} />
    </div>
  );
};

export default Page;
