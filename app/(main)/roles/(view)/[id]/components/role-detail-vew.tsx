import { Role } from "@/types";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatText } from "@/lib/utils";
import { Calendar, Calendar1, FileText, Hash } from "lucide-react";
interface RoleDetailViewProps {
  role: Role;
}

const RolwDetailView = ({ role }: RoleDetailViewProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="mb-2 text-3xl">{formatText(role.name, "capitalized")}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Description */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Description</h3>
          </div>
          <p className="leading-relaxed text-muted-foreground">{role.desc}</p>
        </div>

        {/* Role ID */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Role ID</h3>
          </div>
          <p className="font-mono text-sm text-muted-foreground">{role.id}</p>
        </div>

        {/* Timeline Information */}
        <div className="grid gap-4 rounded-lg bg-secondary/10 p-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Created</span>
            </div>
            <p className="text-sm text-foreground">{formatDate(role.createdAt)}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar1 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Last Updated</span>
            </div>
            <p className="text-sm text-foreground">{formatDate(role.updatedAt)}</p>
          </div>
        </div>

        {/* Status Section */}
        {role.deleted_at ? (
          <div className="rounded-lg bg-destructive/10 p-4">
            <p className="text-sm text-destructive">Deleted on {formatDate(role.deleted_at)}</p>
          </div>
        ) : (
          <div className="rounded-lg bg-green-500/10 p-4">
            <p className="text-sm text-green-700">Active role</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RolwDetailView;
