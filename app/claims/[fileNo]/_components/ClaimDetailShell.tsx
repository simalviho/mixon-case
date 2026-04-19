"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  getActiveProcessNode,
  mergeProcessNodesWithInsertedNodes,
} from "@/lib/utils/claim-detail";
import { useClaimDetailUiStore } from "@/stores/claim-detail-ui-store";
import type { ClaimDetail } from "@/types/index";
import { ClaimProcessNodeTitleEnum } from "@/types/index";

import { ProcessDetailsAccordion } from "./accordion/ProcessDetailsAccordion";
import { ClaimOverviewCard } from "./overview/ClaimOverviewCard";
import { ClaimProgressStepper } from "./stepper/ClaimProgressStepper";

type ClaimDetailShellProps = {
  claimDetail: ClaimDetail;
};

function getPrimaryActionLabel(claimDetail: ClaimDetail): string {
  const deductionReasonNode = claimDetail.processDetails.find(
    (processNode) =>
      processNode.title === ClaimProcessNodeTitleEnum.DeductionReason,
  );

  if (
    deductionReasonNode &&
    "actionRequired" in deductionReasonNode &&
    deductionReasonNode.actionRequired.trim().length > 0
  ) {
    return deductionReasonNode.actionRequired;
  }

  return "No action required right now";
}

export function ClaimDetailShell({ claimDetail }: ClaimDetailShellProps) {
  const insertedNodes = useClaimDetailUiStore((state) => state.insertedNodes);

  const primaryActionLabel = getPrimaryActionLabel(claimDetail);
  const activeProcessNode = getActiveProcessNode(claimDetail);

  const combinedProcessDetails = useMemo(() => {
    return mergeProcessNodesWithInsertedNodes(
      claimDetail.processDetails,
      insertedNodes,
    );
  }, [claimDetail.processDetails, insertedNodes]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <div className="flex items-center">
        <Button asChild variant="ghost" className="rounded-full px-3">
          <Link href="/">
            <ArrowLeft className="mr-2 size-4" />
            Go back
          </Link>
        </Button>
      </div>

      <section className="flex min-w-0 flex-col gap-6">
        <ClaimOverviewCard
          fileNo={claimDetail.fileNo}
          currentStatus={claimDetail.currentStatus}
          estimatedRemainingTime={claimDetail.estimatedRemainingTime}
          primaryActionLabel={primaryActionLabel}
        />

        <ClaimProgressStepper
          processDetails={combinedProcessDetails}
          activeNodeTitle={activeProcessNode?.title}
        />

        <ProcessDetailsAccordion
          processDetails={combinedProcessDetails}
          activeNodeTitle={activeProcessNode?.title}
        />
      </section>
    </main>
  );
}
