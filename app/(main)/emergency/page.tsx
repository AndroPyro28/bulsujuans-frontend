import { Card } from "@/components/ui/card";
import { UnderDevelopment } from "@/components/under-devellopment";
import { Shield } from "lucide-react";
import React from "react";
import EmergencyContacts from "./components/emergency-contacts";
import EmergencyInfo from "./components/emergency-info";

const Page = () => {
  return (
    <div className="w-full h-full p-10">
      <div className="mb-12">
        <EmergencyContacts />
      </div>

      <div className="mb-12">
        <EmergencyInfo />
      </div>

      <Card className="bg-card border border-border p-6">
        <div className="flex items-start gap-4">
          <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-foreground mb-2">Campus Safety Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Always provide your location on campus when calling emergency services</li>
              <li>• Stay calm and follow dispatcher instructions</li>
              <li>• Keep your emergency contacts updated in your student profile</li>
              <li>• Share your location with trusted contacts during emergencies</li>
              <li>• Report suspicious activities to Campus Security immediately</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Page;
