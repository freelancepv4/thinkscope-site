"use client";
import { useEffect, useRef, useState } from "react";
import { MEDIA } from "@/lib/data";

export default function VideoHero() {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const sync = () => { setPaused(v.paused); setMuted(v.muted); };
    const onPlaying = () => setStarted(true);
    const events = ["play", "pause", "volumechange"];
    events.forEach((e) => v.addEventListener(e, sync));
    v.addEventListener("playing", onPlaying);
    // One attempt only: sound first, then muted, then the poster and a Play button.
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      (async () => {
        v.muted = false;
        try { await v.play(); }
        catch { v.muted = true; v.loop = true; try { await v.play(); } catch { /* poster + Play button */ } }
        sync();
      })();
    }
    return () => { events.forEach((e) => v.removeEventListener(e, sync)); v.removeEventListener("playing", onPlaying); };
  }, []);

  const togglePlay = () => { const v = ref.current; if (v) void (v.paused ? v.play().catch(() => {}) : v.pause()); };
  const toggleSound = () => {
    const v = ref.current; if (!v) return;
    v.muted = !v.muted; v.loop = v.muted;
    if (v.paused) v.play().catch(() => {});
  };
  const bigPlay = () => {
    const v = ref.current; if (!v) return;
    v.muted = false; v.loop = false;
    v.play().catch(() => { v.muted = true; v.play().catch(() => {}); });
  };

  return (
    <figure className={`hv${failed ? " nov" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hvp" src={MEDIA.odyssey.poster} width={540} height={960} alt={MEDIA.odyssey.alt} />
      <video ref={ref} src={MEDIA.odyssey.video} poster={MEDIA.odyssey.poster} playsInline preload="metadata"
        aria-label="Short atmospheric ThinkScope video: a traveler on a ship at sea" onError={() => setFailed(true)} />
      {paused && !started && !failed && (
        <button className="hbp" type="button" onClick={bigPlay} aria-label="Play video">Play</button>
      )}
      <div className="hvc">
        <button type="button" onClick={togglePlay} aria-label={paused ? "Play video" : "Pause video"}>{paused ? "Play" : "Pause"}</button>
        <button type="button" onClick={toggleSound} aria-label={muted ? "Enable sound" : "Mute video"}>{muted ? "Unmute" : "Mute"}</button>
      </div>
    </figure>
  );
}
