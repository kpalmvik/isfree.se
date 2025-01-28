import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";

import Domain from "./pages/Domain";
import Index from "./pages/Index";
import Layout from "./components/Layout";
import seFreeLocal from "./seFreeLocal";

declare module "hono" {
  interface ContextRenderer {
    // eslint-disable-next-line @typescript-eslint/prefer-function-type
    (
      content: string | Promise<string>,
      props: { pageTitleSuffix?: string; noindex?: boolean },
    ): Response;
  }
}

const checkDomainStatus = async (domain: string) => {
  try {
    return seFreeLocal(domain);
  } catch {
    return "NOT_VALID";
  }
};

const app = new Hono();

app.get(
  "/*",
  jsxRenderer(
    ({ pageTitleSuffix, noindex, children }) => (
      <Layout pageTitleSuffix={pageTitleSuffix} noindex={noindex}>
        {children}
      </Layout>
    ),
    {
      docType: "<!DOCTYPE html>",
    },
  ),
);

app.get("/", (c) => c.render(<Index />, {}));

app.get("/:domain{([^/]+.se)$}", async (c) => {
  const domain = c.req.param("domain");
  const status = await checkDomainStatus(domain);
  const allowIndexingDomains = [
    "example.se",
    "isfree.se",
    "ledig-doman.se",
    "🦄.se",
  ];

  return c.render(<Domain domain={domain} status={status} />, {
    pageTitleSuffix: `Är domänen ${domain} ledig?`,
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
