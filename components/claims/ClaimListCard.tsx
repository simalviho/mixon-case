import { AlertTriangle, ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDateLabel, formatRelativeDays } from "@/lib/utils/format";
import type { ClaimSummary } from "@/types/index";

type ClaimListCardProps = {
  claimSummary: ClaimSummary;
};

const SUPPORTED_CLAIM_FILE_NO = "9239182380";

function renderStatusIcon(claimSummary: ClaimSummary) {
  if (claimSummary.actionRequired) {
    return <AlertTriangle className="size-5 text-muted-foreground" />;
  }

  if (claimSummary.estimatedRemainingDays === null) {
    return <CheckCircle2 className="size-5 text-muted-foreground" />;
  }

  return <Clock3 className="size-5 text-muted-foreground" />;
}

function renderClaimStatusBadge(claimSummary: ClaimSummary) {
  if (claimSummary.actionRequired) {
    return (
      <Badge className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50">
        Action required
      </Badge>
    );
  }

  if (claimSummary.estimatedRemainingDays === null) {
    return (
      <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
        Completed
      </Badge>
    );
  }

  return (
    <Badge className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50">
      In progress
    </Badge>
  );
}

function renderSupportBadge(fileNo: string) {
  const isDetailSupported = fileNo === SUPPORTED_CLAIM_FILE_NO;

  if (isDetailSupported) {
    return (
      <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
        Full demo available
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="text-muted-foreground">
      Limited preview
    </Badge>
  );
}

export function ClaimListCard({ claimSummary }: ClaimListCardProps) {
  return (
    <Link href={`/claims/${claimSummary.fileNo}`} className="group block">
      <Card className="rounded-2xl p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <article className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="rounded-2xl bg-muted p-3">
              {renderStatusIcon(claimSummary)}
            </div>

            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  File No
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {claimSummary.fileNo}
                </span>
                {renderSupportBadge(claimSummary.fileNo)}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {claimSummary.currentStatusLabel}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {claimSummary.title}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>
                  Estimated remaining:{" "}
                  <strong className="font-semibold text-foreground">
                    {formatRelativeDays(claimSummary.estimatedRemainingDays)}
                  </strong>
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-border md:block" />
                <span>Updated {formatDateLabel(claimSummary.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 md:justify-end">
            {renderClaimStatusBadge(claimSummary)}

            <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
              View details
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </span>
          </div>
        </article>
      </Card>
    </Link>
  );
}
