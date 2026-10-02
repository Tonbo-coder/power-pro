import type { MetadataRoute } from "next";
import site from "@/content/site.json";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/e-mail-podekovani"] }, sitemap: site.url + "/sitemap.xml" }; }
