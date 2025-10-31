import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Hammer } from "lucide-react";

export function UnderDevelopment() {
  return (
    <Empty className="h-full border border-dashed border-yellow-400 bg-yellow-50/30 dark:bg-yellow-950/10 rounded-2xl py-10 text-center">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="text-yellow-600 dark:text-yellow-400">
          <Hammer size={48} stroke="1.5" />
        </EmptyMedia>
        <EmptyTitle className="text-xl font-semibold text-yellow-700 dark:text-yellow-300">
          This feature is currently under development
        </EmptyTitle>
        <EmptyDescription className="text-muted-foreground max-w-md mx-auto">
          We're working hard to bring this section to life. Check back soon for updates!
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          className="border-yellow-500 text-yellow-700 hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
        >
          Coming Soon
        </Button>
      </EmptyContent>
    </Empty>
  );
}
