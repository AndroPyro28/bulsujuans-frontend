"use client";

import { useRouter, usePathname } from "next/navigation";

export const useSetQuery = () => {
  const router = useRouter();
  const pathname = usePathname();

  const setQuery = (updates: Record<string, string | number | undefined>) => {
    // 🟢 Use window.location.search for the latest URL state
    const current = typeof window !== "undefined" ? window.location.search : "";
    const params = new URLSearchParams(current);

    // merge updates
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "") params.delete(key);
      else params.set(key, String(value));
    });

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { setQuery };
};
