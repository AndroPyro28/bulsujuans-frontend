"use client";
import { columns } from "./access-column";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatText } from "@/lib/utils";

import React from "react";
import { Access } from "@/types";
import { RoleAccessActions } from "./rolea-access-actions";

interface RoleAccessListProps {
  access: Access[];
  pageCount: number;
  currentPage: number;
  search: string;
}

const RoleAccessList = ({ access, pageCount, currentPage, search }: RoleAccessListProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="mb-2 text-3xl">Role Access</CardTitle>
          </div>
          <div>
            <RoleAccessActions search={search} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <DataTable
          columns={columns}
          data={access ?? []}
          pageCount={pageCount ?? 1}
          currentPage={currentPage}
          pageKey="ra_page"
        />
      </CardContent>
    </Card>
  );
};

export default RoleAccessList;
