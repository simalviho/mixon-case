export type ClaimSummary = {
  id: string;
  fileNo: string;
  title: string;
  currentStatusLabel: string;
  estimatedRemainingDays: number | null;
  actionRequired: boolean;
  updatedAt: string;
};

export enum ClaimProcessNodeTitleEnum {
  TowingService = "Towing Service",
  ClaimNotification = "Claim Notification",
  Appraisal = "Appraisal",
  SubstituteRentalVehicle = "Substitute Rental Vehicle",
  FileReview = "File Review",
  DeductionReason = "Deduction Reason",
  PaymentInformation = "Payment Information",
  Closed = "Closed",
}

export enum ClaimProcessNodeKindEnum {
  TowingService = "towing_service",
  ClaimNotification = "claim_notification",
  Appraisal = "appraisal",
  SubstituteRentalVehicle = "substitute_rental_vehicle",
  FileReview = "file_review",
  DeductionReason = "deduction_reason",
  PaymentInformation = "payment_information",
  Closed = "closed",
  InformationNote = "information_note",
  AdditionalAttachment = "additional_attachment",
}

export type BaseClaimProcessNode = {
  title: ClaimProcessNodeTitleEnum;
  status: string;
};

export type TowingServiceNode = BaseClaimProcessNode & {
  title: ClaimProcessNodeTitleEnum.TowingService;
  pickupLocation: string;
  towingDate: string;
};

export type ClaimNotificationNode = BaseClaimProcessNode & {
  title: ClaimProcessNodeTitleEnum.ClaimNotification;
  dateTime: string;
  reportType: string;
  reasonForDamage: string;
  reportingParty: string;
  contact: string;
};

export type AppraisalNode = BaseClaimProcessNode & {
  title: ClaimProcessNodeTitleEnum.Appraisal;
  expertAssignmentDate: string;
  expertInfo: string;
  contact: string;
};

export type SubstituteRentalVehicleNode = BaseClaimProcessNode & {
  title: ClaimProcessNodeTitleEnum.SubstituteRentalVehicle;
  vehicleDuration: string;
  vehicleModel: string;
  extraDuration: string;
};

export type FileReviewNode = BaseClaimProcessNode & {
  title: ClaimProcessNodeTitleEnum.FileReview;
  reviewReferralDate: string;
  reviewCompletionDate: string;
};

export type DeductionReasonNode = BaseClaimProcessNode & {
  title: ClaimProcessNodeTitleEnum.DeductionReason;
  actionRequired: string;
  occupationalDeduction: string;
  appreciationDeduction: string;
  policyDeductible: string;
  nonDamageAmount: string;
};

export type PaymentInformationNode = BaseClaimProcessNode & {
  title: ClaimProcessNodeTitleEnum.PaymentInformation;
  paidTo: string;
  iban: string;
  paymentAmount: string;
  note: string;
};

export type ClosedNode = BaseClaimProcessNode & {
  title: ClaimProcessNodeTitleEnum.Closed;
  completionDate: string;
};

export type ClaimSystemProcessNode =
  | TowingServiceNode
  | ClaimNotificationNode
  | AppraisalNode
  | SubstituteRentalVehicleNode
  | FileReviewNode
  | DeductionReasonNode
  | PaymentInformationNode
  | ClosedNode;

export type ClaimProcessNode = ClaimSystemProcessNode;

export type ClaimDetail = {
  title: string;
  fileNo: string;
  estimatedRemainingTime: string;
  currentStatus: string;
  processDetails: ClaimSystemProcessNode[];
};

type UserInsertedNodeBase = {
  id: string;
  createdAt: string;
  insertAfterTitle: ClaimProcessNodeTitleEnum;
  isInsertedByUser: true;
};

export type InformationNoteNode = UserInsertedNodeBase & {
  kind: ClaimProcessNodeKindEnum.InformationNote;
  title: "Information Note";
  status: "Added by user";
  note: string;
};

export type AdditionalAttachmentNode = UserInsertedNodeBase & {
  kind: ClaimProcessNodeKindEnum.AdditionalAttachment;
  title: "Additional Attachment";
  status: "Uploaded by user";
  fileName: string;
  documentType: string;
};

export type ClaimInsertedProcessNode =
  | InformationNoteNode
  | AdditionalAttachmentNode;

export type UserInsertedProcessNode = ClaimInsertedProcessNode;

export type ClaimDisplayProcessNode =
  | ClaimSystemProcessNode
  | ClaimInsertedProcessNode;
