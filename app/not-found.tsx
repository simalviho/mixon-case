import { AlertCircle, FileSearch, Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <Card className="w-full max-w-2xl border-border/60 shadow-sm">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-destructive/10">
              <AlertCircle className="size-7 text-destructive" />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium tracking-wide text-muted-foreground">
                404 · Page not found
              </p>
              <CardTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
                The page you are looking for does not exist
              </CardTitle>
              <p className="mx-auto max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                The link may be broken, the page may have been moved, or the
                address might be incorrect. You can return to the dashboard or
                open the demo claim detail page.
              </p>
            </div>
          </CardHeader>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/">
                <Home className="mr-2 size-4" />
                Go to homepage
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <Link href="/claims/9239182380">
                <FileSearch className="mr-2 size-4" />
                Open demo claim
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
