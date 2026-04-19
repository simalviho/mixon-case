import {
  getProcessNodeSummary,
  isUserInsertedNode,
} from "@/lib/utils/claim-detail";
import type { ClaimDisplayProcessNode } from "@/types/index";
import {
  ClaimProcessNodeKindEnum,
  ClaimProcessNodeTitleEnum,
} from "@/types/index";

export type ClaimAiExplanation = {
  headline: string;
  summary: string;
  nextStep: string;
  userAction: string;
  confidenceLabel: string;
};

function delay(): Promise<void> {
  const durationInMilliseconds = 1600 + Math.floor(Math.random() * 900);

  return new Promise((resolve) => {
    setTimeout(resolve, durationInMilliseconds);
  });
}

export function getProcessNodeAiKey(
  processNode: ClaimDisplayProcessNode,
): string {
  if (isUserInsertedNode(processNode)) {
    return processNode.id;
  }

  return processNode.title;
}

function buildExplanationForUserInsertedNode(
  processNode: Extract<
    ClaimDisplayProcessNode,
    {
      kind:
        | ClaimProcessNodeKindEnum.InformationNote
        | ClaimProcessNodeKindEnum.AdditionalAttachment;
    }
  >,
): ClaimAiExplanation {
  if (processNode.kind === ClaimProcessNodeKindEnum.InformationNote) {
    return {
      headline: "User-added note detected",
      summary:
        "This note appears to add contextual information to the claim flow. It does not block the process by itself, but it may help reviewers understand recent updates or customer-provided details.",
      nextStep:
        "The note will stay visible in the timeline so it can be referenced during review.",
      userAction:
        "No mandatory action is required unless you want to add more clarifying details.",
      confidenceLabel: "Simulated AI explanation",
    };
  }

  return {
    headline: "Additional attachment detected",
    summary:
      "This attachment looks like a supporting document added to strengthen the claim record. It may help explain or validate a related process step.",
    nextStep:
      "The document should remain associated with the selected step so reviewers can inspect it in context.",
    userAction:
      "Make sure the file name and document type clearly describe the uploaded material.",
    confidenceLabel: "Simulated AI explanation",
  };
}

function buildExplanationForBaseNode(
  processNode: Exclude<
    ClaimDisplayProcessNode,
    {
      kind:
        | ClaimProcessNodeKindEnum.InformationNote
        | ClaimProcessNodeKindEnum.AdditionalAttachment;
    }
  >,
): ClaimAiExplanation {
  switch (processNode.title) {
    case ClaimProcessNodeTitleEnum.TowingService:
      return {
        headline: "Vehicle towing step explained",
        summary:
          "This step confirms that the damaged vehicle was collected and moved for the claim process. It usually establishes the early logistics of the incident.",
        nextStep:
          "Once towing is completed, the claim can continue with notification, appraisal, and file review steps.",
        userAction:
          "There is usually no extra action required here unless a pickup detail is incorrect.",
        confidenceLabel: "Simulated AI explanation",
      };

    case ClaimProcessNodeTitleEnum.ClaimNotification:
      return {
        headline: "Claim notification step explained",
        summary:
          "This is the formal record of the claim event. It captures the reported damage context, who reported it, and the initial incident classification.",
        nextStep:
          "The insurer typically uses this step to open the file and prepare the case for expert review.",
        userAction:
          "Review the reporting details and contact information if something looks inaccurate.",
        confidenceLabel: "Simulated AI explanation",
      };

    case ClaimProcessNodeTitleEnum.Appraisal:
      return {
        headline: "Appraisal step explained",
        summary:
          "An expert or appraisal company evaluates the vehicle and the damage scope. This step helps determine repair, reimbursement, and supporting evidence needs.",
        nextStep:
          "After appraisal, the file can move into deeper review, deductions, and payment preparation if needed.",
        userAction:
          "No immediate action is usually needed unless the appraisal information is missing or disputed.",
        confidenceLabel: "Simulated AI explanation",
      };

    case ClaimProcessNodeTitleEnum.SubstituteRentalVehicle:
      return {
        headline: "Rental vehicle support explained",
        summary:
          "This step tracks temporary vehicle support while the primary vehicle claim is progressing.",
        nextStep:
          "Rental coverage usually remains informational unless its duration or eligibility changes.",
        userAction:
          "Check whether the listed duration and model match what was communicated to you.",
        confidenceLabel: "Simulated AI explanation",
      };

    case ClaimProcessNodeTitleEnum.FileReview:
      return {
        headline: "File review step explained",
        summary:
          "The insurer is currently reviewing the collected documents, claim sequence, and expert findings before moving forward.",
        nextStep:
          "If the review is successful, the process can continue to deductions, final checks, or payment preparation.",
        userAction:
          "You usually only need to act if the insurer requests a new document or clarification.",
        confidenceLabel: "Simulated AI explanation",
      };

    case ClaimProcessNodeTitleEnum.DeductionReason:
      return {
        headline: "Deduction step explained",
        summary:
          "This step means the insurer identified factors that may reduce or affect the final payable amount. It often includes supporting document requests.",
        nextStep:
          "The file can proceed more smoothly once the requested supporting evidence is submitted and reviewed.",
        userAction: `Pay close attention to the requested action: ${processNode.actionRequired}.`,
        confidenceLabel: "Simulated AI explanation",
      };

    case ClaimProcessNodeTitleEnum.PaymentInformation:
      return {
        headline: "Payment information step explained",
        summary:
          "This step contains the intended payment recipient and transfer information that may be used once the claim reaches the settlement stage.",
        nextStep:
          "If all previous checks are complete, the file can move toward final payment execution or closure.",
        userAction:
          "Verify the payee, amount, and IBAN information for accuracy.",
        confidenceLabel: "Simulated AI explanation",
      };

    case ClaimProcessNodeTitleEnum.Closed:
      return {
        headline: "Closed step explained",
        summary:
          "This step indicates the claim lifecycle is considered complete from the system perspective.",
        nextStep:
          "No additional claim workflow steps are expected after closure unless the file is reopened.",
        userAction:
          "Only review the closure details if you believe the case was finalized incorrectly.",
        confidenceLabel: "Simulated AI explanation",
      };
  }
}

export async function simulateAiExplanation(
  processNode: ClaimDisplayProcessNode,
): Promise<ClaimAiExplanation> {
  await delay();

  if (isUserInsertedNode(processNode)) {
    return buildExplanationForUserInsertedNode(processNode);
  }

  const explanation = buildExplanationForBaseNode(processNode);

  return {
    ...explanation,
    summary: `${explanation.summary} Context: ${getProcessNodeSummary(processNode)}.`,
  };
}
