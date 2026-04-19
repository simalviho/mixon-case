"use client";

import { useQuery } from "@tanstack/react-query";

import { getClaimSummaries } from "@/lib/api/claims";

import { ClaimsHero } from "./ClaimsHero";
import { ClaimsList } from "./ClaimsList";
import { ClaimsStats } from "./ClaimsStats";

export function ClaimsHomePage() {
  const {
    data: claimSummaries = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["claim-summaries"],
    queryFn: getClaimSummaries,
  });

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <ClaimsHero />
      <ClaimsStats claimSummaries={claimSummaries} isLoading={isPending} />
      <ClaimsList
        claimSummaries={claimSummaries}
        isLoading={isPending}
        isError={isError}
      />
    </main>
  );
}
