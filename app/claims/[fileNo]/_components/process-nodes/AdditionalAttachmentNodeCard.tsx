import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useClaimDetailUiStore } from "@/stores/claim-detail-ui-store";
import type { AdditionalAttachmentNode } from "@/types/index";
import { ProcessNodeCardShell } from "./ProcessNodeCardShell";
import { ProcessNodeInfoGrid } from "./ProcessNodeInfoGrid";

type AdditionalAttachmentNodeCardProps = {
  processNode: AdditionalAttachmentNode;
};

export function AdditionalAttachmentNodeCard({
  processNode,
}: AdditionalAttachmentNodeCardProps) {
  const removeInsertedNode = useClaimDetailUiStore(
    (state) => state.removeInsertedNode,
  );

  return (
    <ProcessNodeCardShell
      summary={`This attachment was manually added after ${processNode.insertAfterTitle}.`}
    >
      <ProcessNodeInfoGrid
        items={[
          { label: "Document type", value: processNode.documentType },
          { label: "File name", value: processNode.fileName },
        ]}
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Inserted after {processNode.insertAfterTitle}
          </p>
          <p className="text-xs text-muted-foreground">
            Added at {new Date(processNode.createdAt).toLocaleString("en-GB")}
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="rounded-full"
          onClick={() => removeInsertedNode(processNode.id)}
        >
          <Trash2 className="size-4" />
          Remove
        </Button>
      </div>
    </ProcessNodeCardShell>
  );
}
