import { expect, test } from "vitest";
import { formatToDollar } from "../utils";

test("Numbers are formatted into dollar amounts", () => {
  expect(formatToDollar(1337.54)).toBe("$1,337.54");
});

/*
  test: Form data is converted into. object with props
  expect that getAllFormValues returns normal object with properties

  create new formobj
append properties

formValues obj = {"discount-type":"percent","price":"2332","discount":"23"}

  test: Summary is created accurately with getAllFormValues
  expect that object matches object shape with toMatchObject
      {
        discount (discount-type): "percent"
        amount (amount of discount): discountAmount
        difference (savings): price - discountAmount
        price
      }
*/
