"use client";

import type { Complaint } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, AlertCircle, FileText, User, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { DocumentGallery } from "./document-gallery";
import { ticketStatusConfig } from "@/app/(main)/tickets/constants/type";

interface ComplaintDetailViewProps {
  complaint: Complaint;
}

export function ComplaintDetailView({ complaint }: ComplaintDetailViewProps) {
  const status = complaint.ticket.status as keyof typeof ticketStatusConfig;
  const config = ticketStatusConfig[status] || ticketStatusConfig.PENDING;
  const StatusIcon = config.icon;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-6">
        {/* Header Section */}
        <div className={`rounded-lg border p-6 ${config.color}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <StatusIcon className="h-6 w-6" />
                <h1 className="text-3xl font-bold text-foreground">{complaint.ticket.title.slice(0, 30)}</h1>
              </div>
              <Badge className={config.badge}>{config.label}</Badge>
              <p className="text-sm text-muted-foreground">Created on {formatDate(complaint.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Complaint Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{complaint.complaint_type}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Incident Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{formatDate(complaint.date_of_incident)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={config.badge}>{config.label}</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Complainant Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Complainant Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                <p className="text-base font-semibold">{complaint.name}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                <a
                  href={`mailto:${complaint.email}`}
                  className="text-base font-semibold text-primary hover:underline flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  {complaint.email}
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Primary Contact</p>
                <a
                  href={`tel:${complaint.contact_number}`}
                  className="text-base font-semibold text-primary hover:underline flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  {complaint.contact_number}
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Alternate Contact</p>
                <a
                  href={`tel:${complaint.alternate_contact_number}`}
                  className="text-base font-semibold text-primary hover:underline flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  {complaint.alternate_contact_number}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Incident Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Incident Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Incident Description</p>
              <p className="text-base leading-relaxed text-foreground bg-muted/50 p-4 rounded-lg">
                {complaint.incident_detail}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Documents Section */}
        {complaint.documents && complaint.documents.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Supporting Documents ({complaint.documents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentGallery documents={complaint.documents} />
            </CardContent>
          </Card>
        )}

        {/* Metadata Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <p>
              <strong>Created:</strong> {formatDate(complaint.createdAt)}
            </p>
          </div>
          <div>
            <p>
              <strong>Last Updated:</strong> {formatDate(complaint.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
