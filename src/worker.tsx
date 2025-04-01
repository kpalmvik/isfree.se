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

const app = new Hono();

app.get(
  "/*",
  jsxRenderer((props) => <Layout {...props} />),
);

app.get("/", (c) => c.render(<Index trunkver={trunkver.version} />, {}));

app.get("/:domain{([^/]+[.]se)$}", async (c) => {
  const domain = c.req.param("domain");
  const status = await checkDomainStatus(domain);

  const allowIndexingDomains = [
    "example.se",
    "isfree.se",
    "ledig-doman.se",
    "🦄.se",
    ...domainsFromWords(nyord2022.words),
    ...domainsFromWords(nyord2023.words),
    ...domainsFromWords(nyord2024.words),
  ];

  return c.render(<Domain domain={domain} status={status} />, {
    pageTitlePrefix: `Är ${domain} ledig?`,
    noindex: !allowIndexingDomains.includes(domain),
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
