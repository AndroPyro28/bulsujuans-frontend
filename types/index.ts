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
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
