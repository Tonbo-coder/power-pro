"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import site from "@/content/site.json";
const { street, postalCode, city, latitude, longitude } = site.address;
const address = `${street}, ${postalCode}, ${city}`;
const position: [number, number] = [latitude, longitude];
const mapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`;
const mapAttribution = "Mapový podklad © Esri, DeLorme, NAVTEQ";
/** Address and coordinates are shared with the contact details and footer. */
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
        map = L.map(element.current, { center: position, zoom: 16, attributionControl: false, dragging: false, scrollWheelZoom: false, zoomControl: false, doubleClickZoom: false, touchZoom: false, boxZoom: false, keyboard: false });
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", { maxZoom: 16, attribution: mapAttribution }).addTo(map);
        L.marker(position, { icon: L.icon({ iconUrl: "/images/map/map-pin.svg", iconSize: [38, 95], iconAnchor: [22, 94], popupAnchor: [-3, -76] }), alt: address, keyboard: true }).addTo(map).bindPopup(address);
        resize = new ResizeObserver(() => map?.invalidateSize()); resize.observe(element.current);
      });
    }, { rootMargin: "300px" });
    if (element.current) visible.observe(element.current);
    return () => { disposed = true; visible.disconnect(); resize?.disconnect(); map?.remove(); };
  }, []);
  return <div className="contact-map"><div className="contact-map-frame"><div ref={element} className="block-openstreetmap" role="region" aria-label={`Mapa sídla: ${address}`} /><a className="map-directions" href={mapUrl} target="_blank" rel="noopener noreferrer">Otevřít mapu</a></div><p className="map-attribution">{mapAttribution}</p></div>;
}
