import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";

import Domain from "./pages/Domain";
import Index from "./pages/Index";
import Layout from "./components/Layout";

declare module "hono" {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      props: { pageTitleSuffix?: string }
    ): Response;
  }
}

const app = new Hono();

app.get(
  "/*",
  jsxRenderer(
    ({ pageTitleSuffix, children }) => (
      <Layout pageTitleSuffix={pageTitleSuffix}>{children}</Layout>
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
  });
});

app.get("/:domain{[^/]+}", (c) => c.redirect(`/${c.req.param("domain")}.se`));

export default app;
