"use client";

import { Button } from "@/components/ui/button";

interface NewsListItemProps {
  item: {
    id: number;
    title: string;
    date: string;
    source: string;
    category: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

export default function NewsListItem({ item, isSelected, onClick }: NewsListItemProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`w-full justify-start text-left h-auto p-4 border transition-all duration-200 ${
        isSelected ? "bg-muted border-l-4 border-l-primary" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3 w-full">
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{item.date}</div>
          <h3 className="text-xs md:text-base font-semibold text-foreground mb-2 text-left break-words whitespace-normal">
            {item.title}
          </h3>
          <div className="text-xs text-muted-foreground">{item.source}</div>
        </div>
        <div className="text-primary text-lg flex-shrink-0">→</div>
      </div>
    </Button>
  );
}
