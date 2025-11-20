"use client";

import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { ReactNode, useState, useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Pagination, Tickets } from "@/types";
import { KanbanCard } from "./kanban-card";
import { useMutateProcessor, useQueryProcessor } from "@/hooks/useTanstackQuery";
import { ColumnType } from "../constants/type";

export interface TicketsQuery {
  data: Tickets[];
  success: boolean;
  message: string;
  pagination: Pagination;
}

interface DndProviderProps {
  children: ReactNode;
}

export function DndProvider({ children }: DndProviderProps) {
  const [idToUpdate, SetIdToUpdate] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data } = useQueryProcessor<TicketsQuery>({
    url: "/tickets/list",
    queryParams: {},
    key: ["tickets"],
  });

  const tickets = data?.data || [];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const activeTicket = useMemo(() => {
    return tickets.find((t) => t.id === activeId);
  }, [activeId, tickets]);

  const updateMutation = useMutateProcessor<{ status: string }, unknown>({
    url: `/tickets/update/${idToUpdate}`,
    key: ["tickets"],
    method: "PATCH",
  });

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over) return;

      const VALID_COLUMNS: ColumnType[] = [
        "PENDING",
        "RESOLVED",
        "REJECTED",
        "BEING_PROCESS",
        "BEING_STUDIED",
        "UNDER_REVIEW",
      ];

      if (typeof over.id === "string" && VALID_COLUMNS.includes(over.id as ColumnType)) {
        const newStatus = over.id;
        if (active.id !== over.id) {
          SetIdToUpdate(active.id as string);
          await updateMutation.mutateAsync(
            { status: newStatus },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["complaints"] });
              },
            }
          );
          SetIdToUpdate(null);
        }
      }
    },
    [updateMutation]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay>
        {activeTicket && (
          <div className="opacity-50 scale-105">
            <KanbanCard ticket={activeTicket} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
