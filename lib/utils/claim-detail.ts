import {
  ClaimDetail,
  ClaimDisplayProcessNode,
  ClaimProcessNode,
  ClaimProcessNodeKindEnum,
  ClaimProcessNodeTitleEnum,
  UserInsertedProcessNode,
} from "@/types/index";

export type ClaimProcessStepState =
  | "completed"
  | "in_progress"
  | "pending"
  | "action_required";

export function isUserInsertedNode(
  processNode: ClaimDisplayProcessNode,
): processNode is UserInsertedProcessNode {
  return "kind" in processNode;
}

function normalizeStatusValue(status: string): string {
  return status.trim().toLowerCase();
}

export function getProcessStepState(
  processNode: ClaimProcessNode,
): ClaimProcessStepState {
  const normalizedStatus = normalizeStatusValue(processNode.status);

  if (processNode.title === ClaimProcessNodeTitleEnum.DeductionReason) {
    return "action_required";
  }

  if (
    normalizedStatus.includes("completed") ||
    normalizedStatus.includes("closed") ||
    normalizedStatus.includes("paid")
  ) {
    return "completed";
  }

  if (
    normalizedStatus.includes("progress") ||
    normalizedStatus.includes("continues") ||
    normalizedStatus.includes("review")
  ) {
    return "in_progress";
  }

  return "pending";
}

export function getDisplayStepState(
  processNode: ClaimDisplayProcessNode,
): ClaimProcessStepState {
  if (isUserInsertedNode(processNode)) {
    return "pending";
  }

  return getProcessStepState(processNode);
}

export function getActiveProcessNode(
  claimDetail: ClaimDetail,
): ClaimProcessNode | null {
  const actionRequiredNode = claimDetail.processDetails.find(
    (processNode) => getProcessStepState(processNode) === "action_required",
  );

  if (actionRequiredNode) {
    return actionRequiredNode;
  }

  const inProgressNode = claimDetail.processDetails.find(
    (processNode) => getProcessStepState(processNode) === "in_progress",
  );

  if (inProgressNode) {
    return inProgressNode;
  }

  const firstPendingNode = claimDetail.processDetails.find(
    (processNode) => getProcessStepState(processNode) === "pending",
  );

  if (firstPendingNode) {
    return firstPendingNode;
  }

  return claimDetail.processDetails.at(-1) ?? null;
}

function assertNever(value: never): never {
  throw new Error(`Unhandled process node: ${JSON.stringify(value)}`);
}

export function getProcessNodeSummary(
  processNode: ClaimDisplayProcessNode,
): string {
  if (isUserInsertedNode(processNode)) {
    switch (processNode.kind) {
      case ClaimProcessNodeKindEnum.InformationNote:
        return processNode.note;

      case ClaimProcessNodeKindEnum.AdditionalAttachment:
        return `${processNode.documentType} · ${processNode.fileName}`;

      default:
        return assertNever(processNode);
    }
  }

  switch (processNode.title) {
    case ClaimProcessNodeTitleEnum.TowingService:
      return `${processNode.pickupLocation} · ${processNode.towingDate}`;

    case ClaimProcessNodeTitleEnum.ClaimNotification:
      return `${processNode.reportType} · ${processNode.reasonForDamage}`;

    case ClaimProcessNodeTitleEnum.Appraisal:
      return `${processNode.expertInfo} · ${processNode.expertAssignmentDate}`;

    case ClaimProcessNodeTitleEnum.SubstituteRentalVehicle:
      return `${processNode.vehicleModel} · ${processNode.vehicleDuration}`;

    case ClaimProcessNodeTitleEnum.FileReview:
      return `Referral ${processNode.reviewReferralDate}`;

    case ClaimProcessNodeTitleEnum.DeductionReason:
      return processNode.actionRequired;

    case ClaimProcessNodeTitleEnum.PaymentInformation:
      return `${processNode.paidTo} · ${processNode.paymentAmount}`;

    case ClaimProcessNodeTitleEnum.Closed:
      return `Completion ${processNode.completionDate}`;

    default:
      return assertNever(processNode);
  }
}

export function mergeProcessNodesWithInsertedNodes(
  baseProcessNodes: ClaimProcessNode[],
  insertedNodes: UserInsertedProcessNode[],
): ClaimDisplayProcessNode[] {
  if (insertedNodes.length === 0) {
    return baseProcessNodes;
  }

  return baseProcessNodes.flatMap((baseProcessNode) => {
    const nodesInsertedAfterCurrentStep = insertedNodes.filter(
      (insertedNode) => insertedNode.insertAfterTitle === baseProcessNode.title,
    );

    return [baseProcessNode, ...nodesInsertedAfterCurrentStep];
  });
}
