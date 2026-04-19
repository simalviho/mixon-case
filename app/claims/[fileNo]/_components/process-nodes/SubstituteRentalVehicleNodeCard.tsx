import type { SubstituteRentalVehicleNode } from "@/types/index";
import { ProcessNodeCardShell } from "./ProcessNodeCardShell";
import { ProcessNodeInfoGrid } from "./ProcessNodeInfoGrid";

type SubstituteRentalVehicleNodeCardProps = {
  processNode: SubstituteRentalVehicleNode;
};

export function SubstituteRentalVehicleNodeCard({
  processNode,
}: SubstituteRentalVehicleNodeCardProps) {
  return (
    <ProcessNodeCardShell summary="Rental vehicle support has been arranged for the covered duration.">
      <ProcessNodeInfoGrid
        items={[
          { label: "Vehicle model", value: processNode.vehicleModel },
          { label: "Vehicle duration", value: processNode.vehicleDuration },
          { label: "Extra duration", value: processNode.extraDuration },
        ]}
      />
    </ProcessNodeCardShell>
  );
}
