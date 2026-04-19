import type { ClaimSummary } from "@/types/index";

export function filterClaimSummaries(
  claimSummaries: ClaimSummary[],
  searchValue: string,
  showOnlyActionRequired: boolean,
): ClaimSummary[] {
  const normalizedSearchValue = searchValue.trim().toLowerCase();

  return claimSummaries.filter((claimSummary) => {
    const matchesSearch =
      normalizedSearchValue.length === 0 ||
      claimSummary.fileNo.toLowerCase().includes(normalizedSearchValue) ||
      claimSummary.currentStatusLabel
        .toLowerCase()
        .includes(normalizedSearchValue) ||
      claimSummary.title.toLowerCase().includes(normalizedSearchValue);

    const matchesActionFilter =
      !showOnlyActionRequired || claimSummary.actionRequired;

    return matchesSearch && matchesActionFilter;
  });
}
