import { create } from "zustand";

import {
  ClaimProcessNodeKindEnum,
  ClaimProcessNodeTitleEnum,
  type AdditionalAttachmentNode,
  type InformationNoteNode,
  type UserInsertedProcessNode,
} from "@/types/index";

type ClaimDetailUiState = {
  insertedNodes: UserInsertedProcessNode[];
  addInformationNote: (
    note: string,
    insertAfterTitle: ClaimProcessNodeTitleEnum,
  ) => void;
  addAdditionalAttachment: (
    fileName: string,
    documentType: string,
    insertAfterTitle: ClaimProcessNodeTitleEnum,
  ) => void;
  removeInsertedNode: (nodeId: string) => void;
  resetInsertedNodes: () => void;
};

function createNodeId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

export const useClaimDetailUiStore = create<ClaimDetailUiState>((set) => ({
  insertedNodes: [],

  addInformationNote: (note, insertAfterTitle) =>
    set((state) => {
      const newNode: InformationNoteNode = {
        id: createNodeId("note"),
        kind: ClaimProcessNodeKindEnum.InformationNote,
        title: "Information Note",
        status: "Added by user",
        note,
        createdAt: new Date().toISOString(),
        insertAfterTitle,
        isInsertedByUser: true,
      };

      return {
        insertedNodes: [...state.insertedNodes, newNode],
      };
    }),

  addAdditionalAttachment: (fileName, documentType, insertAfterTitle) =>
    set((state) => {
      const newNode: AdditionalAttachmentNode = {
        id: createNodeId("attachment"),
        kind: ClaimProcessNodeKindEnum.AdditionalAttachment,
        title: "Additional Attachment",
        status: "Uploaded by user",
        fileName,
        documentType,
        createdAt: new Date().toISOString(),
        insertAfterTitle,
        isInsertedByUser: true,
      };

      return {
        insertedNodes: [...state.insertedNodes, newNode],
      };
    }),

  removeInsertedNode: (nodeId) =>
    set((state) => ({
      insertedNodes: state.insertedNodes.filter(
        (insertedNode) => insertedNode.id !== nodeId,
      ),
    })),

  resetInsertedNodes: () => set({ insertedNodes: [] }),
}));
