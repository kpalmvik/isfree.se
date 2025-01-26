import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Domain from "./Domain.tsx";

describe("Domain", () => {
  test("renders a heading", () => {
    render(<Domain domain="example.se" />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "example.se är ledig!"
    );
  });
});
