import { Hono } from "hono";
import { html } from "hono/html";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/:domain{([^/]+.se)$}", (c) => {
  const domain = c.req.param("domain");
  return c.html(
    html`<!DOCTYPE html>
      <h1>Looking up ${domain}!</h1>`
  );
});

app.get("/:domain{[^/]+}", (c) => c.redirect(`/${c.req.param("domain")}.se`));

export default app;
