import { FileSearch } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function ClaimsEmptyState() {
  return (
    <Card className="rounded-2xl border-dashed shadow-sm">
      <CardContent className="p-10 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-muted">
          <FileSearch className="size-5 text-muted-foreground" />
        </div>

        <h2 className="text-lg font-semibold text-foreground">
          No matching claims found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Try changing your search term or removing the action-required filter.
        </p>
      </CardContent>
    </Card>
  );
}
