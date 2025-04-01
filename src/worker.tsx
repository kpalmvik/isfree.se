import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";

import Domain from "./pages/Domain";
import Index from "./pages/Index";
import Layout, { Props as LayoutProps } from "./components/Layout";
import seFreeLocal from "./seFreeLocal";
import trunkver from "./trunkver.json";
import { nyord2022, nyord2023, nyord2024 } from "./components/nyord-data";
declare module "hono" {
  interface ContextRenderer {
    // eslint-disable-next-line @typescript-eslint/prefer-function-type
    (content: string | Promise<string>, props: LayoutProps): Response;
  }
}

const checkDomainStatus = async (domain: string) => {
  try {
    return await seFreeLocal(domain);
  } catch {
    return "NOT_VALID";
  }
};

const domainsFromWords = (words: string[]) => words.map((word) => `${word}.se`);

const indexableDomain = [
  "example.se",
  "isfree.se",
  "ledig-doman.se",
  "🦄.se",
  ...domainsFromWords(nyord2022.words),
  ...domainsFromWords(nyord2023.words),
  ...domainsFromWords(nyord2024.words),
];

const app = new Hono();

app.get(
  "/*",
  jsxRenderer((props) => <Layout trunkver={trunkver.version} {...props} />),
);

app.get("/", (c) => c.render(<Index />, {}));

app.get("/sitemap.xml", (c) => {
  const baseUrl = "https://isfree.se";

  const urls = [
    `${baseUrl}/`,
    ...indexableDomain.map(
      (domain) => `${baseUrl}/${encodeURIComponent(domain)}`,
    ),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url}</loc></url>`).join("")}</urlset>`;

  return c.body(sitemap, { headers: { "Content-Type": "application/xml" } });
});

app.get("/:domain{([^/]+[.]se)$}", async (c) => {
  const domain = c.req.param("domain");
  const status = await checkDomainStatus(domain);

  return c.render(<Domain domain={domain} status={status} />, {
    pageTitlePrefix: `Är ${domain} ledig?`,
    noindex: !indexableDomain.includes(domain),
  });
});

app.get("/:domain{[^/]+}", (c) =>
  c.redirect(`/${encodeURIComponent(c.req.param("domain"))}.se`, 301),
);

app.get("/search/domain", (c) => {
  const domain = c.req.query("domain");

  return c.redirect(domain ? `/${encodeURIComponent(domain)}.se` : "/", 301);
});

export default app;
