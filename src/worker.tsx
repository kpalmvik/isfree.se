import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";

import Domain from "./pages/Domain";
import Index from "./pages/Index";
import Layout from "./components/Layout";

declare module "hono" {
  interface ContextRenderer {
    // eslint-disable-next-line @typescript-eslint/prefer-function-type
    (
      content: string | Promise<string>,
      props: { pageTitleSuffix?: string; noindex?: boolean }
    ): Response;
  }
}

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
    }
  )
);

app.get("/", (c) => c.render(<Index />, {}));

app.get("/:domain{([^/]+.se)$}", (c) => {
  const domain = c.req.param("domain");

  return c.render(<Domain domain={domain} />, {
    pageTitleSuffix: `Är domänen ${domain} ledig?`,
    noindex: true,
  });
});

app.get("/:domain{[^/]+}", (c) => c.redirect(`/${c.req.param("domain")}.se`));

export default app;
