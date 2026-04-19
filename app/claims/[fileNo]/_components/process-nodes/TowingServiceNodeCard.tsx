import type { TowingServiceNode } from "@/types/index";
import { ProcessNodeCardShell } from "./ProcessNodeCardShell";
import { ProcessNodeInfoGrid } from "./ProcessNodeInfoGrid";

type TowingServiceNodeCardProps = {
  processNode: TowingServiceNode;
};

export function TowingServiceNodeCard({
  processNode,
}: TowingServiceNodeCardProps) {
  return (
    <ProcessNodeCardShell summary="Vehicle pickup and towing logistics are completed.">
      <ProcessNodeInfoGrid
        items={[
          { label: "Pickup location", value: processNode.pickupLocation },
          { label: "Towing date", value: processNode.towingDate },
        ]}
      />
    </ProcessNodeCardShell>
  );
}
