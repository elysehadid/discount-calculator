import { expect, test } from "vitest";
import { formatToDollar } from "../utils";

test("Numbers are formatted into dollar amounts", () => {
  expect(formatToDollar(1337.54)).toBe("$1,337.54");
});

/*
  test: Form data is converted into. object with props
  expect that getAllFormValues returns normal object with properties
*/

/*
  test: Summary is created accurately
  expect that object matches object shape:
      {
        discount (discount-type): "percent"
        amount (amount of discount): discountAmount
        difference (savings): price - discountAmount
        price
      }
*/
