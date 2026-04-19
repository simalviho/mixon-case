import type { LucideIcon } from "lucide-react";
import { AlertTriangle, CheckCircle2, CircleDot, Clock3 } from "lucide-react";

import type { ClaimProcessStepState } from "@/lib/utils/claim-detail";

export type ClaimStepVisualConfig = {
  label: string;
  badgeClassName: string;
  icon: LucideIcon;
  stepperCircleClassName: string;
  stepperLineClassName: string;
};

export function getClaimStepVisualConfig(
  stepState: ClaimProcessStepState,
): ClaimStepVisualConfig {
  switch (stepState) {
    case "completed":
      return {
        label: "Completed",
        badgeClassName:
          "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
        icon: CheckCircle2,
        stepperCircleClassName:
          "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm",
        stepperLineClassName: "bg-emerald-200",
      };

    case "in_progress":
      return {
        label: "In progress",
        badgeClassName:
          "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50",
        icon: CircleDot,
        stepperCircleClassName:
          "border-blue-200 bg-blue-50 text-blue-700 shadow-sm ring-4 ring-blue-100",
        stepperLineClassName: "bg-blue-200",
      };

    case "action_required":
      return {
        label: "Action required",
        badgeClassName:
          "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50",
        icon: AlertTriangle,
        stepperCircleClassName:
          "border-amber-200 bg-amber-50 text-amber-700 shadow-sm ring-4 ring-amber-100",
        stepperLineClassName: "bg-amber-200",
      };

    case "pending":
    default:
      return {
        label: "Pending",
        badgeClassName:
          "border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-100",
        icon: Clock3,
        stepperCircleClassName:
          "border-slate-200 bg-slate-100 text-slate-500 shadow-sm",
        stepperLineClassName: "bg-slate-200",
      };
  }
}
