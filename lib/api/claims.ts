import { mockClaimDetailsByFileNo } from "@/lib/mock/claim-details";
import { mockClaimSummaries } from "@/lib/mock/claims";
import { claimSummaryListSchema } from "@/lib/schemas/claim";
import { claimDetailSchema } from "@/lib/schemas/claim-detail";
import type { ClaimDetail, ClaimSummary } from "@/types/index";

function simulateNetworkDelay(durationInMilliseconds = 300): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, durationInMilliseconds);
  });
}

export async function getClaimSummaries(): Promise<ClaimSummary[]> {
  await simulateNetworkDelay();

  const parsedResponse = claimSummaryListSchema.safeParse(mockClaimSummaries);

  if (!parsedResponse.success) {
    throw new Error("Claim summaries response is invalid.");
  }

  return parsedResponse.data;
}

export async function getClaimDetailByFileNo(
  fileNo: string,
): Promise<ClaimDetail | null> {
  await simulateNetworkDelay();

  const claimDetail = mockClaimDetailsByFileNo[fileNo];

  if (!claimDetail) {
    return null;
  }

  const parsedDetail = claimDetailSchema.safeParse(claimDetail);

  if (!parsedDetail.success) {
    throw new Error("Claim detail response is invalid.");
  }

  return parsedDetail.data;
}
