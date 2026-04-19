import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getDisplayStepState,
  getProcessNodeSummary,
  isUserInsertedNode,
} from "@/lib/utils/claim-detail";
import { getClaimStepVisualConfig } from "@/lib/utils/claim-step-visuals";
import type { ClaimDisplayProcessNode } from "@/types/index";

type ClaimProgressStepperProps = {
  processDetails: ClaimDisplayProcessNode[];
  activeNodeTitle?: string;
};

export function ClaimProgressStepper({
  processDetails,
  activeNodeTitle,
}: ClaimProgressStepperProps) {
  return (
    <Card className="rounded-3xl shadow-sm">
      <CardHeader className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Claim progress
        </p>
        <CardTitle className="text-lg">Track your claim journey</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <div className="flex min-w-max items-start px-2 pt-4 pb-2 xl:min-w-0">
            {processDetails.map((processNode, processNodeIndex) => {
              const stepState = getDisplayStepState(processNode);
              const defaultStepVisualConfig =
                getClaimStepVisualConfig(stepState);
              const StepIcon = defaultStepVisualConfig.icon;

              const isFirstItem = processNodeIndex === 0;
              const isLastItem = processNodeIndex === processDetails.length - 1;
              const isInserted = isUserInsertedNode(processNode);

              const isActive =
                !isInserted && processNode.title === activeNodeTitle;

              const processNodeKey = isInserted
                ? processNode.id
                : `${processNode.title}-${processNodeIndex}`;

              const badgeLabel = isInserted
                ? "User added"
                : defaultStepVisualConfig.label;

              const badgeClassName = isInserted
                ? "border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-50"
                : defaultStepVisualConfig.badgeClassName;

              const circleClassName = isInserted
                ? "border-violet-200 bg-violet-50 text-violet-700"
                : defaultStepVisualConfig.stepperCircleClassName;

              return (
                <div
                  key={processNodeKey}
                  className="relative min-w-60 flex-1 px-3 text-center"
                >
                  <div className="relative flex justify-center">
                    {!isFirstItem ? (
                      <div className="absolute top-5 left-0 right-1/2 h-px bg-border" />
                    ) : null}

                    {!isLastItem ? (
                      <div className="absolute top-5 left-1/2 right-0 h-px bg-border" />
                    ) : null}

                    <div className="relative z-10 flex justify-center overflow-visible">
                      <div
                        className={[
                          "flex size-10 items-center justify-center rounded-full border bg-background shadow-sm",
                          circleClassName,
                        ].join(" ")}
                      >
                        <StepIcon className="size-4" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col items-center space-y-3 px-2">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground">
                        {processNode.title}
                      </h3>

                      <Badge className={badgeClassName}>{badgeLabel}</Badge>

                      {isActive ? (
                        <Badge variant="secondary">Active</Badge>
                      ) : null}
                    </div>

                    <p className="max-w-47.5 text-sm leading-6 text-muted-foreground">
                      {getProcessNodeSummary(processNode)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
