import { AlertTriangle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { DeductionReasonNode } from "@/types/index";
import { ProcessNodeCardShell } from "./ProcessNodeCardShell";
import { ProcessNodeInfoGrid } from "./ProcessNodeInfoGrid";

type DeductionReasonNodeCardProps = {
  processNode: DeductionReasonNode;
};

export function DeductionReasonNodeCard({
  processNode,
}: DeductionReasonNodeCardProps) {
  return (
    <ProcessNodeCardShell summary="This step requires user attention before the claim can proceed smoothly.">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-4 text-amber-700" />
          <div className="space-y-2">
            <Badge className="border-amber-200 bg-background text-amber-700 hover:bg-background">
              Action required
            </Badge>
            <p className="text-sm font-medium text-foreground">
              {processNode.actionRequired}
            </p>
          </div>
        </div>
      </div>

      <ProcessNodeInfoGrid
        items={[
          {
            label: "Occupational deduction",
            value: processNode.occupationalDeduction,
          },
          {
            label: "Appreciation deduction",
            value: processNode.appreciationDeduction,
          },
          { label: "Policy deductible", value: processNode.policyDeductible },
          { label: "Non-damage amount", value: processNode.nonDamageAmount },
        ]}
      />
    </ProcessNodeCardShell>
  );
}
