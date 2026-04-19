import type { ClaimSummary } from "@/types/index";

export const mockClaimSummaries: ClaimSummary[] = [
  {
    id: "claim-1",
    fileNo: "9239182380",
    title: "Vehicle Damage Claim",
    currentStatusLabel: "File Review in Progress",
    estimatedRemainingDays: 20,
    actionRequired: true,
    updatedAt: "2026-04-18T10:00:00.000Z",
  },
  {
    id: "claim-2",
    fileNo: "9239181121",
    title: "Payment Review",
    currentStatusLabel: "Payment Pending",
    estimatedRemainingDays: 3,
    actionRequired: false,
    updatedAt: "2026-04-17T15:30:00.000Z",
  },
  {
    id: "claim-3",
    fileNo: "9239178450",
    title: "Rental Vehicle Request",
    currentStatusLabel: "Appraisal Awaiting Assignment",
    estimatedRemainingDays: 10,
    actionRequired: true,
    updatedAt: "2026-04-16T09:15:00.000Z",
  },
  {
    id: "claim-4",
    fileNo: "9239170029",
    title: "Completed Claim",
    currentStatusLabel: "Closed",
    estimatedRemainingDays: null,
    actionRequired: false,
    updatedAt: "2026-04-10T12:20:00.000Z",
  },
];
