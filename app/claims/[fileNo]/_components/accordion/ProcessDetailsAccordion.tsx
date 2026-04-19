"use client";

import { Accordion } from "@/components/ui/accordion";
import type { ClaimDisplayProcessNode } from "@/types/index";

import { ProcessDetailsAccordionItem } from "./ProcessDetailsAccordionItem";

type ProcessDetailsAccordionProps = {
  processDetails: ClaimDisplayProcessNode[];
  activeNodeTitle?: string;
};

export function ProcessDetailsAccordion({
  processDetails,
  activeNodeTitle,
}: ProcessDetailsAccordionProps) {
  const defaultOpenItemValue =
    activeNodeTitle ??
    (processDetails.length > 0
      ? "id" in processDetails[0]
        ? processDetails[0].id
        : processDetails[0].title
      : undefined);

  return (
    <section className="flex flex-col gap-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Process details
        </p>
        <h2 className="text-lg font-semibold text-foreground">
          Detailed claim steps
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Review each claim step in a compact accordion layout. The currently
          active step opens by default to keep the most relevant information in
          focus.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue={defaultOpenItemValue}
        className="flex flex-col gap-4"
      >
        {processDetails.map((processNode, processNodeIndex) => {
          const itemValue =
            "id" in processNode
              ? processNode.id
              : `${processNode.title}-${processNodeIndex}`;

          const isInitiallyActive =
            !("id" in processNode) && processNode.title === activeNodeTitle;

          return (
            <ProcessDetailsAccordionItem
              key={itemValue}
              itemValue={itemValue}
              processNode={processNode}
              isInitiallyActive={isInitiallyActive}
            />
          );
        })}
      </Accordion>
    </section>
  );
}
