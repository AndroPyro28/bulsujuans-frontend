"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface EducationItem {
  title: string;
  school: string;
  year: string;
  description: string;
}

interface EducationSectionProps {
  items: EducationItem[];
}

export function EducationSection({ items }: EducationSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardHeader className="cursor-pointer hover:bg-muted/50" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between">
          <CardTitle>Education</CardTitle>
          <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4 border-t border-border pt-4">
          {items.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.school}</p>
                </div>
                <span className="text-sm text-muted-foreground">{item.year}</span>
              </div>
              <p className="text-sm text-foreground">{item.description}</p>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
