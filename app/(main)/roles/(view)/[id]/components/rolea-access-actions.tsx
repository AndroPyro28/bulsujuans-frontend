"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useSetQuery } from "@/hooks/use-set-query";
import { useAuth } from "@/hooks/useAuth";

export type RoleAccessActionsProps = {
  search: string;
};

export const RoleAccessActions = ({ search }: RoleAccessActionsProps) => {
  const router = useRouter();
  const auth = useAuth();
  const { setQuery } = useSetQuery();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery({ ra_search: value, page: 1 });
  }, 500);

  const canCreateComplaint = auth.hasPermission("access:create");

  return (
    <div className="flex items-center justify-between gap-4">
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
          onClick={() => router.push("/complaints/submit")}
          disabled={!canCreateComplaint}
          className="cursor-pointer font-light"
        >
          Add Access
        </Button>
      </div>
    </div>
  );
};
