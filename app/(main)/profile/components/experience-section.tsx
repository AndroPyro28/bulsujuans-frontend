"use client"

import React, { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface ExperienceItem {
  role: string
  company: string
  period: string
  description: string
}

interface ExperienceSectionProps {
  items: ExperienceItem[]
}

export function ExperienceSection({ items }: ExperienceSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <Card>
      <CardHeader
        className="cursor-pointer hover:bg-muted/50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <CardTitle>Experience</CardTitle>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4 border-t border-border pt-4">
          {items.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-foreground">{item.role}</p>
                  <p className="text-sm text-muted-foreground">{item.company}</p>
                </div>
                <span className="text-sm text-muted-foreground">{item.period}</span>
              </div>
              <p className="text-sm text-foreground">{item.description}</p>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  )
}
