"use client";
import { useEffect, useRef, useState } from "react";
import site from "@/content/site.json";
import Icon from "@/components/Icon";

type Item = { label: string; href: string; children?: Item[] };
function MenuItems({ items, currentPath, depth = 0 }: { items: Item[]; currentPath: string; depth?: number }) {
  return <ul className={depth ? "sp-dropdown-items" : "sp-megamenu-parent menu-animation-fade-up d-none d-lg-block"}>
    {items.map(item => <li key={item.label} className={`sp-menu-item ${item.children ? "sp-has-child" : ""} ${currentPath === item.href ? "active current-item" : ""}`}>
      <a href={item.href} aria-current={currentPath === item.href ? "page" : undefined}>{item.label}{item.children && <span className="menu-chevron" aria-hidden="true" />}</a>
      {item.children && <div className={`sp-dropdown ${depth ? "sp-dropdown-sub" : "sp-dropdown-main"} sp-menu-right`} style={{ width: site.id === "pro" ? 240 : 230 }}><div className="sp-dropdown-inner"><MenuItems items={item.children} currentPath={currentPath} depth={depth + 1} /></div></div>}
    </li>)}
  </ul>;
}
function MobileItems({ items, close }: { items: Item[]; close: () => void }) {
  return <ul>{items.map(item => <li key={item.label}>{item.children ? <details><summary>{item.label}</summary><a href={item.href} onClick={close}>{item.label} – přehled</a><MobileItems items={item.children} close={close} /></details> : <a href={item.href} onClick={close}>{item.label}</a>}</li>)}</ul>;
}
export default function Header({ currentPath }: { currentPath: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => { dialog.current?.close(); setOpen(false); trigger.current?.focus(); };
  useEffect(() => { if (!open) return; const old = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = old; }; }, [open]);
  return <>
    <header id="sp-header"><div className="container"><div className="container-inner"><div className="row">
      <div id="sp-logo" className="col-auto"><div className="sp-column"><div className="logo"><a href="/" aria-label={`${site.name} – úvod`}><img className="logo-image" src={site.logo} height={site.logoHeight} alt={site.name} /></a></div></div></div>
      <div id="sp-menu" className="col-auto flex-auto"><div className="sp-column d-flex justify-content-end align-items-center"><nav className="sp-megamenu-wrapper d-flex" aria-label="Hlavní navigace"><MenuItems items={site.navigation} currentPath={currentPath} /></nav>
        <button ref={trigger} id="offcanvas-toggler" className="offcanvas-toggler-right d-flex d-lg-none menu-toggle" aria-label="Otevřít menu" aria-controls="mobile-menu" aria-expanded={open} onClick={() => { dialog.current?.showModal(); setOpen(true); }}><span className="burger-icon" aria-hidden="true"><span /><span /><span /></span></button>
      </div></div>
    </div></div></div></header>
    <dialog ref={dialog} id="mobile-menu" className="mobile-menu" aria-label="Hlavní navigace" onCancel={close} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left) close(); } }}>
      <button className="menu-close" onClick={close} aria-label="Zavřít menu"><Icon name="close" /></button><a className="mobile-brand" href="/"><img src={site.logo} alt={site.name} height={60} /></a><nav aria-label="Mobilní navigace"><MobileItems items={site.navigation} close={close} /></nav>
    </dialog>
  </>;
}
