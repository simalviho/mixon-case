import { AlertCircle } from "lucide-react";

import { ClaimListCard } from "@/components/claims/ClaimListCard";
import { ClaimsEmptyState } from "@/components/claims/ClaimsEmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ClaimSummary } from "@/types/index";

type ClaimsListProps = {
  claimSummaries: ClaimSummary[];
  isLoading: boolean;
  isError: boolean;
};

export function ClaimsList({
  claimSummaries,
  isLoading,
  isError,
}: ClaimsListProps) {
  if (isError) {
    return (
      <Card className="border-destructive/20 bg-destructive/5 shadow-sm">
        <CardContent className="flex items-center gap-3 p-6 text-sm text-destructive">
          <AlertCircle className="size-4" />
          <span>Failed to load claims. Please try again.</span>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <section className="grid gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={`claim-skeleton-${index}`}
            className="h-36 rounded-2xl"
          />
        ))}
      </section>
    );
  }

  if (claimSummaries.length === 0) {
    return <ClaimsEmptyState />;
  }

  return (
    <section className="grid gap-4">
      {claimSummaries.map((claimSummary) => (
        <ClaimListCard key={claimSummary.id} claimSummary={claimSummary} />
      ))}
    </section>
  );
}
