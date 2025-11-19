"use client";

import React, { useState } from "react";
import ProfileHeader from "./components/profile-header";
import ProfileInfo from "./components/profile-info";
import { EducationSection } from "./components/education-section";
import { ExperienceSection } from "./components/experience-section";
import { useAuth } from "@/hooks/useAuth";

const Page = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["about"]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]));
  };

  const auth = useAuth();

  return (
    <div className="w-full h-full p-10 space-y-10">
      <div className="">
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Manage your profile information</p>
      </div>
      <ProfileHeader />

      <ProfileInfo />

      <ExperienceSection items={experienceData} />
      <EducationSection items={educationData} />

      <pre className="text-xs bg-slate-900 text-white rounded-md">
        <code>{JSON.stringify(auth.user, null, 2)}</code>
      </pre>
      {/* <AdditionalSections expandedSections={expandedSections} toggleSection={toggleSection} /> */}
    </div>
  );
};

export default Page;

export const experienceData = [
  {
    role: "Senior Product Designer",
    company: "Tech Company Inc.",
    period: "2022 - Present",
    description: "Led design initiatives for mobile and web applications, mentored junior designers.",
  },
  {
    role: "Product Designer",
    company: "Creative Studio",
    period: "2020 - 2022",
    description: "Designed user interfaces and conducted user research for various clients.",
  },
];

export const educationData = [
  {
    title: "Bachelor of Fine Arts in Graphic Design",
    school: "Design University",
    year: "2020",
    description: "Specialized in digital design and user experience.",
  },
];
