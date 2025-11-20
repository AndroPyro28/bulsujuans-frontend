"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, Tickets } from "@/types";
import { KanbanColumn } from "./kanban-column";
import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { COLUMN_LABELS, COLUMNS, ticketStatusConfig } from "../constants/type";

export interface TicketsQuery {
  data: Tickets[];
  success: boolean;
  message: string;
  pagination: Pagination;
}

export function KanbanBoard() {
  const { data, isLoading } = useQueryProcessor<TicketsQuery>({
    url: "/tickets/list",
    queryParams: {},
    key: ["tickets"],
  });

  const tickets = data?.data || [];

  if (isLoading) {
    return <KanbanSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-8">
      <div className="w-full">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 text-balance">Ticket Management</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Manage and track your support tickets across different statuses
          </p>
        </div>

        {/* Kanban Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLUMNS.map((column) => {
            const columnTickets = tickets.filter((t) => t.status === column);
            const colors = ticketStatusConfig[column];

            return (
              <div key={column} className="flex flex-col h-full">
                <div className="mb-4">
                  <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-lg ${colors.badge}`}>
                    <h2 className="text-sm font-semibold">{COLUMN_LABELS[column]}</h2>
                    <span className="text-xs font-bold px-2 py-1 bg-white dark:bg-slate-800 rounded">
                      {columnTickets.length}
                    </span>
                  </div>
                </div>
                <KanbanColumn column={column} tickets={columnTickets} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function KanbanSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-8">
      <div className="w-full">
        <div className="mb-12">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="h-8 w-32" />
              {[0, 1, 2].map((j) => (
                <Skeleton key={j} className="h-32 w-full rounded-lg" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
