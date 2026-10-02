"use client";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
type Logo = { src: string; alt: string };
export default function PartnerCarousel({ logos }: { logos: Logo[] }) {
  const [position, setPosition] = useState(0);
  const [transition, setTransition] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const timer = setInterval(() => { if (!paused && !hovered && !query.matches) { setTransition(true); setPosition(p => (p >= logos.length ? 1 : p + 1)); } }, 3500);
    return () => clearInterval(timer);
  }, [paused, hovered, logos.length]);
  return <div className="partner-carousel" aria-label="Spolupracujeme s" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
    <div className="partner-track" style={{ transform: `translateX(calc(-100% / var(--partner-count) * ${position}))`, transition: transition ? "transform 2000ms ease" : "none" }} onTransitionEnd={() => { if (position >= logos.length) { setTransition(false); setPosition(0); } }}>
      {[...logos, ...logos, ...logos].map((logo, i) => <div className="partner-logo" key={`${logo.src}-${i}`} aria-hidden={i >= logos.length}><img src={logo.src} alt={i < logos.length ? logo.alt : ""} loading="lazy" decoding="async" /></div>)}
    </div>
    <button className="carousel-control" aria-pressed={paused} aria-label={paused ? "Spustit posun partnerů" : "Pozastavit posun partnerů"} onClick={() => setPaused(p => !p)}><Icon name={paused ? "play" : "pause"} /></button>
  </div>;
}
