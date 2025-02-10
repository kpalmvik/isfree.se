import { env, fetchMock } from "cloudflare:test";
import { beforeAll, afterEach, describe, expect, test } from "vitest";
import worker from "./worker.tsx";

beforeAll(() => {
  fetchMock.activate();
  fetchMock.disableNetConnect();
});

afterEach(() => {
  fetchMock.assertNoPendingInterceptors();
});

describe("isfree.se", () => {
  describe("GET /", () => {
    test("returns 200", async () => {
      const res = await worker.request("/", {}, env);
      expect(res.status).toBe(200);
    });

    test("has a title", async () => {
      const res = await worker.request("/", {}, env);
      const body = await res.text();
      expect(body).toContain(
        "<title>Kolla snabbt om en svensk .se-domän är ledig! | isfree.se</title>",
      );
    });

    test("has a header", async () => {
      const res = await worker.request("/", {}, env);
      const body = await res.text();
      expect(body).toContain('<h1 class="title">isfree.se</h1>');
    });
  });

  describe("GET /domain without .se suffix", () => {
    const expectRedirect = (res: Response, location: string) => {
      expect(res.status).toBe(301);
      expect(res.headers.get("Location")).toBe(location);
    };

    test("redirects /example to /example.se", async () => {
      const res = await worker.request("/example", {}, env);
      expectRedirect(res, "/example.se");
    });

    test("redirects endingwithse to /endingwithse.se", async () => {
      const res = await worker.request("/endingwithse", {}, env);
      expectRedirect(res, "/endingwithse.se");
    });

    test("redirects /some.example to /some.example.se", async () => {
      const res = await worker.request("/some.example", {}, env);
      expectRedirect(res, "/some.example.se");
    });

    test("redirects /åäö to the URI encoded /%C3%A5%C3%A4%C3%B6.se", async () => {
      const res = await worker.request("/åäö", {}, env);
      expectRedirect(res, "/%C3%A5%C3%A4%C3%B6.se");
    });

    test("redirects /🙊🙈🙉 to the URI encoded /%F0%9F%99%8A%F0%9F%99%88%F0%9F%99%89.se", async () => {
      const res = await worker.request("/🙊🙈🙉", {}, env);
      expectRedirect(res, "/%F0%9F%99%8A%F0%9F%99%88%F0%9F%99%89.se");
    });

    test("404 on /some/example", async () => {
      const res = await worker.request("/some/example", {}, env);
      expect(res.status).toBe(404);
    });
  });

  describe("GET /domain.se with .se suffix", () => {
    const mockResponse = (idnEncodedDomain: string, status: Status) => {
      const domainStatus = status.toLowerCase();
      fetchMock
        .get("http://free.iis.se")
        .intercept({ path: "/free", query: { q: idnEncodedDomain } })
        .reply(200, `${domainStatus} ${idnEncodedDomain}`);
    };

    const expectDomainTitle = (body: string, domain: string) => {
      expect(body).toContain(`<title>Är ${domain} ledig? | isfree.se</title>`);
    };

    const expectFreeDomainPage = async (res: Response, domain: string) => {
      expect(res.status).toBe(200);
      const body = await res.text();

      expect(body).toContain(
        `<h1 class="title"><span class="url-nolink">${domain}</span> är ledig!</h1>`,
      );
      expectDomainTitle(body, domain);
    };

    const expectOccupiedDomainPage = async (res: Response, domain: string) => {
      expect(res.status).toBe(200);
      const body = await res.text();

      expect(body).toContain(
        `<h1 class="title"><span class="url-nolink">${domain}</span> är upptagen!</h1>`,
      );
      expectDomainTitle(body, domain);
    };

    const expectNotValidDomainPage = async (res: Response, domain: string) => {
      expect(res.status).toBe(200);
      const body = await res.text();

      expect(body).toContain(
        `<h1 class="title"><span class="url-nolink">${domain}</span> är inte ett giltigt domännamn!</h1>`,
      );
      expectDomainTitle(body, domain);
    };

    test("returns a lookup page for example.se", async () => {
      mockResponse("example.se", "FREE");
      const res = await worker.request("/example.se", {}, env);
      await expectFreeDomainPage(res, "example.se");
    });

    test("returns a lookup page for some.example.se", async () => {
      mockResponse("some.example.se", "NOT_VALID");
      const res = await worker.request("/some.example.se", {}, env);
      await expectNotValidDomainPage(res, "some.example.se");
    });

    test("returns a lookup page for åäö.se", async () => {
      mockResponse("xn--4cab6c.se", "OCCUPIED");
      const res = await worker.request("/åäö.se", {}, env);
      await expectOccupiedDomainPage(res, "åäö.se");
    });

    test("returns a lookup page for 😁.se", async () => {
      mockResponse("xn--f28h.se", "NOT_VALID");
      const res = await worker.request("/😁.se", {}, env);
      await expectNotValidDomainPage(res, "😁.se");
    });

    test("404 on /example.se/something", async () => {
      const res = await worker.request("/example.se/something", {}, env);
      expect(res.status).toBe(404);
    });

    describe("indexing in search engines", () => {
      test("random domain cannot be indexed", async () => {
        mockResponse("some-random-domain.se", "FREE");
        const res = await worker.request("/some-random-domain.se", {}, env);
        const body = await res.text();

        expect(body).toContain(
          '<meta name="robots" content="noindex, follow"/>',
        );
      });

      test("example.se can be indexed", async () => {
        mockResponse("example.se", "OCCUPIED");
        const res = await worker.request("/example.se", {}, env);
        const body = await res.text();

        expect(body).toContain('<meta name="robots" content="index, follow"/>');
      });

      test("isfree.se can be indexed", async () => {
        mockResponse("isfree.se", "OCCUPIED");
        const res = await worker.request("/isfree.se", {}, env);
        const body = await res.text();

        expect(body).toContain('<meta name="robots" content="index, follow"/>');
      });

      test("ledig-doman.se can be indexed", async () => {
        mockResponse("ledig-doman.se", "FREE");
        const res = await worker.request("/ledig-doman.se", {}, env);
        const body = await res.text();

        expect(body).toContain('<meta name="robots" content="index, follow"/>');
      });

      test("🦄.se can be indexed", async () => {
        mockResponse("xn--3s9h.se", "NOT_VALID");
        const res = await worker.request("/🦄.se", {}, env);
        const body = await res.text();

        expect(body).toContain('<meta name="robots" content="index, follow"/>');
      });

      test("umarell.se from nyord2024 can be indexed", async () => {
        mockResponse("umarell.se", "FREE");
        const res = await worker.request("/umarell.se", {}, env);
        const body = await res.text();

        expect(body).toContain('<meta name="robots" content="index, follow"/>');
      });
    });

    test("gives an error page on a 404 from free.iis.se API", async () => {
      fetchMock
        .get("http://free.iis.se")
        .intercept({ path: "/free", query: { q: "example.se" } })
        .reply(404, "Not found");
      const res = await worker.request("/example.se", {}, env);

      expect(res.status).toBe(200);
      const body = await res.text();
      expect(body).toContain(
        `<h1 class="title"><span class="url-nolink">example.se</span> är inte ett giltigt domännamn!</h1>`,
      );
    });

    test("gives an error page on a broken response from free.iis.se API", async () => {
      fetchMock
        .get("http://free.iis.se")
        .intercept({ path: "/free", query: { q: "example.se" } })
        .reply(200, "<completely broken response>");
      const res = await worker.request("/example.se", {}, env);

      expect(res.status).toBe(200);
      const body = await res.text();
      expect(body).toContain(
        `<h1 class="title"><span class="url-nolink">example.se</span> är inte ett giltigt domännamn!</h1>`,
      );
    });
  });

  describe("GET /search/domain", () => {
    test("redirects ?domain=example to /example.se", async () => {
      const url = "/search/domain?domain=example";
      const res = await worker.request(url, {}, env);
      expect(res.status).toBe(301);
      expect(res.headers.get("Location")).toBe("/example.se");
    });
  });
});
