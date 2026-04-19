"use client";

import { useEffect, useState } from "react";

const DEFAULT_LOADING_STAGES = [
  "Reading claim context",
  "Checking process relationships",
  "Simplifying insurance terminology",
  "Preparing plain-language guidance",
];

type UseAiLoadingStagesParams = {
  enabled: boolean;
  stages?: string[];
};

type UseAiLoadingStagesResult = {
  activeStageLabel: string;
  progressValue: number;
};

export function useAiLoadingStages({
  enabled,
  stages = DEFAULT_LOADING_STAGES,
}: UseAiLoadingStagesParams): UseAiLoadingStagesResult {
  const [stageIndex, setStageIndex] = useState(0);
  const [progressValue, setProgressValue] = useState(12);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const stageIntervalId = window.setInterval(() => {
      setStageIndex((currentIndex) => {
        if (currentIndex >= stages.length - 1) {
          return currentIndex;
        }

        return currentIndex + 1;
      });
    }, 520);

    const progressIntervalId = window.setInterval(() => {
      setProgressValue((currentValue) => {
        if (currentValue >= 88) {
          return currentValue;
        }

        return currentValue + 9;
      });
    }, 260);

    return () => {
      window.clearInterval(stageIntervalId);
      window.clearInterval(progressIntervalId);
    };
  }, [enabled, stages.length]);

  return {
    activeStageLabel: stages[stageIndex],
    progressValue,
  };
}
