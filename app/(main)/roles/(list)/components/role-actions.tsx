"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useSetQuery } from "@/hooks/use-set-query";
import { useAuth } from "@/hooks/useAuth";

export type RoleActionsProps = {
  search: string;
};

export const RoleActions = ({ search }: RoleActionsProps) => {
  const router = useRouter();
  const auth = useAuth();
  const { setQuery } = useSetQuery();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery({ search: value, page: 1 });
  }, 500);

  const canCreateComplaint = auth.hasPermission("roles:create");

  return (
    <div className="flex items-center justify-between">
      <div className="search">
        <input
          type="text"
          defaultValue={search}
          onChange={(e) => debouncedSearch(e.target.value)}
          placeholder="Search..."
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="buttons">
        <Button
          variant={"default"}
          onClick={() => router.push("/roles/create")}
          disabled={!canCreateComplaint}
          className="cursor-pointer font-light"
        >
          Create Role
        </Button>
      </div>
    </div>
  );
};
