import type { ClaimNotificationNode } from "@/types/index";
import { ProcessNodeCardShell } from "./ProcessNodeCardShell";
import { ProcessNodeInfoGrid } from "./ProcessNodeInfoGrid";

type ClaimNotificationNodeCardProps = {
  processNode: ClaimNotificationNode;
};

export function ClaimNotificationNodeCard({
  processNode,
}: ClaimNotificationNodeCardProps) {
  return (
    <ProcessNodeCardShell summary="The claim has been reported and the initial notification details were recorded.">
      <ProcessNodeInfoGrid
        items={[
          { label: "Date and time", value: processNode.dateTime },
          { label: "Report type", value: processNode.reportType },
          { label: "Reason for damage", value: processNode.reasonForDamage },
          { label: "Reporting party", value: processNode.reportingParty },
          { label: "Contact", value: processNode.contact },
        ]}
      />
    </ProcessNodeCardShell>
  );
}
