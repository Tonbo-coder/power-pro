"use client";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";

type GalleryImage = { src: string; caption: string };
/** Scroll entrances and accessible gallery, with no CMS or jQuery runtime. */
export default function SiteInteractions({ pageKey }: { pageKey: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [index, setIndex] = useState(0);
  const closeGallery = () => { dialog.current?.close(); restoreFocus.current?.focus(); };
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = [...document.querySelectorAll<HTMLElement>(".ui-wow")];
    const animations = ["fadeIn", "fadeInUp", "fadeInDown", "fadeInLeft", "fadeInRight", "zoomIn"];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target as HTMLElement;
      el.classList.remove("motion-pending");
      if (!reduced.matches) { el.style.animationDuration = el.dataset.motionDuration || "700ms"; el.style.animationDelay = el.dataset.motionDelay || "0ms"; el.classList.add("animated", "motion-entered"); }
      observer.unobserve(el);
    }), { threshold: 0.05 });
    elements.forEach(el => {
      el.dataset.animation = animations.find(a => el.classList.contains(a)) || "fadeInUp";
      if (!reduced.matches) { el.classList.add("motion-pending"); observer.observe(el); }
    });
    const videos = [...document.querySelectorAll<HTMLVideoElement>("video[data-background-video]")];
    const updateMotion = () => { videos.forEach(video => { if (reduced.matches) video.pause(); else video.play().catch(() => undefined); }); if (reduced.matches) elements.forEach(el => el.classList.remove("motion-pending")); };
    updateMotion(); reduced.addEventListener("change", updateMotion);
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest<HTMLAnchorElement>(".block-gallery a");
      if (!anchor || event.ctrlKey || event.metaKey || event.shiftKey) return;
      event.preventDefault();
      const group = anchor.closest(".block-gallery")!;
      const links = [...group.querySelectorAll<HTMLAnchorElement>("a")];
      setImages(links.map(link => ({ src: link.getAttribute("href")!, caption: link.querySelector("img")?.getAttribute("data-caption") || link.querySelector("img")?.alt || "Fotografie produktu" })));
      setIndex(links.indexOf(anchor)); restoreFocus.current = anchor; dialog.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => { observer.disconnect(); reduced.removeEventListener("change", updateMotion); document.removeEventListener("click", onClick); elements.forEach(el => el.classList.remove("motion-pending")); };
  }, [pageKey]);
  const move = (by: number) => setIndex(current => (current + by + images.length) % images.length);
  return <>
    <dialog ref={dialog} className="gallery-dialog" aria-label="Galerie fotografií" onCancel={closeGallery} onClick={e => { if (e.target === e.currentTarget) closeGallery(); }} onKeyDown={e => { if (e.key === "ArrowRight") move(1); if (e.key === "ArrowLeft") move(-1); }}>
      <button className="gallery-close" onClick={closeGallery} aria-label="Zavřít galerii"><Icon name="close" /></button>
      {images[index] && <figure><img src={images[index].src} alt={images[index].caption} /><figcaption>{images[index].caption} <span>{index + 1} / {images.length}</span></figcaption></figure>}
      {images.length > 1 && <><button className="gallery-prev" onClick={() => move(-1)} aria-label="Předchozí fotografie"><Icon name="previous" /></button><button className="gallery-next" onClick={() => move(1)} aria-label="Další fotografie"><Icon name="next" /></button></>}
    </dialog>
  </>;
}
