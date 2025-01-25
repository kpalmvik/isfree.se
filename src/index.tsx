import { Hono } from "hono";
import Domain from "./pages/Domain";
import Index from "./pages/Index";

const app = new Hono();

app.get("/", (c) => c.html(<Index />));

app.get("/:domain{([^/]+.se)$}", (c) =>
  c.html(<Domain domain={c.req.param("domain")} />)
);

app.get("/:domain{[^/]+}", (c) => c.redirect(`/${c.req.param("domain")}.se`));

export default app;
