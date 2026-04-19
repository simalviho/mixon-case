import type { InformationNoteNode } from "@/types/index";
import { ProcessNodeCardShell } from "./ProcessNodeCardShell";

type InformationNoteNodeCardProps = {
  processNode: InformationNoteNode;
};

export function InformationNoteNodeCard({
  processNode,
}: InformationNoteNodeCardProps) {
  return (
    <ProcessNodeCardShell
      summary={`This note was added manually after ${processNode.insertAfterTitle}.`}
    >
      <div className="rounded-2xl bg-muted/40 p-4">
        <p className="text-sm leading-6 text-foreground">{processNode.note}</p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Inserted after {processNode.insertAfterTitle}
          </p>
          <p className="text-xs text-muted-foreground">
            Added at {new Date(processNode.createdAt).toLocaleString("en-GB")}
          </p>
        </div>
      </div>
    </ProcessNodeCardShell>
  );
}
