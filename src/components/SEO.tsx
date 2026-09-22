import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
}

export function SEO({ title, description, canonical, image = "/images/logo.png" }: SEOProps) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const setMetaTag = (selector: string, attr: string, value: string) => {
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement("meta");
        const match = selector.match(/\[([a-zA-Z0-9_-]+)="([^"]+)"\]/);
        if (match) {
          meta.setAttribute(match[1], match[2]);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute(attr, value);
    };

    setMetaTag('meta[name="description"]', "content", description);
    setMetaTag('meta[property="og:title"]', "content", title);
    setMetaTag('meta[property="og:description"]', "content", description);
    setMetaTag('meta[property="og:image"]', "content", image);
    setMetaTag('meta[name="twitter:title"]', "content", title);
    setMetaTag('meta[name="twitter:description"]', "content", description);

    // Canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, canonical, image]);

  return null;
}
