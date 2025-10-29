"use client";

import { AlertCircle, Clock, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";

const emergencyInfo = [
  {
    icon: Clock,
    title: "Response Time",
    description: "Campus Security response time: 3-5 minutes",
  },
  {
    icon: MapPin,
    title: "Health Center",
    description: "BSU Health Center - Main Campus Building",
  },
  {
    icon: Phone,
    title: "Campus Hotline",
    description: "Non-emergency: +63-44-789-2050",
  },
  {
    icon: AlertCircle,
    title: "Campus Status",
    description: "All systems operational - Safe campus",
  },
];

export default function EmergencyInfo() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Campus Emergency Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencyInfo.map((info) => {
          const Icon = info.icon;
          return (
            <Card key={info.title} className="bg-card border border-border p-4">
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
