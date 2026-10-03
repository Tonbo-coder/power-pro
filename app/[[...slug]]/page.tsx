import type { Metadata } from "next";
import { notFound } from "next/navigation";
import pages from "@/content/pages.json";
import { pageComponents } from "@/content/registry";
import site from "@/content/site.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteInteractions from "@/components/SiteInteractions";
import PodcastPopup from "@/components/PodcastPopup";

type Props = { params: Promise<{ slug?: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() { return pages.map(p => ({ slug: p.path === "/" ? [] : p.path.slice(1).split("/") })); }
async function getPage(props: Props) { const { slug = [] } = await props.params; return pages.find(p => p.path === "/" + slug.join("/")); }
export async function generateMetadata(props: Props): Promise<Metadata> {
  const page = await getPage(props); if (!page) return {};
  return { title: page.title, description: page.description || undefined, alternates: { canonical: page.path },
    openGraph: { title: page.title, description: page.description, url: page.path, siteName: site.name, locale: "cs_CZ", type: page.ogType === "article" ? "article" : "website", images: [{ url: page.ogImage || site.logo }] },
    ...(page.key === "e-mail-podekovani" ? { robots: { index: false, follow: false } } : {}) };
}
export default async function Page(props: Props) {
  const page = await getPage(props); if (!page) notFound();
  const Content = pageComponents[page.key as keyof typeof pageComponents];
  return <div className={`page-shell brand-${site.id}`} data-page={page.key}>
    <link rel="stylesheet" href={`/styles/pages/${page.key}.css`} precedence="page" />
    <link rel="stylesheet" href="/styles/refinements.css" precedence="refinements" />
    <a className="skip-link" href="#sp-main">Přejít na obsah</a>
    <div className="body-wrapper"><div className="body-innerwrapper">
      <Header currentPath={page.path} />
      <main id="sp-main" tabIndex={-1}><section id="sp-main-body"><div className="row"><div id="sp-component" className="col-lg-12"><div className="sp-column">
        <div id="page-content-root" className={page.pageClass}><div className="page-content"><Content /></div></div>
      </div></div></div></section><Footer /></main>
      <SiteInteractions pageKey={page.key} />
      {page.key === "home" && <PodcastPopup />}
    </div></div>
  </div>;
}
