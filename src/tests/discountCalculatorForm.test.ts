import { expect, test } from "vitest";
import { formatToDollar } from "../utils";

test("Numbers are formatted into dollar amounts", () => {
  expect(formatToDollar(1337.54)).toBe("$1,337.54");
});
