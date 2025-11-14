"use client";

import { useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card"; // shadcn card
import { Badge } from "@/components/ui/badge"; // optional
import { ColumnType, Tickets } from "@/types";

interface KanbanProps {
  tickets: Tickets[];
}

interface Column {
  id: ColumnType;
  title: string;
  items: Tickets[];
}

export default function Kanban({ tickets }: KanbanProps) {
  const [columns, setColumns] = useState<Record<ColumnType, Tickets[]>>({
    PENDING: tickets.filter((t) => t.status === "PENDING"),
    RESOLVED: tickets.filter((t) => t.status === "RESOLVED"),
    REJECTED: tickets.filter((t) => t.status === "REJECTED"),
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find source and target columns
    let sourceCol: ColumnType | undefined;
    let targetCol: ColumnType | undefined;

    for (const col in columns) {
      if (columns[col as ColumnType].find((t) => t.id === activeId)) sourceCol = col as ColumnType;
      if (columns[col as ColumnType].find((t) => t.id === overId)) targetCol = col as ColumnType;
    }

    if (!sourceCol || !targetCol) return;

    if (sourceCol === targetCol) {
      const oldIndex = columns[sourceCol].findIndex((t) => t.id === activeId);
      const newIndex = columns[targetCol].findIndex((t) => t.id === overId);
      const updated = [...columns[sourceCol]];
      updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, columns[sourceCol][oldIndex]);
      setColumns({ ...columns, [sourceCol]: updated });
    } else {
      const sourceItems = [...columns[sourceCol]];
      const targetItems = [...columns[targetCol]];
      const [moved] = sourceItems.splice(
        sourceItems.findIndex((t) => t.id === activeId),
        1
      );
      moved.status = targetCol; // update status
      targetItems.splice(0, 0, moved); // insert at top
      setColumns({ ...columns, [sourceCol]: sourceItems, [targetCol]: targetItems });
    }
  };

  return (
    <div className="flex gap-4 p-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {(["PENDING", "RESOLVED", "REJECTED"] as ColumnType[]).map((col) => (
          <div key={col} className="flex-1 bg-gray-50 rounded p-2">
            <h2 className="text-lg font-bold mb-2">{col.toUpperCase()}</h2>
            <SortableContext items={columns[col]} strategy={verticalListSortingStrategy}>
              {columns[col].map((ticket) => (
                <SortableTicket key={ticket.id} ticket={ticket} />
              ))}
            </SortableContext>
          </div>
        ))}
      </DndContext>
    </div>
  );
}

interface SortableTicketProps {
  ticket: Tickets;
}

function SortableTicket({ ticket }: SortableTicketProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: ticket.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    marginBottom: "8px",
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-2">
      <h3 className="font-semibold">{ticket.title}</h3>
      <p className="text-sm text-gray-600">{ticket.description}</p>
      <Badge className="mt-2">{ticket.status.toUpperCase()}</Badge>
    </Card>
  );
}
