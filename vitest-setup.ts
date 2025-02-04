import "@testing-library/jest-dom/vitest";

declare module "vitest" {
  export interface TestContext {
    failOnConsoleError?: boolean;
  }
}

beforeEach((context) => {
  if (context.failOnConsoleError === false) return;

  vi.spyOn(console, "error").mockImplementation((message: string) => {
    throw new Error(`Console.error was called with: ${message}`);
  });
});

afterEach(() => {
  vi.spyOn(console, "error").mockReset();
});
