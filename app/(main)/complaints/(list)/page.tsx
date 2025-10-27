import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { UserActions } from "./components/user-actions";
import { ComplainsList } from "./components/complains-list";

const Complaints = () => {
  return (
    <div className="flex flex-col p-5">
      <div className="flex justify-between">
        <div className="page-title">
          <h1 className="text-2xl">My complaints</h1>
        </div>
        <div className="user-actions">
          <UserActions />
        </div>
      </div>
      
      <div className="mt-20">
        <ComplainsList />
      </div>
    </div>
  );
};

export default Complaints;
