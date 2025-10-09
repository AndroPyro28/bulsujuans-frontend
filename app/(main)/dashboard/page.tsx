"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const auth = useAuth();

  const canCreateUser = auth.hasPermission("users:create");
  const canEditUser = auth.hasPermission("users:edit");
  const canDeleteUser = auth.hasPermission("users:delete");
  const canDeleteUser2 = auth.hasPermission("users:deleteawdawd");

  return (
    <div className="container px-10 space-y-4">
      <pre className="text-xs bg-slate-900 text-white rounded-md">
        <code>{JSON.stringify(auth.user, null, 2)}</code>
      </pre>

      <div className="flex gap-2">
        <Button disabled={!canCreateUser}>can create user</Button>
        <Button disabled={!canEditUser}>can edit user</Button>
        <Button disabled={!canDeleteUser}>can delete user</Button>
        <Button disabled={!canDeleteUser2}>can delete user</Button>
        <Button variant={"destructive"} onClick={auth.logout}>
          logout
        </Button>
      </div>
    </div>
  );
}
