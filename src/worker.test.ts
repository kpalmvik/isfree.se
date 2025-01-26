import { env } from "cloudflare:test";
import { describe, expect, test } from "vitest";
import worker from "./worker.tsx";

describe("isfree.se", () => {
  describe("GET /", () => {
    test("returns a greeting", async () => {
      const res = await worker.request("/", {}, env);
      expect(res.status).toBe(200);
      const body = await res.text();
      expect(body).toContain("Welcome to isfree.se");
    });
  });

  describe("GET /domain without .se suffix", () => {
    const expectRedirect = async (res: Response, location: string) => {
      expect(res.status).toBe(302);
      expect(res.headers.get("Location")).toBe(location);
    };

    test("redirects /example to /example.se", async () => {
      const res = await worker.request("/example", {}, env);
      expectRedirect(res, "/example.se");
    });

    test("redirects /some.example to /some.example.se", async () => {
      const res = await worker.request("/some.example", {}, env);
      expectRedirect(res, "/some.example.se");
    });

    test("redirects /åäö to /åäö.se", async () => {
      const res = await worker.request("/åäö", {}, env);
      expectRedirect(res, "/åäö.se");
    });

    test("redirects /😁 to /😁.se", async () => {
      const res = await worker.request("/😁.se", {}, env);
      expectRedirect(res, "/😁.se");
    });

    test("404 on /some/example", async () => {
      const res = await worker.request("/some/example", {}, env);
      expect(res.status).toBe(404);
    });
  });

  describe("GET /domain.se with .se suffix", () => {
    const expectLookupPage = async (res: Response, domain: string) => {
      expect(res.status).toBe(200);
      const body = await res.text();
      expect(body).toContain(`<h1>Looking up ${domain}!</h1>`);
      expect(body).toContain(
        `<title>isfree.se | Är domänen ${domain} ledig?</title>`
      );
    };

    test("returns a lookup page for example.se", async () => {
      const res = await worker.request("/example.se", {}, env);
      await expectLookupPage(res, "example.se");
    });

    test("returns a lookup page for some.example.se", async () => {
      const res = await worker.request("/some.example.se", {}, env);
      await expectLookupPage(res, "some.example.se");
    });

    test("returns a lookup page for åäö.se", async () => {
      const res = await worker.request("/åäö.se", {}, env);
      await expectLookupPage(res, "åäö.se");
    });

    test("returns a lookup page for 😁.se", async () => {
      const res = await worker.request("/😁.se", {}, env);
      await expectLookupPage(res, "😁.se");
    });

    test("404 on /example.se/something", async () => {
      const res = await worker.request("/example.se/something", {}, env);
      expect(res.status).toBe(404);
    });

    test("has a noindex follow robots directive", async () => {
      const res = await worker.request("/example.se", {}, env);
      const body = await res.text();

      expect(body).toContain('<meta name="robots" content="noindex, follow"/>');
    });
  });
});
