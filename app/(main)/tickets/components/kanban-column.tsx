"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanCard } from "./kanban-card";
import { Tickets } from "@/types";
import { ColumnType } from "../constants/type";

interface KanbanColumnProps {
  column: ColumnType;
  tickets: Tickets[];
}

export function KanbanColumn({ column, tickets }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-h-96 bg-slate-100/50 dark:bg-slate-800/30 rounded-xl p-4 border-2 transition-all duration-200 backdrop-blur-sm ${
        isOver
          ? "border-blue-400 dark:border-blue-500 bg-blue-50/30 dark:bg-blue-950/20 shadow-lg shadow-blue-200/50 dark:shadow-blue-950/50"
          : "border-slate-200/50 dark:border-slate-700/50"
      }`}
    >
      <SortableContext items={tickets.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {tickets.length > 0 ? (
            tickets.map((ticket) => <KanbanCard key={ticket.id} ticket={ticket} />)
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm text-slate-400 dark:text-slate-500">No tickets</p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}
