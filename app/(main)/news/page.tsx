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
        <ScrollArea className="h-full max-h-[580px]">
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
        </ScrollArea>
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
    title: "How Larry Jackson signed Mariah Carey to his $400 Million Startup",
    date: "JUN 6 2025",
    source: "Forbes",
    category: "Business",
    content:
      "In a groundbreaking move that has sent shockwaves through the entertainment industry, Larry Jackson has successfully signed legendary artist Mariah Carey to his ambitious new startup venture valued at $400 million. This strategic partnership marks a significant milestone in the evolution of artist management and digital entertainment platforms.",
    image: "/assets/login-bg.png",
  },
  {
    id: 2,
    title: "Under Armour enlists gamma. for new Stephen Curry spot",
    date: "APR 13 2025",
    source: "Forbes",
    category: "Sports",
    content:
      "Under Armour has partnered with creative agency gamma. to produce an exciting new advertising campaign featuring basketball superstar Stephen Curry. The collaboration aims to showcase the latest innovations in athletic wear and performance technology.",
    image: "/assets/login-bg.png",
  },
  {
    id: 3,
    title: "Why the women of gamma. are the key to its multi-million dollar success",
    date: "MAR 26 2025",
    source: "Entrepreneur",
    category: "Leadership",
    content:
      "The success story of gamma. is intrinsically linked to the exceptional women who lead and shape the organization. From executive leadership to creative teams, these visionary women have been instrumental in driving innovation and growth.",
    image: "/assets/login-bg.png",
  },
  {
    id: 4,
    title: "Snoop Dogg, Sexyy Red products bring $420 million in revenue",
    date: "JAN 31 2025",
    source: "Hollywood Reporter",
    category: "Entertainment",
    content:
      "The collaborative product line between Snoop Dogg and Sexyy Red has exceeded all expectations, generating an impressive $420 million in revenue. This successful venture demonstrates the power of celebrity partnerships in the consumer goods market.",
    image: "/assets/login-bg.png",
  },
  {
    id: 5,
    title: "Tech Giants Announce Revolutionary AI Framework",
    date: "DEC 15 2024",
    source: "TechCrunch",
    category: "Technology",
    content:
      "Leading technology companies have unveiled a groundbreaking artificial intelligence framework that promises to revolutionize how businesses approach automation and data analysis. The framework is expected to be available to developers in Q1 2025.",
    image: "/assets/login-bg.png",
  },
  {
    id: 6,
    title: "Tech Giants Announce Revolutionary AI Framework",
    date: "DEC 15 2024",
    source: "TechCrunch",
    category: "Technology",
    content:
      "Leading technology companies have unveiled a groundbreaking artificial intelligence framework that promises to revolutionize how businesses approach automation and data analysis. The framework is expected to be available to developers in Q1 2025.",
    image: "/assets/login-bg.png",
  },
  {
    id: 7,
    title: "Tech Giants Announce Revolutionary AI Framework",
    date: "DEC 15 2024",
    source: "TechCrunch",
    category: "Technology",
    content:
      "Leading technology companies have unveiled a groundbreaking artificial intelligence framework that promises to revolutionize how businesses approach automation and data analysis. The framework is expected to be available to developers in Q1 2025.",
    image: "/assets/login-bg.png",
  },
  {
    id: 8,
    title: "Tech Giants Announce Revolutionary AI Framework",
    date: "DEC 15 2024",
    source: "TechCrunch",
    category: "Technology",
    content:
      "Leading technology companies have unveiled a groundbreaking artificial intelligence framework that promises to revolutionize how businesses approach automation and data analysis. The framework is expected to be available to developers in Q1 2025.",
    image: "/assets/login-bg.png",
  },
  {
    id: 9,
    title: "Tech Giants Announce Revolutionary AI Framework",
    date: "DEC 15 2024",
    source: "TechCrunch",
    category: "Technology",
    content:
      "Leading technology companies have unveiled a groundbreaking artificial intelligence framework that promises to revolutionize how businesses approach automation and data analysis. The framework is expected to be available to developers in Q1 2025.",
    image: "/assets/login-bg.png",
  },
  {
    id: 10,
    title: "Tech Giants Announce Revolutionary AI Framework",
    date: "DEC 15 2024",
    source: "TechCrunch",
    category: "Technology",
    content:
      "Leading technology companies have unveiled a groundbreaking artificial intelligence framework that promises to revolutionize how businesses approach automation and data analysis. The framework is expected to be available to developers in Q1 2025.",
    image: "/assets/login-bg.png",
  },
  {
    id: 11,
    title: "Tech Giants Announce Revolutionary AI Framework",
    date: "DEC 15 2024",
    source: "TechCrunch",
    category: "Technology",
    content:
      "Leading technology companies have unveiled a groundbreaking artificial intelligence framework that promises to revolutionize how businesses approach automation and data analysis. The framework is expected to be available to developers in Q1 2025.",
    image: "/assets/login-bg.png",
  },
  {
    id: 12,
    title: "Tech Giants Announce Revolutionary AI Framework",
    date: "DEC 15 2024",
    source: "TechCrunch",
    category: "Technology",
    content:
      "Leading technology companies have unveiled a groundbreaking artificial intelligence framework that promises to revolutionize how businesses approach automation and data analysis. The framework is expected to be available to developers in Q1 2025.",
    image: "/assets/login-bg.png",
  },
  {
    id: 13,
    title: "Tech Giants Announce Revolutionary AI Framework",
    date: "DEC 15 2024",
    source: "TechCrunch",
    category: "Technology",
    content:
      "Leading technology companies have unveiled a groundbreaking artificial intelligence framework that promises to revolutionize how businesses approach automation and data analysis. The framework is expected to be available to developers in Q1 2025.",
    image: "/assets/login-bg.png",
  },
];
