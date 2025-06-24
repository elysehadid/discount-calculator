import { expect, test } from "vitest";
import { formatToDollar, getAllFormValues } from "../utils";

test("Numbers are formatted into dollar amounts", () => {
  expect(formatToDollar(1337.54)).toBe("$1,337.54");
});

test("Converts form data into an object", () => {
  const formData = new FormData();
  // Mimicking properties of HTML form by appending them to FormData manually.
  // Otherwise we have to pass in an HTML form.
  formData.append("discount-type", "percent");
  formData.append("price", "2332");
  formData.append("discount", "23");

  const formValues = {
    "discount-type": "percent",
    price: "2332",
    discount: "23",
  };

  expect(getAllFormValues(formData)).toMatchObject(formValues);
});

/*
  test: calculateDiscount returns an object with summary
formValues obj = {"discount-type":"percent","price":"2332","discount":"23"}
  test: Summary is created accurately with getAllFormValues
  expect that object matches object shape with toMatchObject
  all values except discount-type should be a number
      {
        discount (discount-type): "percent"
        amount (amount of discount): discountAmount
        difference (savings): price - discountAmount
        price
      }
*/
