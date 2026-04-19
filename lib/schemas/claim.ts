import { z } from "zod";

export const claimStatusSchema = z.enum([
  "in_progress",
  "pending",
  "closed",
  "action_required",
]);

export const claimSummarySchema = z.object({
  id: z.string(),
  fileNo: z.string(),
  title: z.string(),
  currentStatusLabel: z.string(),
  estimatedRemainingDays: z.number().nullable(),
  actionRequired: z.boolean(),
  updatedAt: z.string(),
});

export const claimSummaryListSchema = z.array(claimSummarySchema);

export type ClaimStatus = z.infer<typeof claimStatusSchema>;
export type ClaimSummary = z.infer<typeof claimSummarySchema>;
