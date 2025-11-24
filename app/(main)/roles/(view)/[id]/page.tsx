"use client";

import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { Complaint } from "@/types";
import { useParams } from "next/navigation";
import React from "react";
import { PageLoading } from "@/components/page-loading";
import Link from "next/link";
import { ArrowLeft, Calendar, Calendar1, FileText, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export interface ComplaintQuery {
  data: Complaint;
  success: boolean;
  message: string;
}

const Page = () => {
  const params = useParams();
  const role_id = params.id;
  // const { data, isPending } = useQueryProcessor<ComplaintQuery>({
  //   url: `/complaints/show/${complaint_id}`,
  //   key: ["complaints", complaint_id],
  //   options: {
  //     enabled: !!complaint_id,
  //   },
  // });

  // const complaint = data?.data;

  // if (isPending || !complaint) {
  //   return (
  //     <div className="w-full h-full p-10">
  //       <PageLoading />
  //     </div>
  //   );
  // }

  const data = {
    id: "1",
    name: "Administrator",
    desc: "Full system access with complete control over all resources and settings",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-11-20T14:22:00Z",
    deleted_at: null,
  };

  const getRoleColor = (name: string) => {
    const colors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      Administrator: "destructive",
      Editor: "default",
      Viewer: "secondary",
      Moderator: "outline",
      Analyst: "secondary",
    };
    return colors[name] || "default";
  };

  return (
    <div className="w-full h-full p-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link href="/roles">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Roles
            </Button>
          </Link>

          {/* edit button */}
          <Link href={`/roles/edit/${data.id}`}>
            <Button>Edit</Button>
          </Link>
        </div>

        {/* Main Role Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="mb-2 text-3xl">{data.name}</CardTitle>
                <Badge variant={getRoleColor(data.name)} className="w-fit">
                  Active
                </Badge>
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
              <p className="leading-relaxed text-muted-foreground">{data.desc}</p>
            </div>

            {/* Role ID */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Role ID</h3>
              </div>
              <p className="font-mono text-sm text-muted-foreground">{data.id}</p>
            </div>

            {/* Timeline Information */}
            <div className="grid gap-4 rounded-lg bg-secondary/10 p-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Created</span>
                </div>
                <p className="text-sm text-foreground">{formatDate(data.createdAt)}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar1 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Last Updated</span>
                </div>
                <p className="text-sm text-foreground">{formatDate(data.updatedAt)}</p>
              </div>
            </div>

            {/* Status Section */}
            {data.deleted_at ? (
              <div className="rounded-lg bg-destructive/10 p-4">
                <p className="text-sm text-destructive">Deleted on {formatDate(data.deleted_at)}</p>
              </div>
            ) : (
              <div className="rounded-lg bg-green-500/10 p-4">
                <p className="text-sm text-green-700">Active role</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
