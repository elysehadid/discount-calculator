import { useState } from "react";
import { formatToDollar } from "./utils";
import Summary from "./components/Summary";
import { FormValuesProps, RawFormDataProps } from "./types";

function App() {
  const [discountType, setDiscountType] = useState<string>("percent");
  const [price, setPrice] = useState<number>(0);
  const [summary, setSummary] = useState<{
    amount: number;
    difference: number;
    discount: string;
    price: number;
  }>({ amount: 0, difference: 0, discount: "", price: 0 });

  // move to helper function
  const getAllFormValues = (formData: RawFormDataProps) => {
    let values: FormValuesProps = {};
    for (const value of formData.entries()) {
      values[value[0]] = value[1];
    }
    return values;
  };

  const handleFormSubmission = (formData: RawFormDataProps) => {
    // ⚠️ After the action function succeeds, all uncontrolled field elements in the form are reset.
    const formValues = getAllFormValues(formData);
    calculateDiscount(formValues, setSummary);
    return;
  };

  const handleDiscountType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDiscountType(value);
    return;
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPrice(Number(value));
    return;
  };

  const calculateDiscount = (
    formValues: FormValuesProps,
    setSummary: React.Dispatch<
      React.SetStateAction<{
        amount: number;
        difference: number;
        discount: string;
        price: number;
      }>
    >
  ) => {
    const price = Number(formValues["price"]);

    const discount =
      discountType === "percent"
        ? Number(formValues["discount"]) / 100
        : Number(formValues["discount"]);

    const discountAmount =
      discountType === "percent"
        ? price * discount
        : Number(formValues["discount"]);

    setSummary({
      discount:
        discountType === "percent"
          ? `${formValues["discount"].toString()}%`
          : formatToDollar(Number(formValues["discount"])),
      amount: discountAmount,
      difference: price - discountAmount,
      price,
    });

    return;
  };

  return (
    <>
      <main>
        <section>
          <h1>Discount calculator</h1>
          <p>Calculate discounts with any fuss or hassle.</p>
        </section>

        <form action={handleFormSubmission}>
          <fieldset>
            <legend>Select a discount type</legend>
            <label>
              Percent off
              <input
                checked={discountType === "percent"}
                type="radio"
                name="discount-type"
                onChange={(e) => {
                  handleDiscountType(e);
                }}
                value={"percent"}
              />
            </label>

            <label>
              Fixed amount off
              <input
                checked={discountType === "fixed"}
                type="radio"
                name="discount-type"
                onChange={(e) => {
                  handleDiscountType(e);
                }}
                value={"fixed"}
              />
            </label>
          </fieldset>

          <div>
            <label>
              Price (before discount)
              <input
                type="number"
                name="price"
                onChange={(e) => handlePriceChange(e)}
                min={1}
              />
            </label>

            {discountType === "fixed" ? (
              <label>
                Discount (amount)
                <input
                  type="number"
                  name="discount"
                  min={1}
                  max={price ? price : undefined}
                />
              </label>
            ) : (
              ""
            )}

            {discountType === "percent" ? (
              <label>
                Discount (percentage)
                <input type="number" name="discount" min={1} max={100} />
              </label>
            ) : (
              ""
            )}
          </div>

          <div>
            <button type="submit">Calcuate</button>
            {/* <button type="reset">Reset answers</button> */}
            {/* May not need a reset button since uncontrolled fields are reset on form submission. */}
          </div>
        </form>

        {summary.price > 0 && summary.discount ? <Summary {...summary} /> : ""}
      </main>
      <footer>
        <p>
          Created by <a href="/">Elyse Hadid</a>
        </p>
      </footer>
    </>
  );
}

export default App;
