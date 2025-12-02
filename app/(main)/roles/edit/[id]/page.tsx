"use client";

import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { Role } from "@/types";
import { PageLoading } from "@/components/page-loading";
import EditRoleForm from "./components/edit-role-form";

export interface RoleQuery {
  data: Role;
  success: boolean;
  message: string;
}

const Page = () => {
  const params = useParams();
  const role_id = params.id;

  const roleQuery = useQueryProcessor<RoleQuery>({
    url: `/roles/show/${role_id}`,
    key: ["roles", role_id],
    options: {
      enabled: !!role_id,
    },
  });

  const role = roleQuery?.data?.data;

  if (roleQuery.isPending || !role) {
    return (
      <div className="w-full h-full p-10">
        <PageLoading />
      </div>
    );
  }

  return (
    <div className="bg-[#eeeeee] w-full h-full flex justify-center items-center p-10">
      <EditRoleForm data={role} />
    </div>
  );
};

export default Page;
