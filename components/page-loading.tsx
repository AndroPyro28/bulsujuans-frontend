import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Loader2 } from "lucide-react";

export function PageLoading() {
  return (
    <Empty className="h-full border border-dashed border-yellow-400 bg-yellow-50/30 dark:bg-yellow-950/10 rounded-2xl py-10 text-center">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="text-yellow-600 dark:text-yellow-400">
          <Loader2 size={48} stroke="1.5" className="animate-spin" />
        </EmptyMedia>
        <EmptyTitle className="text-xl font-semibold text-yellow-700 dark:text-yellow-300">
          Page is loading data
        </EmptyTitle>
        <EmptyDescription className="text-muted-foreground max-w-md mx-auto">
          Please wait a moment while we fetch everything for you...
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          disabled
          className="border-yellow-500 text-yellow-700 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 flex items-center gap-2"
        >
          <Loader2 className="animate-spin h-4 w-4" />
          Loading...
        </Button>
      </EmptyContent>
    </Empty>
  );
}
