import { z } from "zod";

export enum ComplaintType {
  harassment = "HARASSMENT",
  suicide_or_self_injury = "SUICIDE_OR_SELF_INJURY",
  violence_or_dangerous_organizations = "VIOLENCE_OR_DANGEROUS_ORGANIZATIONS",
  nudity_or_sexual_activity = "NUDITY_OR_SEXUAL_ACTIVITY",
  selling_or_promoting_of_restricted_items = "SELLING_OR_PROMOTING_OF_RESTRICTED_ITEMS",
  scam_or_fraud = "SCAM_OR_FRAUD",
  other = "OTHER",
}

export const complaintsOptions = [
  {
    value: ComplaintType.harassment,
    label: "harassment",
  },
  {
    value: ComplaintType.suicide_or_self_injury,
    label: "Suicide or self-injury",
  },
  {
    value: ComplaintType.violence_or_dangerous_organizations,
    label: "violence or dangerous organizations",
  },
  {
    value: ComplaintType.nudity_or_sexual_activity,
    label: "Nudity or sexual activity",
  },
  {
    value: ComplaintType.selling_or_promoting_of_restricted_items,
    label: "Selling or promoting of restricted items",
  },
  {
    value: ComplaintType.scam_or_fraud,
    label: "Scam or fraud",
  },
];

export const ComplaintSchema = z.object({
  name: z
    .string("Name is required")
    .min(3, "Name must be at least 3 character")
    .max(50, "Name must be at most 50 characters"),
  email: z.email("Email is required"),
  contact_number: z.string("Contact Number is required").min(1, "Contact Number is required"),
  alternate_contact_number: z.string().optional(),
  incident_detail: z
    .string("Incident Detail is required")
    .min(1, "Incident Detail must be at least 1 character")
    .max(500, "Incident Detail must be at most 500 characters"),
  date_of_incident: z.coerce.date("Date of Incident is required"),
  complaint_type: z.enum(ComplaintType),
  complaint_status: z.string().min(1, "status is required"),
  complainant_id: z
    .string("Complainant ID is required")
    .min(1, "Complainant ID must be at least 1 character")
    .max(255, "Complainant ID must be at most 255 characters"),
});

export type TComplaintSchema = z.infer<typeof ComplaintSchema>;

export const storeComplaintSchema = ComplaintSchema.pick({
  name: true,
  email: true,
  contact_number: true,
  alternate_contact_number: true,
  incident_detail: true,
  date_of_incident: true,
  complaint_type: true,
  complainant_id: true,
});
export type TStoreComplaintSchema = z.infer<typeof storeComplaintSchema>;

export const updateComplaintSchema = storeComplaintSchema.partial();
export type TUpdateComplaintSchema = z.infer<typeof updateComplaintSchema>;
