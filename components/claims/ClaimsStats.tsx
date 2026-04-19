import { AlertCircle, CheckCircle2, Clock3, Files } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { ClaimSummary } from "@/types/index";

type ClaimsStatsProps = {
  claimSummaries: ClaimSummary[];
  isLoading: boolean;
};

type StatItem = {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function ClaimsStats({ claimSummaries, isLoading }: ClaimsStatsProps) {
  const totalClaims = claimSummaries.length;
  const actionRequiredClaims = claimSummaries.filter(
    (claimSummary) => claimSummary.actionRequired,
  ).length;
  const openClaims = claimSummaries.filter(
    (claimSummary) => claimSummary.estimatedRemainingDays !== null,
  ).length;
  const closedClaims = claimSummaries.filter(
    (claimSummary) => claimSummary.estimatedRemainingDays === null,
  ).length;

  const statItems: StatItem[] = [
    {
      title: "Total claims",
      value: isLoading ? "..." : String(totalClaims),
      icon: Files,
    },
    {
      title: "Open claims",
      value: isLoading ? "..." : String(openClaims),
      icon: Clock3,
    },
    {
      title: "Action required",
      value: isLoading ? "..." : String(actionRequiredClaims),
      icon: AlertCircle,
    },
    {
      title: "Closed claims",
      value: isLoading ? "..." : String(closedClaims),
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statItems.map((statItem) => {
        const Icon = statItem.icon;

        return (
          <Card key={statItem.title} className="rounded-2xl shadow-sm">
            <CardContent className="flex items-start justify-between gap-4 p-5">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {statItem.title}
                </p>
                <p className="text-2xl font-semibold text-foreground">
                  {statItem.value}
                </p>
              </div>

              <div className="rounded-xl bg-muted p-2">
                <Icon className="size-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
