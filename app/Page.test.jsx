import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Page from "./Page.test";
import { useRouter, useSearchParams } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
}));

const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

test("renders app without crashing", () => {
  const { container } = render(<Page />);
  expect(container).toBeTruthy();
});
