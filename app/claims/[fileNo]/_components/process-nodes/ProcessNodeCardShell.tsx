import { Card, CardContent, CardHeader } from "@/components/ui/card";

type ProcessNodeCardShellProps = {
  summary?: string;
  children: React.ReactNode;
};

export function ProcessNodeCardShell({
  summary,
  children,
}: ProcessNodeCardShellProps) {
  return (
    <Card className="rounded-3xl shadow-sm">
      <CardHeader className="space-y-3">
        {summary ? (
          <p className="text-sm leading-6 text-muted-foreground">{summary}</p>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}
