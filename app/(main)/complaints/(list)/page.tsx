"use client";

import React, { Suspense } from "react";
import { UserActions } from "./components/user-actions";
import { ComplainsList } from "./components/complains-list";
import { Complaint, Pagination } from "@/types";
import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import { PageLoading } from "@/components/page-loading";

export interface ComplaintQuery {
  data: Complaint[];
  success: boolean;
  message: string;
  pagination: Pagination;
}

const ComplaintsClient = () => {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const complainant_id = user?.id;

  const { data } = useQueryProcessor<ComplaintQuery>({
    url: "/complaints/list",
    queryParams: {
      page,
      search,
      complainant_id,
    },
    key: ["complaints", page, search, complainant_id],
  });

  return (
    <div className="w-full h-full p-10">
      <div className="flex flex-col gap-4">
        <div className="page-title">
          <h1 className="text-2xl font-semibold">My complaints</h1>
        </div>
        <UserActions search={search} />
      </div>

      <div className="mt-14">
        <ComplainsList data={data?.data || []} pagination={data?.pagination} currentPage={page} />
      </div>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<PageLoading />}>
    <ComplaintsClient />
  </Suspense>
);

export default Page;
