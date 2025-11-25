import z from "zod";

export const RoleSchema = z.object({
  name: z
    .string("Name is required")
    .min(1, "Name must be at least 1 character")
    .max(50, "Name must be at most 50 characters"),
  desc: z.string("Dscription is required"),
});

export type TRoleSchema = z.infer<typeof RoleSchema>;

export const storeRoleSchema = RoleSchema.pick({
  name: true,
  desc: true,
});

export type TStoreRoleSchema = z.infer<typeof storeRoleSchema>;

export const updateRoleSchema = storeRoleSchema.partial();
export type TUpdateRoleSchema = z.infer<typeof updateRoleSchema>;
