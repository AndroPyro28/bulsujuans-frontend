"use client";

import { Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const emergencyContacts = [
  { name: "Campus Security", number: "+63-44-789-2000", icon: "🚔" },
  { name: "Health Center", number: "+63-44-789-2100", icon: "🏥" },
  { name: "Fire Department", number: "911", icon: "🚒" },
  { name: "PNP Emergency", number: "117", icon: "📞" },
];

export default function EmergencyContacts() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Emergency Contacts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencyContacts.map((contact) => (
          <Card key={contact.name} className="bg-card border border-border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{contact.icon}</span>
                <div>
                  <p className="font-semibold text-foreground">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.number}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => (window.location.href = `tel:${contact.number}`)}
                >
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
