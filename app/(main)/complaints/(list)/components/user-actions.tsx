"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useSetQuery } from "@/hooks/use-set-query";
import { useAuth } from "@/hooks/useAuth";

export type UserActionsProps = {
  search: string;
};

export const UserActions = ({ search }: UserActionsProps) => {
  const router = useRouter();
  const auth = useAuth();
  const { setQuery } = useSetQuery();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery({ search: value, page: 1 });
  }, 500);

  const canCreateComplaint = auth.hasPermission("complaint:create");

  return (
    <div className="flex items-center justify-between">
      <div className="search">
        <input
          type="text"
          defaultValue={search}
          onChange={(e) => debouncedSearch(e.target.value)}
          placeholder="Search complaints..."
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
          Create complain
        </Button>
      </div>
    </div>
  );
};
