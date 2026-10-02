import site from "@/content/site.json";
export default function NotFound() {
  return <main style={{ maxWidth: 800, margin: "100px auto", padding: 24 }}><h1>Stránka nebyla nalezena</h1><p>Odkaz může být neplatný nebo byla stránka přesunuta.</p><a href="/">Zpět na úvod {site.name}</a></main>;
}
