import {
  AlertTriangle,
  Clock3,
  FileText,
  ShieldAlert,
  Upload,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ClaimOverviewCardProps = {
  fileNo: string;
  currentStatus: string;
  estimatedRemainingTime: string;
  primaryActionLabel: string;
};

type OverviewMetricCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  emphasized?: boolean;
};

function OverviewMetricCard({
  icon,
  label,
  value,
  emphasized = false,
}: OverviewMetricCardProps) {
  if (emphasized) {
    return (
      <Card className="rounded-2xl border-amber-200 bg-amber-50 py-4 shadow-sm">
        <CardContent className="flex h-full flex-col p-4">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="inline-flex rounded-2xl bg-background p-2 shadow-sm">
              {icon}
            </div>

            <Badge className="w-fit border-amber-200 bg-background text-amber-700 hover:bg-background">
              Attention needed
            </Badge>
          </div>

          <div className="mb-4 space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {label}
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              This step needs your attention before the claim can continue
              smoothly.
            </p>
          </div>

          <div className="mb-4 rounded-2xl bg-background p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-700" />
              <p className="text-sm font-medium leading-6 text-foreground">
                {value}
              </p>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <Button className="w-full rounded-full">
              Review required action
            </Button>

            <Button
              variant="outline"
              className="w-full rounded-full border-amber-200 bg-background text-amber-700 hover:bg-amber-100 hover:text-amber-800"
            >
              <Upload className="mr-2 size-4" />
              Upload doc
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl bg-muted/40 shadow-sm">
      <CardContent className="p-4">
        <div className="mb-3 inline-flex rounded-2xl bg-background p-2 shadow-sm">
          {icon}
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {label}
          </p>
          <p className="text-sm font-semibold leading-6 text-foreground">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function ClaimOverviewCard({
  fileNo,
  currentStatus,
  estimatedRemainingTime,
  primaryActionLabel,
}: ClaimOverviewCardProps) {
  return (
    <Card className="rounded-3xl shadow-sm">
      <CardHeader className="space-y-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          <FileText className="size-4" />
          Orchestrator overview
        </div>

        <div className="space-y-2">
          <CardTitle className="text-xl md:text-2xl">
            Claim summary for file {fileNo}
          </CardTitle>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            This view is designed to answer the most important claim questions
            immediately: current stage, estimated remaining time, and required
            action.
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-[minmax(220px,1fr)_1fr]">
          <div className="flex flex-col gap-4">
            <OverviewMetricCard
              icon={<ShieldAlert className="size-5" />}
              label="Current status"
              value={currentStatus}
            />

            <OverviewMetricCard
              icon={<Clock3 className="size-5" />}
              label="Estimated remaining"
              value={estimatedRemainingTime}
            />
          </div>

          <OverviewMetricCard
            icon={<AlertTriangle className="size-5 text-amber-700" />}
            label="Next action"
            value={primaryActionLabel}
            emphasized
          />
        </div>
      </CardContent>
    </Card>
  );
}
