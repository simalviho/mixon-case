type ProcessNodeInfoItem = {
  label: string;
  value: string;
};

type ProcessNodeInfoGridProps = {
  items: ProcessNodeInfoItem[];
};

export function ProcessNodeInfoGrid({ items }: ProcessNodeInfoGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={`${item.label}-${item.value}`}
          className="rounded-2xl bg-muted/40 p-4"
        >
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {item.label}
          </p>
          <p className="mt-2 text-sm font-medium leading-6 text-foreground">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
