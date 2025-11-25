"use client";

import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { Access, Pagination, Role } from "@/types";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { PageLoading } from "@/components/page-loading";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import RolwDetailView from "./components/role-detail-vew";
import RoleAccessList from "./components/role-access-list";

export interface RoleQuery {
  data: Role;
  success: boolean;
  message: string;
}

export interface AccessQuery {
  data: Access[];
  success: boolean;
  message: string;
  pagination: Pagination;
}

const Page = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const role_id = params.id;

  const ra_page = Number(searchParams.get("ra_page")) || 1;
  const ra_search = searchParams.get("ra_search") || "";

  const roleQuery = useQueryProcessor<RoleQuery>({
    url: `/roles/show/${role_id}`,
    key: ["roles", role_id],
    options: {
      enabled: !!role_id,
    },
  });

  const accessQuery = useQueryProcessor<AccessQuery>({
    url: "/access/list",
    queryParams: {
      page: ra_page,
      search: ra_search,
      role_id,
    },
    key: ["access", ra_page, ra_search],
    options: {
      enabled: !!role_id,
    },
  });

  const role = roleQuery?.data?.data;
  const access = accessQuery?.data?.data;

  if (roleQuery.isPending || !role) {
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
        </div>

        {/* Role Detaill*/}
        <RolwDetailView role={role} />

        {/* Role Access  */}
        {access ? (
          <RoleAccessList
            access={access}
            pageCount={accessQuery?.data?.pagination.totalPages ?? 1}
            currentPage={ra_page}
            search={ra_search}
          />
        ) : (
          <PageLoading />
        )}
      </div>
    </div>
  );
};

export default Page;
