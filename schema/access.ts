import z from "zod";

export const AccessSchema = z.object({
  code: z
    .string("Name is required")
    .min(1, "Name must be at least 1 character")
    .max(30, "Name must be at most 30 characters"),
  name: z
    .string("Name is required")
    .min(1, "Name must be at least 1 character")
    .max(50, "Name must be at most 50 characters"),
  desc: z.string("Dscription is required"),
});

export type TAccessSchema = z.infer<typeof AccessSchema>;

export const storeAccessSchema = AccessSchema.pick({
  code: true,
  name: true,
  desc: true,
});

export type TStoreAccessSchema = z.infer<typeof storeAccessSchema>;

export const updateAccessSchema = storeAccessSchema.partial();
export type TUpdateAccessSchema = z.infer<typeof updateAccessSchema>;
