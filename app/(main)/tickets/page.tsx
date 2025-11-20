"use client";

import React from "react";
import { KanbanBoard } from "./components/kanban-board";
import { DndProvider } from "./components/dnd-provider";

const Page = () => {
  return (
    <div className="w-full h-full p-10">
      <DndProvider>
        <KanbanBoard />
      </DndProvider>
    </div>
  );
};

export default Page;
