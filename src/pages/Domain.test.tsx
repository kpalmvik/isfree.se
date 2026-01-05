import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Domain from "./Domain.tsx";

describe("Domain", () => {
  describe("when the domain is not registered", () => {
    test("renders a heading that says that it is free", () => {
      render(<Domain domain="available.se" status="FREE" />);
      expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
        "available.se är ledig!",
      );
    });

    test("clarifies that it can be registered", () => {
      render(<Domain domain="example.se" status="FREE" />);
      expect(
        screen.getByText("Den här domänen går att registrera 👍"),
      ).toBeInTheDocument();
    });

    test("prevents the result title from being shown in search engine snippets", () => {
      render(<Domain domain="available.se" status="FREE" />);
      expect(screen.getByRole("heading", { level: 1 })).toHaveAttribute(
        "data-nosnippet",
      );
    });

    test("prevents the main content from being shown in search engine snippets", () => {
      render(<Domain domain="available.se" status="FREE" />);
      expect(screen.getByRole("main")).toHaveAttribute("data-nosnippet");
    });
  });

  describe("when the domain is already registered", () => {
    test("renders a heading that says that it is occupied", () => {
      render(<Domain domain="already-registered.se" status="OCCUPIED" />);
      expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
        "already-registered.se är upptagen!",
      );
    });

    test("clarifies that it has already been registered", () => {
      render(<Domain domain="example.se" status="OCCUPIED" />);
      expect(
        screen.getByText("Den här domänen har redan registrerats 😞"),
      ).toBeInTheDocument();
    });

    test("renders a link to check whois", () => {
      render(<Domain domain="already-registered.se" status="OCCUPIED" />);
      const whoisLink = screen.getByRole("link", {
        name: "Se vem som registrerat already-registered.se",
      });
      expect(whoisLink).toHaveAttribute(
        "href",
        "https://internetstiftelsen.se/sok-doman/?domain=already-registered.se",
      );
    });

    test("renders a restricted link to the actual url", () => {
      render(<Domain domain="example.se" status="OCCUPIED" />);
      const whoisLink = screen.getByRole("link", {
        name: "Gå till example.se",
      });
      expect(whoisLink).toHaveAttribute("href", "http://example.se/");
      expect(whoisLink).toHaveAttribute("rel", "noopener noreferrer nofollow");
    });

    test("prevents the result title from being shown in search engine snippets", () => {
      render(<Domain domain="example.se" status="OCCUPIED" />);
      expect(screen.getByRole("heading", { level: 1 })).toHaveAttribute(
        "data-nosnippet",
      );
    });

    test("prevents the main content from being shown in search engine snippets", () => {
      render(<Domain domain="example.se" status="OCCUPIED" />);
      expect(screen.getByRole("main")).toHaveAttribute("data-nosnippet");
    });
  });

  describe("when the domain is invalid", () => {
    test("renders a heading that says that it is not valid", () => {
      render(<Domain domain="#invalid#" status="NOT_VALID" />);
      expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
        "#invalid# är inte ett giltigt domännamn!",
      );
    });

    test("clarifies that it cannot be registered", () => {
      render(<Domain domain="#invalid#" status="NOT_VALID" />);
      expect(
        screen.getByText(
          "Den här domänen går av någon anledning inte att registrera 😬",
        ),
      ).toBeInTheDocument();
    });

    test("prevents the result title from being shown in search engine snippets", () => {
      render(<Domain domain="#invalid#" status="NOT_VALID" />);
      expect(screen.getByRole("heading", { level: 1 })).not.toHaveAttribute(
        "data-nosnippet",
      );
    });

    test("prevents the main content from being shown in search engine snippets", () => {
      render(<Domain domain="#invalid#" status="NOT_VALID" />);
      expect(screen.getByRole("main")).toHaveAttribute("data-nosnippet");
    });
  });
});
