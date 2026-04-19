import type { FileReviewNode } from "@/types/index";
import { ProcessNodeCardShell } from "./ProcessNodeCardShell";
import { ProcessNodeInfoGrid } from "./ProcessNodeInfoGrid";

type FileReviewNodeCardProps = {
  processNode: FileReviewNode;
};

export function FileReviewNodeCard({ processNode }: FileReviewNodeCardProps) {
  return (
    <ProcessNodeCardShell summary="The submitted file is currently under review.">
      <ProcessNodeInfoGrid
        items={[
          {
            label: "Review referral date",
            value: processNode.reviewReferralDate,
          },
          {
            label: "Review completion date",
            value: processNode.reviewCompletionDate,
          },
        ]}
      />
    </ProcessNodeCardShell>
  );
}
