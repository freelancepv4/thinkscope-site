"use client";
import { useEffect, useRef, useState } from "react";

type Mode = "sound" | "inview";
interface Props { src: string; poster: string; posterW: number; posterH: number; alt: string; label: string; ratio: "16/9" | "9/16"; mode?: Mode; priority?: boolean }

function Icon({ d }: { d: string[] }) {
  return (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d.map((p) => <path key={p} d={p} />)}</svg>);
}
const SPK = "M11 5 6 9H2v6h4l5 4V5z";
const I = { on: [SPK, "M15.5 8.5a5 5 0 0 1 0 7", "M19 5a10 10 0 0 1 0 14"], off: [SPK, "M23 9l-6 6", "M17 9l6 6"], play: ["M6 4l14 8-14 8V4z"], pause: ["M8 5v14", "M16 5v14"], full: ["M4 9V4h5", "M20 9V4h-5", "M4 15v5h5", "M20 15v5h-5"] };

export default function VideoPlayer({ src, poster, posterW, posterH, alt, label, ratio, mode = "sound", priority = false }: Props) {
  const box = useRef<HTMLElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [prog, setProg] = useState(0);
  const [canFull, setCanFull] = useState(false);

  useEffect(() => {
    const v = ref.current; if (!v) return;
    setCanFull(!!document.fullscreenEnabled);
    const sync = () => { setPaused(v.paused); setMuted(v.muted); };
    const onTime = () => setProg(v.duration ? v.currentTime / v.duration : 0);
    const onPlaying = () => setStarted(true);
    const ev = ["play", "pause", "volumechange"];
    ev.forEach((e) => v.addEventListener(e, sync));
    v.addEventListener("playing", onPlaying); v.addEventListener("timeupdate", onTime);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let io: IntersectionObserver | undefined;
    if (!reduce && mode === "sound") {
      // One attempt only: sound first, then muted, then poster + Play button.
      (async () => {
        v.muted = false;
        try { await v.play(); } catch { v.muted = true; v.loop = true; try { await v.play(); } catch { /* show Play button */ } }
        sync();
      })();
    } else if (!reduce && mode === "inview") {
      v.muted = true; v.loop = true;
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !userPaused.current) v.play().catch(() => {});
        else if (!e.isIntersecting) v.pause();
      }, { threshold: 0.5 });
      io.observe(v);
    }
    return () => { ev.forEach((e) => v.removeEventListener(e, sync)); v.removeEventListener("playing", onPlaying); v.removeEventListener("timeupdate", onTime); io?.disconnect(); };
  }, [mode]);

  const togglePlay = () => { const v = ref.current; if (!v) return; if (v.paused) { userPaused.current = false; v.play().catch(() => {}); } else { userPaused.current = true; v.pause(); } };
  const toggleSound = () => { const v = ref.current; if (!v) return; v.muted = !v.muted; v.loop = v.muted; if (v.paused) v.play().catch(() => {}); };
  const bigPlay = () => { const v = ref.current; if (!v) return; userPaused.current = false; v.muted = mode === "inview"; v.loop = v.muted; v.play().catch(() => { v.muted = true; v.play().catch(() => {}); }); };
  const full = () => { void box.current?.requestFullscreen?.(); };

  return (
    <figure ref={box} className={`hv${ratio === "16/9" ? " hl" : ""}${failed ? " nov" : ""}`} style={{ aspectRatio: ratio }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hvp" src={poster} width={posterW} height={posterH} alt={alt} loading={priority ? "eager" : "lazy"} />
      <video ref={ref} src={src} poster={poster} playsInline preload={priority ? "auto" : "metadata"} aria-label={label} onError={() => setFailed(true)} />
      {paused && !started && !failed && <button className="hbp" type="button" onClick={bigPlay} aria-label="Play video"><Icon d={I.play} /> Play</button>}
      <div className="hvc">
        <button type="button" onClick={togglePlay} aria-label={paused ? "Play video" : "Pause video"} title={paused ? "Play" : "Pause"}><Icon d={paused ? I.play : I.pause} /></button>
        <button type="button" onClick={toggleSound} aria-label={muted ? "Enable sound" : "Mute video"} aria-pressed={!muted} title={muted ? "Sound off. Click to unmute" : "Sound on. Click to mute"}><Icon d={muted ? I.off : I.on} /></button>
        {canFull && <button type="button" onClick={full} aria-label="Fullscreen" title="Fullscreen"><Icon d={I.full} /></button>}
      </div>
      <i className="hvpg" aria-hidden="true" style={{ transform: `scaleX(${prog})` }} />
    </figure>
  );
}
