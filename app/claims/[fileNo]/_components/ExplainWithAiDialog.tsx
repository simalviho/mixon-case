"use client";

import {
  Bot,
  BrainCircuit,
  ScanSearch,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

import { ClaimAiExplanation, getProcessNodeAiKey } from "@/lib/api/claim-ai";
import { useClaimAiStore } from "@/stores/claim-ai-store";
import { useAiLoadingStages } from "@/stores/hooks/useAiLoadingStages";
import { useTypewriterText } from "@/stores/hooks/useTypewriterText";
import type { ClaimDisplayProcessNode } from "@/types/index";

type ExplainWithAiDialogProps = {
  processNode: ClaimDisplayProcessNode;
};

type TypewriterTextProps = {
  text: string;
  speed?: number;
  startTyping: boolean;
  className?: string;
};

function TypewriterText({
  text,
  speed = 16,
  startTyping,
  className,
}: TypewriterTextProps) {
  const visibleText = useTypewriterText({
    text,
    startTyping,
    speed,
  });

  return <p className={className}>{visibleText}</p>;
}

type AnimatedHeadlineProps = {
  text: string;
  isVisible: boolean;
};

function AnimatedHeadline({ text, isVisible }: AnimatedHeadlineProps) {
  return (
    <TypewriterText
      text={text}
      startTyping={isVisible}
      speed={20}
      className="text-lg font-semibold text-foreground"
    />
  );
}

type ExplanationContentProps = {
  explanation: ClaimAiExplanation;
  isVisible: boolean;
  animationKey: string;
};

function ExplanationContent({
  explanation,
  isVisible,
  animationKey,
}: ExplanationContentProps) {
  return (
    <div key={animationKey} className="space-y-5">
      <div className="rounded-2xl border border-primary/10 bg-linear-to-br from-primary/5 via-background to-background p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="gap-2 rounded-full">
            <Sparkles className="size-3.5" />
            {explanation.confidenceLabel}
          </Badge>

          <Badge variant="outline" className="rounded-full">
            Plain-language mode
          </Badge>
        </div>

        <div className="space-y-3">
          <AnimatedHeadline text={explanation.headline} isVisible={isVisible} />

          <TypewriterText
            text={explanation.summary}
            startTyping={isVisible}
            speed={12}
            className="text-sm leading-7 text-muted-foreground"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-muted/30 p-4 shadow-sm">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <BrainCircuit className="size-3.5" />
            Next step
          </div>

          <TypewriterText
            text={explanation.nextStep}
            startTyping={isVisible}
            speed={15}
            className="text-sm leading-6 text-foreground"
          />
        </div>

        <div className="rounded-2xl border bg-muted/30 p-4 shadow-sm">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <WandSparkles className="size-3.5" />
            Recommended action
          </div>

          <TypewriterText
            text={explanation.userAction}
            startTyping={isVisible}
            speed={15}
            className="text-sm leading-6 text-foreground"
          />
        </div>
      </div>
    </div>
  );
}

function LoadingStagesContent() {
  const { activeStageLabel, progressValue } = useAiLoadingStages({
    enabled: true,
  });

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-2xl border border-primary/10 bg-linear-to-br from-primary/10 via-background to-background p-5">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0 rounded-2xl bg-background p-3 shadow-sm">
            <ScanSearch className="size-6 animate-pulse text-primary" />
            <span className="absolute -right-1 -top-1 size-3 animate-ping rounded-full bg-primary" />
          </div>

          <div className="min-w-0 flex-1 space-y-3">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">
                Analyzing current step...
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                The assistant is reviewing claim context and translating the
                process into simpler language.
              </p>
            </div>

            <div className="space-y-2">
              <Progress value={progressValue} className="h-2" />
              <p className="text-xs font-medium text-primary">
                {activeStageLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border p-4">
          <Skeleton className="h-5 w-28 rounded-full" />
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-5/6" />
          <Skeleton className="mt-2 h-4 w-2/3" />
        </div>

        <div className="rounded-2xl border p-4">
          <Skeleton className="h-5 w-36 rounded-full" />
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-4/5" />
          <Skeleton className="mt-2 h-4 w-3/5" />
        </div>
      </div>
    </div>
  );
}

export function ExplainWithAiDialog({ processNode }: ExplainWithAiDialogProps) {
  const explainNode = useClaimAiStore((state) => state.explainNode);
  const loadingExplanationKey = useClaimAiStore(
    (state) => state.loadingExplanationKey,
  );
  const explanationsByKey = useClaimAiStore((state) => state.explanationsByKey);

  const [isOpen, setIsOpen] = useState(false);

  const processNodeKey = useMemo(() => {
    return getProcessNodeAiKey(processNode);
  }, [processNode]);

  const isLoading = loadingExplanationKey === processNodeKey;
  const explanation = explanationsByKey[processNodeKey];
  const shouldAnimateText = isOpen && Boolean(explanation) && !isLoading;
  const animationKey = `${processNodeKey}-${String(shouldAnimateText)}`;

  useEffect(() => {
    if (!isOpen || explanation || isLoading) {
      return;
    }

    void explainNode(processNode);
  }, [isOpen, explanation, isLoading, explainNode, processNode]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <WandSparkles className="size-4" />
          Explain with AI
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[calc(100vw-2rem)] max-w-none overflow-hidden rounded-3xl p-0 sm:max-w-2xl">
        <div className="relative flex max-h-[85vh] flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-primary/10 via-primary/5 to-transparent" />

          <div className="relative shrink-0 px-6 pt-6 pb-4">
            <DialogHeader className="space-y-3">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                <Bot className="size-4" />
                AI interpretation
              </div>

              <DialogTitle className="text-xl">
                Understand this step in plain language
              </DialogTitle>

              <DialogDescription className="text-sm leading-6">
                AI-generated guidance for{" "}
                <span className="font-medium">{processNode.title}</span>.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="relative min-h-0 flex-1 overflow-y-auto px-6 pb-6">
            <div className="mt-2">
              {isLoading || !explanation ? (
                <LoadingStagesContent key={processNodeKey} />
              ) : (
                <ExplanationContent
                  explanation={explanation}
                  isVisible={shouldAnimateText}
                  animationKey={animationKey}
                />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
