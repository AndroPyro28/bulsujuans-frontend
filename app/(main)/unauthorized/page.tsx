"use client";

import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="h-full p-10">
      <Empty className="h-full border border-dashed border-red-400 bg-red-50/30 dark:bg-red-950/10 rounded-2xl p-10 text-center">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="text-red-600 dark:text-red-400">
            <ShieldAlert size={48} stroke="1.5" />
          </EmptyMedia>
          <EmptyTitle className="text-xl font-semibold text-red-700 dark:text-red-300">Unauthorized Access</EmptyTitle>
          <EmptyDescription className="text-muted-foreground max-w-md mx-auto">
            You don't have permission to view this page. Please contact your administrator or return to the homepage.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-red-500 text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
            onClick={() => router.push("/profile")}
          >
            Go to Profile
          </Button>
          <Button
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
