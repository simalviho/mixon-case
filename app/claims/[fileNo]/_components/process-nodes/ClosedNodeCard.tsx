import type { ClosedNode } from "@/types/index";
import { ProcessNodeCardShell } from "./ProcessNodeCardShell";
import { ProcessNodeInfoGrid } from "./ProcessNodeInfoGrid";

type ClosedNodeCardProps = {
  processNode: ClosedNode;
};

export function ClosedNodeCard({ processNode }: ClosedNodeCardProps) {
  return (
    <ProcessNodeCardShell summary="This final step marks the closure of the claim lifecycle.">
      <ProcessNodeInfoGrid
        items={[
          { label: "Completion date", value: processNode.completionDate },
        ]}
      />
    </ProcessNodeCardShell>
  );
}
