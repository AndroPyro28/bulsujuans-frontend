"use client";

import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { Role } from "@/types";
import { useParams } from "next/navigation";
import React from "react";
import { PageLoading } from "@/components/page-loading";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import RolwDetailView from "./components/role-detail-vew";

export interface RoleQuery {
  data: Role;
  success: boolean;
  message: string;
}

const Page = () => {
  const params = useParams();
  const role_id = params.id;

  const { data, isPending } = useQueryProcessor<RoleQuery>({
    url: `/roles/show/${role_id}`,
    key: ["roles", role_id],
    options: {
      enabled: !!role_id,
    },
  });

  const role = data?.data;

  if (isPending || !role) {
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

          <Link href={`/roles/edit/${role.id}`}>
            <Button>Edit</Button>
          </Link>
        </div>

        {/* Role Detaill*/}
        <RolwDetailView role={role} />
      </div>
    </div>
  );
};

export default Page;
