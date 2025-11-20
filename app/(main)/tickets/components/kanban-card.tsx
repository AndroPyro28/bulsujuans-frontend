"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { GripVertical, Calendar } from "lucide-react";
import { Tickets } from "@/types";
import { Button } from "@/components/ui/button";
import { formatStatus } from "@/lib/utils";
import Link from "next/link";
import { ticketStatusConfig } from "../constants/type";

interface KanbanCardProps {
  ticket: Tickets;
}

export function KanbanCard({ ticket }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    // isOverlay,
  } = useSortable({ id: ticket.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const createdDate = new Date(ticket.createdAt);
  const formattedDate = createdDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? "opacity-50" : ""} `} //${isOverlay ? 'cursor-grabbing' : ''}
    >
      <Card
        className={`p-4 bg-white dark:bg-slate-800 border-slate-200/50 dark:border-slate-700/50 transition-all duration-200 cursor-grab active:cursor-grabbing ${
          isDragging
            ? "shadow-2xl shadow-slate-400/40 dark:shadow-slate-950/60 scale-105"
            : "hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50"
        }`}
      >
        <div className="flex gap-3">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-grab active:cursor-grabbing"
            title="Drag to reorder or move to another column"
          >
            <GripVertical className="h-5 w-5 mt-1" />
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 dark:text-white text-xs mb-1 truncate">
              {ticket.title.slice(0, 30)}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">{ticket.description}</p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  ticketStatusConfig[ticket.status as keyof typeof ticketStatusConfig].status_color
                } text-white`}
              >
                {formatStatus(ticket.status, "upper")}
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Calendar className="h-3 w-3" />
                {formattedDate}
              </div>
            </div>

            {/* ID Badge */}
            <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
              <Button variant="outline" asChild className="text-xs">
                <Link href={`/complaints/${ticket.complaint_id}`} target="_blank" rel="noopener noreferrer">
                  View
                </Link>
              </Button>

              {ticket.status === "REJECTED" ||
                (ticket.status === "RESOLVED" && (
                  <Button variant="destructive" size={"sm"} className="text-xs">
                    Archive
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
