import { useState } from "react";
import { RawFormDataProps, FormValuesProps, SetSummaryProps } from "../types";
import { getAllFormValues, formatToDollar } from "../utils";

type CalculateDiscountProps = {
  amount: number;
  difference: number;
  discount: string;
  price: number;
};

type SetFormProps = {
  discount: number;
  "discount-type": string;
  price: number;
};

function DiscountCalculatorForm({ setSummary }: SetSummaryProps) {
  const [form, setForm] = useState<SetFormProps>({
    discount: 0,
    "discount-type": "percent",
    price: 0,
  });

  // useState for errors, organized by field
  // useState so all inputs are controlled inputs.

  const calculateDiscount = (
    formValues: FormValuesProps,
    setSummary: React.Dispatch<React.SetStateAction<CalculateDiscountProps>>
  ) => {
    const price = Number(formValues["price"]);

    const discount =
      form["discount-type"] === "percent"
        ? Number(formValues["discount"]) / 100
        : Number(formValues["discount"]);

    const discountAmount =
      form["discount-type"] === "percent"
        ? price * discount
        : Number(formValues["discount"]);

    setSummary({
      discount:
        form["discount-type"] === "percent"
          ? `${formValues["discount"].toString()}%`
          : formatToDollar(Number(formValues["discount"])),
      amount: discountAmount,
      difference: price - discountAmount,
      price,
    });

    return;
  };

  const handleFormSubmission = (formData: RawFormDataProps) => {
    // ⚠️ After the action function succeeds, all uncontrolled field elements in the form are reset.
    const formValues = getAllFormValues(formData);

    /*
      Form validation:
        Price should be greater than zero/1
          Error msg: ^^
        Discount should be greater than zero/1
          Error msg:  ^^
        Both price and discount should have values
    */

    calculateDiscount(formValues, setSummary);
    return;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <form action={handleFormSubmission}>
      <fieldset>
        <legend>Select a discount type</legend>
        <label>
          Percent off
          <input
            checked={form["discount-type"] === "percent"}
            name="discount-type"
            onChange={(e) => {
              handleInputChange(e);
            }}
            type="radio"
            value="percent"
          />
        </label>

        <label>
          Fixed amount off
          <input
            checked={form["discount-type"] === "fixed"}
            name="discount-type"
            onChange={(e) => {
              handleInputChange(e);
            }}
            type="radio"
            value="fixed"
          />
        </label>
      </fieldset>

      <div>
        <label>
          Price (before discount)
          <input
            min={1}
            name="price"
            onChange={(e) => handleInputChange(e)}
            type="number"
            value={form.price}
          />
        </label>

        {form["discount-type"] === "fixed" ? (
          <label>
            Discount (amount)
            <input
              max={form.price ? form.price : undefined}
              min={1}
              name="discount"
              onChange={(e) => handleInputChange(e)}
              type="number"
              value={form.discount}
            />
          </label>
        ) : (
          ""
        )}

        {form["discount-type"] === "percent" ? (
          <label>
            Discount (percentage)
            <input
              max={100}
              min={1}
              name="discount"
              onChange={(e) => handleInputChange(e)}
              type="number"
              value={form.discount}
            />
          </label>
        ) : (
          ""
        )}
      </div>

      {/* div/section for errors */}

      <div>
        <p>Error goes here :)</p>
      </div>

      <div>
        <button type="submit">Calcuate</button>
        {/* <button type="reset">Reset answers</button> */}
        {/* May not need a reset button since uncontrolled fields are reset on form submission. */}
      </div>
    </form>
  );
}

export default DiscountCalculatorForm;
