"use client";

import { Trash2 } from "lucide-react";

import { ExplainWithAiDialog } from "@/app/claims/[fileNo]/_components/ExplainWithAiDialog";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getDisplayStepState,
  getProcessNodeSummary,
  isUserInsertedNode,
} from "@/lib/utils/claim-detail";
import { getClaimStepVisualConfig } from "@/lib/utils/claim-step-visuals";
import { useClaimDetailUiStore } from "@/stores/claim-detail-ui-store";
import type { ClaimDisplayProcessNode } from "@/types/index";

import { AddProcessNodeDialog } from "../AddProcessNodeDialog";
import { ProcessNodeRenderer } from "../process-nodes/ProcessNodeRenderer";

type ProcessDetailsAccordionItemProps = {
  itemValue: string;
  processNode: ClaimDisplayProcessNode;
  isInitiallyActive: boolean;
};

const userAddedBadgeClassName =
  "border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-50";

export function ProcessDetailsAccordionItem({
  itemValue,
  processNode,
  isInitiallyActive,
}: ProcessDetailsAccordionItemProps) {
  const removeInsertedNode = useClaimDetailUiStore(
    (state) => state.removeInsertedNode,
  );

  const isInserted = isUserInsertedNode(processNode);
  const stepState = getDisplayStepState(processNode);
  const stepVisualConfig = getClaimStepVisualConfig(stepState);
  const canAddAfterThisNode = !isInserted;

  const badgeLabel = isInserted ? "User added" : stepVisualConfig.label;
  const badgeClassName = isInserted
    ? userAddedBadgeClassName
    : stepVisualConfig.badgeClassName;

  return (
    <AccordionItem
      value={itemValue}
      className="rounded-3xl border bg-card px-5 shadow-sm"
    >
      <div className="flex flex-col gap-4 py-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <AccordionTrigger className="min-w-0 flex-1 py-0 text-left hover:no-underline">
            <div className="min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base font-semibold text-foreground">
                  {processNode.title}
                </span>

                <Badge className={badgeClassName}>{badgeLabel}</Badge>

                {isInitiallyActive ? (
                  <Badge variant="secondary">Active</Badge>
                ) : null}
              </div>

              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                {getProcessNodeSummary(processNode)}
              </p>
            </div>
          </AccordionTrigger>

          <div className="flex shrink-0 items-center gap-2">
            {canAddAfterThisNode ? (
              <AddProcessNodeDialog insertAfterTitle={processNode.title} />
            ) : null}

            {!isInserted ? (
              <ExplainWithAiDialog processNode={processNode} />
            ) : null}

            {isInserted ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-full text-violet-700 hover:bg-violet-50 hover:text-violet-800"
                onClick={(event) => {
                  event.stopPropagation();
                  removeInsertedNode(processNode.id);
                }}
              >
                <Trash2 className="mr-2 size-4" />
                Remove
              </Button>
            ) : null}
          </div>
        </div>

        <AccordionContent className="py-4 h-auto">
          <div className="border-t pt-4">
            <ProcessNodeRenderer processNode={processNode} />
          </div>
        </AccordionContent>
      </div>
    </AccordionItem>
  );
}
