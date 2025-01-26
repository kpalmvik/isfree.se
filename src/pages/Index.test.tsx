import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Index from "./Index.tsx";

describe("Index", () => {
  test("renders a heading", () => {
    render(<Index />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "isfree.se"
    );
  });

  test("renders instructions", () => {
    render(<Index />);
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe(
      "Besök isfree.se/example för att snabbt se om domänen example.se är upptagen eller ledig"
    );
  });
});
