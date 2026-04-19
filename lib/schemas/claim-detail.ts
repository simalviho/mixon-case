import { ClaimProcessNodeTitleEnum } from "@/types/index";
import { z } from "zod";

const baseClaimProcessNodeSchema = z.object({
  title: z.nativeEnum(ClaimProcessNodeTitleEnum),
  status: z.string(),
});

export const towingServiceNodeSchema = baseClaimProcessNodeSchema.extend({
  title: z.literal(ClaimProcessNodeTitleEnum.TowingService),
  pickupLocation: z.string(),
  towingDate: z.string(),
});

export const claimNotificationNodeSchema = baseClaimProcessNodeSchema.extend({
  title: z.literal(ClaimProcessNodeTitleEnum.ClaimNotification),
  dateTime: z.string(),
  reportType: z.string(),
  reasonForDamage: z.string(),
  reportingParty: z.string(),
  contact: z.string(),
});

export const appraisalNodeSchema = baseClaimProcessNodeSchema.extend({
  title: z.literal(ClaimProcessNodeTitleEnum.Appraisal),
  expertAssignmentDate: z.string(),
  expertInfo: z.string(),
  contact: z.string(),
});

export const substituteRentalVehicleNodeSchema =
  baseClaimProcessNodeSchema.extend({
    title: z.literal(ClaimProcessNodeTitleEnum.SubstituteRentalVehicle),
    vehicleDuration: z.string(),
    vehicleModel: z.string(),
    extraDuration: z.string(),
  });

export const fileReviewNodeSchema = baseClaimProcessNodeSchema.extend({
  title: z.literal(ClaimProcessNodeTitleEnum.FileReview),
  reviewReferralDate: z.string(),
  reviewCompletionDate: z.string(),
});

export const deductionReasonNodeSchema = baseClaimProcessNodeSchema.extend({
  title: z.literal(ClaimProcessNodeTitleEnum.DeductionReason),
  actionRequired: z.string(),
  occupationalDeduction: z.string(),
  appreciationDeduction: z.string(),
  policyDeductible: z.string(),
  nonDamageAmount: z.string(),
});

export const paymentInformationNodeSchema = baseClaimProcessNodeSchema.extend({
  title: z.literal(ClaimProcessNodeTitleEnum.PaymentInformation),
  paidTo: z.string(),
  iban: z.string(),
  paymentAmount: z.string(),
  note: z.string(),
});

export const closedNodeSchema = baseClaimProcessNodeSchema.extend({
  title: z.literal(ClaimProcessNodeTitleEnum.Closed),
  completionDate: z.string(),
});

export const claimProcessNodeSchema = z.union([
  towingServiceNodeSchema,
  claimNotificationNodeSchema,
  appraisalNodeSchema,
  substituteRentalVehicleNodeSchema,
  fileReviewNodeSchema,
  deductionReasonNodeSchema,
  paymentInformationNodeSchema,
  closedNodeSchema,
]);

export const claimDetailSchema = z.object({
  title: z.string(),
  fileNo: z.string(),
  estimatedRemainingTime: z.string(),
  currentStatus: z.string(),
  processDetails: z.array(claimProcessNodeSchema),
});
