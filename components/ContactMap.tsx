"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
const address = "Červený Kříž 286, 586 01 Jihlava";
const mapAttribution = "Mapový podklad © Esri, DeLorme, NAVTEQ";
/** Same center, tile provider and marker as the original contact page. */
export default function ContactMap() {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let map: import("leaflet").Map | undefined;
    let resize: ResizeObserver | undefined;
    const visible = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      visible.disconnect();
      void import("leaflet").then(L => {
        if (disposed || !element.current) return;
        map = L.map(element.current, { center: [49.4589637, 15.6096625], zoom: 16, attributionControl: false, dragging: false, scrollWheelZoom: false, zoomControl: false, doubleClickZoom: false, touchZoom: false, boxZoom: false, keyboard: false });
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", { maxZoom: 16, attribution: mapAttribution }).addTo(map);
        L.marker([49.4589637, 15.6096625], { icon: L.icon({ iconUrl: "/images/map/map-pin.svg", iconSize: [38, 95], iconAnchor: [22, 94], popupAnchor: [-3, -76] }), alt: address, keyboard: true }).addTo(map).bindPopup(address);
        resize = new ResizeObserver(() => map?.invalidateSize()); resize.observe(element.current);
      });
    }, { rootMargin: "300px" });
    if (element.current) visible.observe(element.current);
    return () => { disposed = true; visible.disconnect(); resize?.disconnect(); map?.remove(); };
  }, []);
  return <div className="contact-map"><div className="contact-map-frame"><div ref={element} className="block-openstreetmap" role="region" aria-label={`Mapa sídla: ${address}`} /><a className="map-directions" href="https://www.openstreetmap.org/?mlat=49.4589637&mlon=15.6096625#map=16/49.45896/15.60966" target="_blank" rel="noopener noreferrer">Otevřít mapu</a></div><p className="map-attribution">{mapAttribution}</p></div>;
}
