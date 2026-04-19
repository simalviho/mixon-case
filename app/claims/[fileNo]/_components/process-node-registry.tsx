import type { ReactElement } from "react";

import type {
  ClaimDisplayProcessNode,
  ClaimInsertedProcessNode,
  ClaimSystemProcessNode,
} from "@/types/index";
import {
  ClaimProcessNodeKindEnum,
  ClaimProcessNodeTitleEnum,
} from "@/types/index";

import { AdditionalAttachmentNodeCard } from "./process-nodes/AdditionalAttachmentNodeCard";
import { AppraisalNodeCard } from "./process-nodes/AppraisalNodeCard";
import { ClaimNotificationNodeCard } from "./process-nodes/ClaimNotificationNodeCard";
import { ClosedNodeCard } from "./process-nodes/ClosedNodeCard";
import { DeductionReasonNodeCard } from "./process-nodes/DeductionReasonNodeCard";
import { FileReviewNodeCard } from "./process-nodes/FileReviewNodeCard";
import { InformationNoteNodeCard } from "./process-nodes/InformationNoteNodeCard";
import { PaymentInformationNodeCard } from "./process-nodes/PaymentInformationNodeCard";
import { SubstituteRentalVehicleNodeCard } from "./process-nodes/SubstituteRentalVehicleNodeCard";
import { TowingServiceNodeCard } from "./process-nodes/TowingServiceNodeCard";

type SystemNodeOfTitle<Title extends ClaimProcessNodeTitleEnum> = Extract<
  ClaimSystemProcessNode,
  { title: Title }
>;

type InsertedNodeOfKind<Kind extends ClaimProcessNodeKindEnum> = Extract<
  ClaimInsertedProcessNode,
  { kind: Kind }
>;

type SystemProcessNodeRegistry = {
  [Title in ClaimProcessNodeTitleEnum]: (
    processNode: SystemNodeOfTitle<Title>,
  ) => ReactElement;
};

type InsertedProcessNodeKind =
  | ClaimProcessNodeKindEnum.InformationNote
  | ClaimProcessNodeKindEnum.AdditionalAttachment;

type InsertedProcessNodeRegistry = {
  [Kind in InsertedProcessNodeKind]: (
    processNode: InsertedNodeOfKind<Kind>,
  ) => ReactElement;
};

export const systemProcessNodeRegistry: SystemProcessNodeRegistry = {
  [ClaimProcessNodeTitleEnum.TowingService]: (processNode) => (
    <TowingServiceNodeCard processNode={processNode} />
  ),
  [ClaimProcessNodeTitleEnum.ClaimNotification]: (processNode) => (
    <ClaimNotificationNodeCard processNode={processNode} />
  ),
  [ClaimProcessNodeTitleEnum.Appraisal]: (processNode) => (
    <AppraisalNodeCard processNode={processNode} />
  ),
  [ClaimProcessNodeTitleEnum.SubstituteRentalVehicle]: (processNode) => (
    <SubstituteRentalVehicleNodeCard processNode={processNode} />
  ),
  [ClaimProcessNodeTitleEnum.FileReview]: (processNode) => (
    <FileReviewNodeCard processNode={processNode} />
  ),
  [ClaimProcessNodeTitleEnum.DeductionReason]: (processNode) => (
    <DeductionReasonNodeCard processNode={processNode} />
  ),
  [ClaimProcessNodeTitleEnum.PaymentInformation]: (processNode) => (
    <PaymentInformationNodeCard processNode={processNode} />
  ),
  [ClaimProcessNodeTitleEnum.Closed]: (processNode) => (
    <ClosedNodeCard processNode={processNode} />
  ),
};

export const insertedProcessNodeRegistry: InsertedProcessNodeRegistry = {
  [ClaimProcessNodeKindEnum.InformationNote]: (processNode) => (
    <InformationNoteNodeCard processNode={processNode} />
  ),
  [ClaimProcessNodeKindEnum.AdditionalAttachment]: (processNode) => (
    <AdditionalAttachmentNodeCard processNode={processNode} />
  ),
};

export function renderSystemProcessNode(
  processNode: ClaimSystemProcessNode,
): ReactElement {
  switch (processNode.title) {
    case ClaimProcessNodeTitleEnum.TowingService:
      return systemProcessNodeRegistry[ClaimProcessNodeTitleEnum.TowingService](
        processNode,
      );

    case ClaimProcessNodeTitleEnum.ClaimNotification:
      return systemProcessNodeRegistry[
        ClaimProcessNodeTitleEnum.ClaimNotification
      ](processNode);

    case ClaimProcessNodeTitleEnum.Appraisal:
      return systemProcessNodeRegistry[ClaimProcessNodeTitleEnum.Appraisal](
        processNode,
      );

    case ClaimProcessNodeTitleEnum.SubstituteRentalVehicle:
      return systemProcessNodeRegistry[
        ClaimProcessNodeTitleEnum.SubstituteRentalVehicle
      ](processNode);

    case ClaimProcessNodeTitleEnum.FileReview:
      return systemProcessNodeRegistry[ClaimProcessNodeTitleEnum.FileReview](
        processNode,
      );

    case ClaimProcessNodeTitleEnum.DeductionReason:
      return systemProcessNodeRegistry[
        ClaimProcessNodeTitleEnum.DeductionReason
      ](processNode);

    case ClaimProcessNodeTitleEnum.PaymentInformation:
      return systemProcessNodeRegistry[
        ClaimProcessNodeTitleEnum.PaymentInformation
      ](processNode);

    case ClaimProcessNodeTitleEnum.Closed:
      return systemProcessNodeRegistry[ClaimProcessNodeTitleEnum.Closed](
        processNode,
      );

    default: {
      const unhandledProcessNode: never = processNode;
      throw new Error(
        `Unhandled system process node title: ${JSON.stringify(unhandledProcessNode)}`,
      );
    }
  }
}

export function renderInsertedProcessNode(
  processNode: ClaimInsertedProcessNode,
): ReactElement {
  switch (processNode.kind) {
    case ClaimProcessNodeKindEnum.InformationNote:
      return insertedProcessNodeRegistry[
        ClaimProcessNodeKindEnum.InformationNote
      ](processNode);

    case ClaimProcessNodeKindEnum.AdditionalAttachment:
      return insertedProcessNodeRegistry[
        ClaimProcessNodeKindEnum.AdditionalAttachment
      ](processNode);

    default: {
      const unhandledProcessNode: never = processNode;
      throw new Error(
        `Unhandled inserted process node kind: ${JSON.stringify(unhandledProcessNode)}`,
      );
    }
  }
}

export function isRenderableProcessNode(
  processNode: ClaimDisplayProcessNode,
): boolean {
  if ("isInsertedByUser" in processNode && processNode.isInsertedByUser) {
    return processNode.kind in insertedProcessNodeRegistry;
  }

  return processNode.title in systemProcessNodeRegistry;
}
