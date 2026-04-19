import { ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function ClaimsHero() {
  return (
    <Card className="overflow-hidden rounded-3xl shadow-sm">
      <CardContent className="grid gap-6 p-6 md:grid-cols-[1.5fr_1fr] md:p-8">
        <div className="space-y-4">
          <Badge
            variant="secondary"
            className="inline-flex rounded-full px-3 py-1 text-sm font-medium"
          >
            <ShieldCheck className="mr-2 size-4" />
            AI-Powered Claim Portal
          </Badge>

          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              My Claims
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              Track your files, understand the current step, and quickly spot
              claims that need action.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
