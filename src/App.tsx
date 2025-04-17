import { useState } from "react";

type RawFormData = globalThis.FormData;

type FormValues = {
  // Form values are either a string or a blob.
  [key: string]: string | Blob;
};

function App() {
  const [discountType, setDiscountType] = useState<string>("percent");
  const [price, setPrice] = useState<number>(0);
  const [summary, setSummary] = useState<{
    amount: number;
    difference: number;
    discount: string;
  }>({ amount: 0, difference: 0, discount: "" });

  const formatToDollar = (amount: number) => {
    const usDollar = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    return usDollar.format(amount);
  };

  const getAllFormValues = (formData: RawFormData) => {
    let values: FormValues = {};
    for (const value of formData.entries()) {
      values[value[0]] = value[1];
    }
    return values;
  };

  const isFormSubmitted = () => {
    if (summary.amount > 0 || summary.difference > 0) {
      setSummary({ amount: 0, difference: 0, discount: "" });
    }

    return;
  };

  const calculateDiscount = (
    formValues: FormValues,
    setSummary: React.Dispatch<
      React.SetStateAction<{
        amount: number;
        difference: number;
        discount: string;
      }>
    >
  ) => {
    const price = Number(formValues["price"]);

    const discount =
      discountType === "percent"
        ? Number(formValues["discount-percent"]) / 100
        : Number(formValues["discount-amount"]);

    const discountAmount =
      discountType === "percent"
        ? price * discount
        : Number(formValues["discount-amount"]);

    setSummary({
      discount:
        discountType === "percent"
          ? `${formValues["discount-percent"].toString()}%`
          : formatToDollar(Number(formValues["discount-amount"])),
      amount: discountAmount,
      difference: price - discountAmount,
    });

    return;
  };

  const handleFormSubmission = (formData: RawFormData) => {
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
    isFormSubmitted();

    const { value } = e.target;
    setPrice(Number(value));
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
                  name="discount-amount"
                  onChange={() => isFormSubmitted()}
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
            {/* <button type="reset">Reset answers</button> */}
            {/* May not need a reset button since uncontrolled fields are reset on form submission. */}
          </div>
        </form>

        <section>
          {summary.amount > 0 && summary.difference > 0 ? (
            <>
              <p>
                With an original price of <b>{formatToDollar(price)}</b> and a
                discount of <b>{summary.discount}</b>
              </p>
              <h2>
                Price after discount: {formatToDollar(summary.difference)}
              </h2>
              <h2>You saved: {formatToDollar(price - summary.difference)}</h2>
            </>
          ) : (
            ""
          )}
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
