"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UnderDevelopment } from "@/components/under-devellopment";
import { AlertCircle, ArrowRight, CheckCircle2, Clock, Shield, Users, Zap } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  const [activePhase, setActivePhase] = useState(0);
  return (
    <div className="w-full h-full p-10">
      {/* Features Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Services & Functions</h2>
            <p className="mt-4 text-muted-foreground">Comprehensive features designed for student success</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceData.features.map((feature, idx) => (
              <Card key={idx} className="border-0 bg-card/50 backdrop-blur hover:bg-card/70 transition-colors">
                <CardContent className="flex items-start gap-3 pt-6">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                  <p className="text-sm font-medium">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Limitations Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">App Limitations</h2>
            <p className="mt-4 text-muted-foreground">Important considerations to understand</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceData.limitations.map((limitation) => {
              const Icon = limitation.icon;
              return (
                <Card key={limitation.id} className="border-0 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Icon className="h-6 w-6 flex-shrink-0 text-primary" />
                      <CardTitle className="text-lg">{limitation.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{limitation.detail}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Monitoring Phases Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Monitoring Phases</h2>
            <p className="mt-4 text-muted-foreground">Track your grievance through each stage</p>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {serviceData.phases.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhase(idx)}
                className={`rounded-lg p-4 text-left transition-all ${
                  activePhase === idx
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card/50 backdrop-blur hover:bg-card/70"
                }`}
              >
                <p className="font-semibold">{item.phase}</p>
                <p className="mt-2 text-sm opacity-90">{item.description}</p>
              </button>
            ))}
          </div>
          <Card className="mt-8 border-0 bg-accent/10 backdrop-blur">
            <CardContent className="pt-6">
              <p className="text-center text-lg font-medium text-foreground">
                {serviceData.phases[activePhase].description}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Grievance Submission Process</h2>
            <p className="mt-4 text-muted-foreground">11 steps to resolution</p>
          </div>
          <div className="space-y-4">
            {[
              "A student submits a grievance report.",
              "Students select the appropriate college, organization, or office responsible for addressing their report.",
              "If the report is college-based, it will be sent directly to the Local Student Council (LSC) for review.",
              "Students provide report details, select a category, and attach any relevant evidence.",
              "Reports directed to specific university offices are sent there for review.",
              "Concerns that the LSC cannot resolve are escalated to the respective faculty.",
              "If needed, faculty may forward the issue to the University Student Government.",
              "Unresolved cases at the Student Government level are referred to university administrators.",
              "The concerned office provides requirements and instructions via email for compliance.",
              "Once the complainant complies, the office resolves the issue.",
              "The process concludes with a centralized and collaborative grievance resolution, uniting all university sectors.",
            ].map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {idx + 1}
                </div>
                <Card className="flex-1 border-0 bg-card/50 backdrop-blur">
                  <CardContent className="pt-6">
                    <p className="text-foreground">{step}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-primary to-accent p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold text-primary-foreground">Ready to Make Your Voice Heard?</h2>
          <p className="mt-4 text-lg text-primary-foreground/90">
            Join thousands of students using BULSUJUANS to resolve grievances efficiently.
          </p>
          <Button size="lg" variant="secondary" className="mt-8">
            Submit Your Grievance <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Page;

const serviceData = {
  about: {
    title: "About BULSUJUANS",
    description:
      "BULSUJUANS is an innovative digital platform developed to enhance university-wide engagement in student grievance management at Bulacan State University. It empowers students to voice their concerns efficiently and promotes collaboration between students, faculty, and university offices for a more transparent and unified grievance process.",
    developers: {
      group: "Group 2",
      course: "BSC 4Charlie",
    },
  },
  limitations: [
    {
      id: 1,
      title: "User Access",
      detail:
        "The application is limited to students only; teaching staff, non-teaching staff, and other university personnel are excluded from submitting grievances.",
      icon: Users,
    },
    {
      id: 2,
      title: "Internet Connectivity",
      detail: "The platform requires internet access to function and cannot be used offline.",
      icon: Zap,
    },
    {
      id: 3,
      title: "Grievance Tracking",
      detail:
        "Students can monitor the progress of their submitted grievances, but direct follow-ups or two-way communication are not supported within the system.",
      icon: Clock,
    },
    {
      id: 4,
      title: "Resolution Timeframe",
      detail:
        "The platform does not guarantee specific timelines for grievance resolution, as this depends on the concerned university offices.",
      icon: AlertCircle,
    },
    {
      id: 5,
      title: "No Anonymous Submissions",
      detail:
        "Grievances cannot be filed anonymously; students must log in using their university credentials, which may discourage some from reporting sensitive issues.",
      icon: Shield,
    },
  ],
  phases: [
    { phase: "Phase 1", description: "The report has been submitted." },
    { phase: "Phase 2", description: "The report is under review." },
    { phase: "Phase 3", description: "The report is now being studied." },
    { phase: "Phase 4", description: "The report is being processed by the concerned office or organization." },
    { phase: "Phase 5", description: "The issue has been resolved." },
  ],
  features: [
    "User Login and Profile Information",
    "News Feed for University Publications",
    "Announcements for class suspensions, holidays, scholarships, and job vacancies",
    "Post reactions and save feature",
    "Polls for student elections and surveys",
    "Grievance reporting page",
    "Emergency hotline button",
    "Tracking system for reported grievances",
  ],
};
