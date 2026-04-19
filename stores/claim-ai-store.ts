import { create } from "zustand";

import {
  ClaimAiExplanation,
  getProcessNodeAiKey,
  simulateAiExplanation,
} from "@/lib/api/claim-ai";
import type { ClaimDisplayProcessNode } from "@/types/index";

type ClaimAiStoreState = {
  loadingExplanationKey: string | null;
  explanationsByKey: Record<string, ClaimAiExplanation>;
  explainNode: (processNode: ClaimDisplayProcessNode) => Promise<void>;
};

export const useClaimAiStore = create<ClaimAiStoreState>((set, get) => ({
  loadingExplanationKey: null,
  explanationsByKey: {},

  explainNode: async (processNode) => {
    const processNodeKey = getProcessNodeAiKey(processNode);
    const existingExplanation = get().explanationsByKey[processNodeKey];

    if (existingExplanation) {
      return;
    }

    set({
      loadingExplanationKey: processNodeKey,
    });

    const explanation = await simulateAiExplanation(processNode);

    set((state) => ({
      loadingExplanationKey: null,
      explanationsByKey: {
        ...state.explanationsByKey,
        [processNodeKey]: explanation,
      },
    }));
  },
}));
