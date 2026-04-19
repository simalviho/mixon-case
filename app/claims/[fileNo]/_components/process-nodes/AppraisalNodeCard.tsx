import type { AppraisalNode } from "@/types/index";
import { ProcessNodeCardShell } from "./ProcessNodeCardShell";
import { ProcessNodeInfoGrid } from "./ProcessNodeInfoGrid";

type AppraisalNodeCardProps = {
  processNode: AppraisalNode;
};

export function AppraisalNodeCard({ processNode }: AppraisalNodeCardProps) {
  return (
    <ProcessNodeCardShell summary="The expert appraisal step has been assigned and processed.">
      <ProcessNodeInfoGrid
        items={[
          {
            label: "Expert assignment date",
            value: processNode.expertAssignmentDate,
          },
          { label: "Expert information", value: processNode.expertInfo },
          { label: "Contact", value: processNode.contact },
        ]}
      />
    </ProcessNodeCardShell>
  );
}
