"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import podcast from "@/content/podcast.json";
import styles from "./PodcastPopup.module.css";

const storageKey = `power-pro:podcast:${podcast.id}`;
const cooldownMs = podcast.cooldownDays * 24 * 60 * 60 * 1000;

export default function PodcastPopup() {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const backdropPress = useRef(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!podcast.enabled) return;
    const popup = dialog.current;
    if (!popup) return;
    const shownRecently = () => {
      try {
        const shownAt = Number(window.localStorage.getItem(storageKey));
        return shownAt > 0 && Date.now() - shownAt < cooldownMs;
      } catch {
        return false;
      }
    };
    if (shownRecently()) return;

    let timer: ReturnType<typeof setTimeout>;
    const show = () => {
      if (shownRecently()) return;
      const active = document.activeElement as HTMLElement | null;
      if (document.visibilityState === "hidden" || document.querySelector("dialog[open]") || active?.matches("input, textarea, select, [contenteditable='true']")) {
        timer = setTimeout(show, 1000);
        return;
      }
      returnFocus.current = active && active !== document.body ? active : document.querySelector<HTMLElement>("#sp-main");
      popup.showModal();
      setOpen(true);
      closeButton.current?.focus({ preventScroll: true });
      try {
        window.localStorage.setItem(storageKey, String(Date.now()));
      } catch {
        // Storage is optional; never prevent dismissing or following the link.
      }
    };
    timer = setTimeout(show, podcast.delayMs);
    return () => {
      clearTimeout(timer);
      if (popup.open) popup.close();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  const close = () => dialog.current?.close();
  const isBackdrop = (event: React.MouseEvent<HTMLDialogElement> | React.PointerEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return false;
    const box = event.currentTarget.getBoundingClientRect();
    return event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  };

  return (
    <dialog
      ref={dialog}
      className={styles.popup}
      aria-labelledby="podcast-title"
      aria-describedby="podcast-description"
      aria-modal="true"
      onCancel={event => { event.preventDefault(); close(); }}
      onClose={() => {
        setOpen(false);
        if (returnFocus.current?.isConnected) returnFocus.current.focus({ preventScroll: true });
      }}
      onPointerDown={event => { backdropPress.current = isBackdrop(event); }}
      onClick={event => { if (backdropPress.current && isBackdrop(event)) close(); }}
      onKeyDown={event => {
        if (event.key !== "Tab") return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]");
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }}
    >
      <button ref={closeButton} className={styles.close} type="button" aria-label="Zavřít okno s podcastem" onClick={close}>
        <Icon name="close" />
      </button>
      <h2 id="podcast-title" className={styles.title}>{podcast.title}</h2>
      <p id="podcast-description" className={styles.description}>{podcast.text}</p>
      <div className={styles.actions}>
        <a className={styles.listen} href={podcast.url} target="_blank" rel="noopener noreferrer" aria-label={`${podcast.buttonLabel} (otevře se v nové kartě)`} onClick={close}>
          <Icon name="play" />{podcast.buttonLabel}
        </a>
        <button className={styles.dismiss} type="button" onClick={close}>Teď ne</button>
      </div>
    </dialog>
  );
}
