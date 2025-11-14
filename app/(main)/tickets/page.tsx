"use client";

import { UnderDevelopment } from "@/components/under-devellopment";
import React from "react";
import Kanban from "./components/kanban";
import { Tickets } from "@/types";
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
