import { useState } from "react";

type RawFormData = globalThis.FormData;

type FormValues = {
  // Form values are either a string or a blob.
  [key: string]: string | Blob;
};

function App() {
  const [discountType, setDiscountType] = useState("percent");

  const getAllFormValues = (formData: RawFormData) => {
    let values: FormValues = {};
    for (const value of formData.entries()) {
      values[value[0]] = value[1];
    }
    return values;
  };

  const submitForm = (formData: RawFormData) => {
    const formValues = getAllFormValues(formData);
    // alert(`formData: ${JSON.stringify(formValues)}`);
    // discount-type, price, discount-amount, discount-percentage
    // discount formula: Discount % = (Discount/List Price) × 100

    const discount =
      discountType === "percent"
        ? Number(formValues["discount-percent"]) / 100
        : Number(formValues["discount-amount"]);

    alert(`discount: ${discount}`);

    // helper function
    // input: price, discount (percentage or amount)
    // output: price after discount, difference (price - discount)
    // get price
    // get discount (percentage or amount)
    // convert discount to decimal
    // divide discount with list price
    // multiply by 100
    // calculate differences
    // discount amount
    // amount saved

    return;
  };

  const handleDiscountType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
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
                checked={discountType === "percent"}
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
                <input type="number" name="discount-amount" />
              </label>
            ) : (
              ""
            )}

            {discountType === "percent" ? (
              <label>
                Discount (percentage)
                <input
                  type="number"
                  name="discount-percent"
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
