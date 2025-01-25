import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Index from "./Index.tsx";

describe("Index", () => {
  test("renders a heading", () => {
    render(<Index />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Welcome to isfree.se"
    );
  });
});
