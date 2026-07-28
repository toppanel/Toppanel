/**
 * Small decorative motifs borrowed from real partition-door hardware —
 * hinge pins, a numbered door plate, and the classic vacant/occupied
 * indicator lens — reused across homepage sections to keep the
 * "cubicle" identity visible in the UI chrome, not just the product photos.
 */

export function HingeRail({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute left-0 inset-y-0 w-2.5 flex flex-col justify-evenly py-7 pointer-events-none ${className}`}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-6 w-[3px] rounded-r-full bg-border group-hover:bg-navy transition-colors duration-300"
        />
      ))}
    </div>
  );
}

export function DoorPlate({ n }: { n: number }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-sm border border-border bg-off px-2 py-1 shadow-sm">
      <span className="text-[8px] font-bold tracking-widest text-muted">NO.</span>
      <span className="text-[12px] font-bold text-ink tabular-nums leading-none">
        {String(n).padStart(2, "0")}
      </span>
    </div>
  );
}

export function DoorIndicator({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-off pl-2.5 pr-3.5 py-1.5">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2E7D4F] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2E7D4F]" />
      </span>
      <span className="text-[11px] font-semibold tracking-wide text-ink whitespace-nowrap">{label}</span>
    </div>
  );
}
