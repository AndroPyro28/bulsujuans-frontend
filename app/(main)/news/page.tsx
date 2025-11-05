"use client";

import React, { useState } from "react";
import NewsDetail from "./components/news-detail";
import { ScrollArea } from "@/components/ui/scroll-area";
import NewsListItem from "./components/news-list-item";
import NewsPagination from "./components/news-pagination";

const Page = () => {
  const [selectedNews, setSelectedNews] = useState(newsItems[0]);
  return (
    <div className="w-full h-full p-10 flex gap-5">
      <div className="p-4 md:p-8 w-full md:w-2/5 border-r h-full">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">NEWS.</h1>
        {/* <ScrollArea className="h-full max-h-[580px]"> */}
        <div className="space-y-4">
          {newsItems.map((item) => (
            <NewsListItem
              key={item.id}
              item={item}
              isSelected={selectedNews.id === item.id}
              onClick={() => setSelectedNews(item)}
            />
          ))}
        </div>
        {/* </ScrollArea> */}
        <NewsPagination page={10} totalPages={10} />
      </div>

      <div className="hidden md:flex w-3/5 flex-col overflow-y-auto bg-background">
        <NewsDetail news={selectedNews} />
      </div>
    </div>
  );
};

export default Page;

const newsItems = [
  {
    id: 1,
    title: "Breaking Boundaries: BulSU Joins 34 Philippine HEIs in the 2026 QS World University Rankings: Asia 2026",
    date: "AUG 25 2025",
    source: "Bulacan State University",
    category: "Education",
    content: `
      <p>
        Bulacan State University proudly celebrates its inclusion in the <strong>QS World University Rankings: Asia 2026</strong>, 
        placing <strong>#1501+</strong> in the Asian University Rankings and <strong>#242</strong> in the Asian University Rankings - 
        South Eastern Asia.
      </p>
      <p>
        BulSU stands as one of the three Central Luzon HEIs in the list for QS Rankings 2026, a testament to the growing prominence 
        of BulSU and higher education institutions in the region.
      </p>
      <p>
        This milestone highlights BulSU’s unwavering commitment to academic excellence, global engagement, and innovation in 
        higher education, reflecting its continuous pursuit of progress and quality service to every BulSUan.
      </p>
      <p>
        #ALABBulSU #UNSDG4 | #UNSDG_QualityEducation
      </p>
    `,
    image: "/news/22.jpg",
  },
  {
    id: 2,
    title: "Announcement: Opening of Application for KUYA WIN Scholarship Program for Academic Year 2025-2026",
    date: "AUG 25 2025",
    source: "Bulacan State University - Scholarships Office",
    category: "Announcement",
    content: `
      <p>
        We are delighted to inform you that the opening of the application for the 
        <strong>KUYA WIN SCHOLARSHIP PROGRAM</strong> for the Academic Year 2025-2026 is scheduled on 
        <strong>August 25, 2025 (Monday)</strong> from <strong>12:00 AM to 11:59 PM ONLY</strong>.
      </p>
      <p>
        Kindly check the photos for <strong>Qualifications, Requirements, Reminders,</strong> and <strong>Steps</strong>. 
        The application form can be downloaded at the provided drive link. 
      </p>
      <p>
        All complete applications should be submitted <strong>ONLINE</strong> through the Google Form link.
      </p>
    `,
    image: "/news/33.jpg",
  },
  {
    id: 3,
    title: "The Medical City Clinic — Job Openings (in partnership with BulSU Placement & PESO)",
    date: "AUG 25 2025",
    source: "BulSU Placement & PESO",
    category: "Jobs",
    content: `
      <p>
        <strong>The Medical City Clinic</strong>, in partnership with BulSU Placement and the Public Employment Service Office, 
        is hiring for the following positions:
      </p>
      <ul>
        <li>Operating Room Nurse</li>
        <li>Administrative Assistant</li>
        <li>Radiologic Technologist</li>
        <li>Airconditioning Technician</li>
        <li>Staff Nurse</li>
        <li>Cashier</li>
      </ul>
      <p>
        Interested applicants should email their updated CV to 
        <a href="mailto:bulsu.ppeso@bulsu.edu.ph">bulsu.ppeso@bulsu.edu.ph</a> 
        with the <strong>company and position</strong> as the email subject.
      </p>
    `,
    image: "/news/44.jpg",
  },
  {
    id: 4,
    title: "LOOK: Office Memo No. 143 s. 2025 — Shift to Online Classes; Angara Cup Opening Proceeds as Planned",
    date: "2025-??-??",
    source: "Office of the University President",
    category: "Campus Notice",
    content: `
      <p>
        <strong>Office Memo No. 143 s. 2025</strong> suspends all on-site classes and shifts them to online mode.
      </p>
      <p>
        The opening day of <strong>Angara Cup</strong> will proceed as planned; students and faculty are advised to prioritize safety 
        during the activity.
      </p>
      <p>
        #BulSUSG #BulSU
      </p>
    `,
    image: "/news/55.jpg",
  },
  {
    id: 5,
    title: "BulSU Celebrates: World Mental Health Day and National Mental Health Week",
    date: "OCT 10 2025",
    source: "Bulacan State University - GCSC",
    category: "Health & Wellness",
    content: `
      <p>
        Bulacan State University joins the nation in observing <strong>National Mental Health Week</strong>, celebrated every second week of October.
        Today, <strong>October 10</strong>, marks <strong>World Mental Health Day 2025</strong>, with this year’s theme:
        “Access to Services: Mental Health in Catastrophes and Emergencies.”
      </p>
      <p>
        Through the <strong>Guidance and Counseling Services Center (GCSC)</strong>, BulSU remains steadfast in its commitment to the holistic well-being of every BulSUan.
        The Center provides a safe space to explore emotions, values, relationships, fears, and life choices through its six major services:
      </p>
      <ul>
        <li>Individual Inventory</li>
        <li>Informative Service</li>
        <li>Counseling Service</li>
        <li>Testing Service</li>
        <li>Follow-up Service</li>
        <li>Referral Service</li>
      </ul>
      <p>
        For inquiries and assistance, you may visit the <a href="https://sites.google.com/bulsu.edu.ph/gcscmain" target="_blank">GCSC website</a> 
        or personally visit the <strong>BulSU Guidance and Counseling Services Center - Main Campus</strong> at RH 104–105, Roxas Hall, BulSU Main Campus.
      </p>
      <p>
        You may also contact them through <strong>(044) 919-700 local 1071 & 1072</strong> or email 
        <a href="mailto:bulsuguidancecenter@bulsu.edu.ph">bulsuguidancecenter@bulsu.edu.ph</a> for further information and support.
      </p>
      <p>
        If you or someone you know is facing mental health concerns, the <strong>National Center for Mental Health</strong> is available 24/7, 
        <em>#HandangMakinig</em> to provide assistance. Reach out through:
      </p>
      <ul>
        <li>Hotline: 1553</li>
        <li>0917-899-USAP (8727)</li>
        <li>0966-351-4518 (Globe/TM)</li>
        <li>1800-1888-1553</li>
        <li>0919-057-1553 (Smart/TNT)</li>
      </ul>
      <p>
        #ALABBulSU | #BulSUGCSC | #WMHDay | #WorldMentalHealthDay | #MentalHealthMatters | #MentalHealthAwareness
      </p>
      <p>
        <em>By virtue of Proclamation No. 452 s. 1994, the second week of October of every year is declared as the National Mental Health Week.</em>
      </p>
    `,
    image: "/news/66.jpg",
  },
  {
    id: 6,
    title: "Announcement: Online Application for ATBulSU 2026 is Now Open",
    date: "SEP 22 2025",
    source: "Bulacan State University - Admissions Office",
    category: "Admissions",
    content: `
      <p>
        “Every great dream begins with a dreamer. Always remember, you have within you the strength, the patience, and the passion 
        to reach for the stars to change the world.” — <em>Harriet Tubman</em>
      </p>
      <p>
        Bulacan State University is pleased to announce that the <strong>online application for ATBulSU 2026</strong> starts today, 
        <strong>September 22, 2025</strong>, and continues until <strong>December 19, 2025</strong>. 
        The submission of hard copy requirements will begin on <strong>September 29, 2025</strong> and continue until 
        <strong>December 20, 2025</strong>.
      </p>
      <p>
        This applies to the <strong>Main Campus (Malolos)</strong> and all <strong>External Campuses</strong>. 
        Office hours are from 8:00 A.M. to 5:00 P.M., Mondays to Saturdays, excluding Sundays and Holidays.
      </p>
      <p>
        This Online Application is intended <strong>only for incoming freshmen and those not enrolled as college students</strong> 
        at any institution. Please note that transferees, shiftees, second-degree coursers, and night classes are not included 
        in this online application.
      </p>
      <p>Before applying, please review the following:</p>
      <ul>
        <li><a href="https://tinyurl.com/RequirementforATBULSU2026-2027" target="_blank">Requirements</a></li>
        <li><a href="https://tinyurl.com/BulSUGuidelines2026" target="_blank">Guidelines</a></li>
        <li><a href="https://tinyurl.com/Offered-Programs-AY-2026-2027" target="_blank">Programs (Courses) Offered</a></li>
      </ul>
      <h4>Reminders:</h4>
      <ul>
        <li>Make sure all your requirements are complete before you choose your preferred submission date.</li>
        <li>Submit your hard copy requirements to the BulSU campus where you applied on your chosen submission date.</li>
        <li>Applicants who submit their requirements outside of the scheduled date will not be accommodated to maintain an orderly process.</li>
      </ul>
      <p>
        Online Application Link: 
        <a href="https://bulsu.heims.ph/admission" target="_blank">https://bulsu.heims.ph/admission</a>
      </p>
    `,
    image: "/news/77.jpg",
  },
];
