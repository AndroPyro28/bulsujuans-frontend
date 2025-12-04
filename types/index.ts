export interface Option {
  label: string;
  value: string;
}

export interface Complaint {
  id: string;
  name: string;
  contact_number: string;
  alternate_contact_number: string;
  email: string;
  incident_detail: string;
  date_of_incident: string;
  complaint_status: string;
  complaint_type: string;
  complainant_id: string;
  createdAt: string;
  updatedAt: string;
  deleted_at?: string;
  // relation
  documents: Documents[];
  ticket: Tickets;
}

export interface Documents {
  id: string;
  public_url: string;
  public_id: string;
  complaint_id: string;
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
}

export interface Tickets {
  id: string;
  title: string;
  description: string;
  status: string;
  complaint_id: string;
  assigned_office_id: string | null;
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
}

export interface Role {
  id: string;
  name: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
}

export interface Access {
  id: string;
  code: string;
  name: string;
  desc: string;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
}
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
