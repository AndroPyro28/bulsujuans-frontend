"use client";

import React, { Suspense } from "react";
import { Pagination, Role } from "@/types";
import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import { PageLoading } from "@/components/page-loading";
import { RoleActions } from "./components/role-actions";
import { columns } from "./components/columns";
import { DataTable } from "@/components/data-table";

export interface RoleQuery {
  data: Role[];
  success: boolean;
  message: string;
  pagination: Pagination;
}

const RolesClient = () => {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const { data, isPending } = useQueryProcessor<RoleQuery>({
    url: "/roles/list",
    queryParams: {
      page,
      search,
    },
    key: ["roles", page, search],
  });

  return (
    <div className="w-full h-full p-10">
      <div className="flex flex-col gap-4">
        <div className="page-title">
          <h1 className="text-2xl font-semibold">Roles</h1>
        </div>
        <RoleActions search={search} />
      </div>

      <div className="mt-14">
        <DataTable
          columns={columns}
          data={data?.data ?? []}
          pageCount={data?.pagination.totalPages ?? 1}
          currentPage={page}
        />
      </div>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<PageLoading />}>
    <RolesClient />
  </Suspense>
);

export default Page;
