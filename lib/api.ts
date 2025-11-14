import { Tickets } from "@/types";

const sampleTickets: Tickets[] = [
  {
    id: "1",
    title: "Fix login bug",
    description: "Users cannot login with valid credentials",
    status: "PENDING",
    complaint_id: "c1",
    assigned_office_id: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "2",
    title: "Update profile UI",
    description: "Redesign the profile page",
    status: "RESOLVED",
    complaint_id: "c2",
    assigned_office_id: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "3",
    title: "Resolve payment issue",
    description: "Payment fails on checkout",
    status: "REJECTED",
    complaint_id: "c3",
    assigned_office_id: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "4",
    title: "Add dark mode",
    description: "Implement dark mode theme",
    status: "PENDING",
    complaint_id: "c4",
    assigned_office_id: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "5",
    title: "Performance optimization",
    description: "Optimize bundle size and load times",
    status: "PENDING",
    complaint_id: "c5",
    assigned_office_id: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "6",
    title: "Fix typo in footer",
    description: "Update footer text",
    status: "RESOLVED",
    complaint_id: "c6",
    assigned_office_id: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deleted_at: null,
  },
];

export async function fetchTickets(): Promise<Tickets[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return sampleTickets;
}

export async function updateTicketStatus(ticketId: string, newStatus: string): Promise<Tickets | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  const ticket = sampleTickets.find((t) => t.id === ticketId);
  if (ticket) {
    ticket.status = newStatus;
    ticket.updatedAt = new Date().toISOString();
  }
  return ticket || null;
}
