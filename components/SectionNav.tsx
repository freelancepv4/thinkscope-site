"use client";
import { useEffect, useRef, useState } from "react";

export interface NavItem { id: string; label: string }

export default function SectionNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-30% 0px -60% 0px" });
    els.forEach((e) => io.observe(e));
    const onScroll = () => {
      const a = document.querySelector("article"); if (!a || !bar.current) return;
      const r = a.getBoundingClientRect(), span = r.height - window.innerHeight;
      bar.current.style.transform = `scaleX(${span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0})`;
    };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, [items]);
  return (
    <nav className="sn" aria-label="Sections in this article">
      <div className="snb" ref={bar} aria-hidden="true" />
      <div className="sni">{items.map((i) => <a key={i.id} href={`#${i.id}`} aria-current={active === i.id ? "true" : undefined}>{i.label}</a>)}</div>
    </nav>
  );
}
