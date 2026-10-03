import type { ReactNode } from "react";
import { BADGES, LABELS, type BadgeKind, type LabelKind, type Src } from "@/lib/odyssey-compare";

/** Five-way claim classification. The definition is exposed as a tooltip and to assistive tech. */
export function Lab({ kind, children }: { kind: LabelKind; children?: string }) {
  const l = LABELS[kind];
  return <span className="od-lab" data-k={kind} title={l.def}>{children ?? l.name}<span className="od-vh">: {l.def}</span></span>;
}

/** Row-level badge used inside the matrix. Kept separate from Lab so categories are never blended. */
export function Badge({ kind }: { kind: BadgeKind }) {
  return <span className="od-bd" data-k={kind}>{BADGES[kind]}</span>;
}

export function SrcList({ items, label = "Sources" }: { items: Src[]; label?: string }) {
  if (!items.length) return null;
  return (
    <p className="od-src"><b>{label}:</b>{" "}
      {items.map((s, i) => <span key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>{i < items.length - 1 ? " · " : ""}</span>)}
    </p>
  );
}

export function Head({ id, kicker, title, sub, kind, children }: { id: string; kicker?: string; title: string; sub?: string; kind?: LabelKind; children?: ReactNode }) {
  return (
    <div className="od-head">
      {kicker && <p className="od-kicker">{kicker}</p>}
      <h2 id={`${id}-h`}>{title}</h2>
      {sub && <p className="od-sub">{sub}</p>}
      {kind && <p className="od-labrow"><Lab kind={kind} /></p>}
      {children}
    </div>
  );
}
