import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Domain from "./Domain.tsx";

describe("Domain", () => {
  test("renders a heading", () => {
    render(<Domain domain="example.se" status="FREE" />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "example.se är ledig!",
    );
  });

  describe("when the domain is already registered", () => {
    test("renders a link to check whois", () => {
      render(<Domain domain="example.se" status="OCCUPIED" />);
      const whoisLink = screen.getByRole("link", {
        name: "Se vem som registrerat example.se",
      });
      expect(whoisLink).toHaveAttribute(
        "href",
        "https://internetstiftelsen.se/sok-doman/?domain=example.se",
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
  });

  describe("when the domain is not valid", () => {
    test("renders an error title", () => {
      render(<Domain domain="#invalid#" status="NOT_VALID" />);
      expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
        "#invalid# är inte ett giltigt domännamn!",
      );
    });

    test("clarifies that it cannot be registered", () => {
      render(<Domain domain="example.se" status="NOT_VALID" />);
      expect(screen.getByRole("heading", { level: 2 }).textContent).toBe(
        "Den här domänen går av någon anledning inte att registrera",
      );
    });
  });
});
