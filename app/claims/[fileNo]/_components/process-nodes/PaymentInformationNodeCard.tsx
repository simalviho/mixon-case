import type { PaymentInformationNode } from "@/types/index";
import { ProcessNodeCardShell } from "./ProcessNodeCardShell";
import { ProcessNodeInfoGrid } from "./ProcessNodeInfoGrid";

type PaymentInformationNodeCardProps = {
  processNode: PaymentInformationNode;
};

export function PaymentInformationNodeCard({
  processNode,
}: PaymentInformationNodeCardProps) {
  return (
    <ProcessNodeCardShell summary="Payment details are prepared and waiting for the process to complete.">
      <ProcessNodeInfoGrid
        items={[
          { label: "Paid to", value: processNode.paidTo },
          { label: "IBAN", value: processNode.iban },
          { label: "Payment amount", value: processNode.paymentAmount },
          { label: "Note", value: processNode.note },
        ]}
      />
    </ProcessNodeCardShell>
  );
}
