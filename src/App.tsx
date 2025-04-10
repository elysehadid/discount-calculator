/*
  type for formData
    discount-type: "percent" or "fixed"
    price: number
    discount-amount: number or undefined/null/etc
    discount-percent: number or undefined/null/etc
 */

import { useState } from "react";

function App() {
  const [discountType, setDiscountType] = useState("");

  const getAllFormValues = (formData) => {
    let values = {};
    for (const value of formData.entries()) {
      values[value[0]] = value[1];
    }
    return values;
  };

  const submitForm = (formData) => {
    alert(`formData: ${JSON.stringify(getAllFormValues(formData))}`);
    return;
  };

  const handleDiscountType = (e) => {
    const { value } = e.target;
    alert(`Discount type set to: ${value}`);
    setDiscountType(value);
    return;
  };

  return (
    <>
      <main>
        <section>
          <h1>Discount calculator</h1>
          <p>Calculate discounts with any fuss or hassle.</p>
        </section>

        <form action={submitForm}>
          <fieldset>
            <legend>Select a discount type</legend>
            <label>
              Percent off
              <input
                type="radio"
                name="discount-type"
                onChange={(e) => {
                  handleDiscountType(e);
                }}
                value="percent"
              />
            </label>

            <label>
              Fixed amount off
              <input
                type="radio"
                name="discount-type"
                onChange={(e) => {
                  handleDiscountType(e);
                }}
                value="fixed"
              />
            </label>
          </fieldset>

          <div>
            <label>
              Price (before discount)
              <input type="number" name="price" />
            </label>

            {discountType === "fixed" ? (
              <label>
                Discount (amount)
                <input type="number" name="price-amount" />
              </label>
            ) : (
              ""
            )}

            {discountType === "percent" ? (
              <label>
                Discount (percentage)
                <input
                  type="number"
                  name="price-percentage"
                  min={1}
                  max={100}
                />
              </label>
            ) : (
              ""
            )}
          </div>

          <div>
            <button type="submit">Calcuate</button>

            <button type="reset">Reset answers</button>
          </div>
        </form>

        <section>
          {/* visible after form is complete */}
          <p>
            With an original price of <b>variable</b> and a discount of{" "}
            <b>percentage or fixed amount</b>
          </p>
          <h2>Price after discount: $100</h2>
          <h2>You saved: $100</h2>
        </section>
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
