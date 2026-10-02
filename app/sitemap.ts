import type { MetadataRoute } from "next";
import pages from "@/content/pages.json";
import site from "@/content/site.json";
export default function sitemap(): MetadataRoute.Sitemap { return pages.filter(p => p.key !== "e-mail-podekovani").map(p => ({ url: site.url + p.path })); }
