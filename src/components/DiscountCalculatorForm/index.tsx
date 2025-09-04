import { useState } from "react";
import {
  RawFormDataProps,
  FormValuesProps,
  SetSummaryProps,
} from "../../types";
import { getAllFormValues, calculateDiscount } from "../../utils";
import FormErrors from "./FormErrors";

type SetFormProps = {
  discount: string;
  "discount-type": string;
  price: string;
};

type SetFormErrorsProps = {
  discount: string[];
  price: string[];
};

function DiscountCalculatorForm({ setSummary }: SetSummaryProps) {
  const [form, setForm] = useState<SetFormProps>({
    discount: "",
    "discount-type": "percent",
    price: "",
  });

  const [formErrors, setFormErrors] = useState<SetFormErrorsProps>({
    discount: [],
    price: [],
  });

  const validateFormAnswers = (formValues: FormValuesProps) => {
    const price = Number(formValues.price);
    const discount = Number(formValues.discount);
    const discountType = formValues["discount-type"];

    // Reset all errors and assign new errors.
    setFormErrors({
      discount: [],
      price: [],
    });

    const errors: { discount: string[]; price: string[] } = {
      discount: [],
      price: [],
    };

    if (price === 0 || price < 0) {
      errors.price.push("Price amount needs to be greater than zero");
    }

    if (discount === 0 || discount < 0) {
      errors.discount.push("Discount amount needs to be greater than zero");
    }

    if (discountType === "fixed" && discount >= price) {
      errors.discount.push(
        "Discount amount cannot be greater than price amount"
      );
    }

    if (errors.price.length || errors.discount.length) {
      setFormErrors({ ...errors });
      return false;
    } else {
      return true;
    }
  };

  const handleFormSubmission = (formData: RawFormDataProps) => {
    const formValues = getAllFormValues(formData);

    if (validateFormAnswers(formValues)) {
      const results = calculateDiscount(formValues);
      setSummary(results);
    }

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

      <FormErrors {...formErrors} />

      <div>
        <button type="submit">Calcuate</button>
        {/* <button type="reset">Reset answers</button> */}
        {/* May not need a reset button since uncontrolled fields are reset on form submission. */}
      </div>
    </form>
  );
}

export default DiscountCalculatorForm;
