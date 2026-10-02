import type { Metadata } from "next";
import site from "@/content/site.json";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  robots: { index: true, follow: true },
  icons: { icon: site.logo },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="cs"><head><link rel="stylesheet" href="/styles/base.css" precedence="base" /></head><body className="site content-site layout-default layout-fluid">{children}</body></html>;
}
