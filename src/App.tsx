function App() {
  return (
    <>
      <main>
        <section>
          <h1>Discount calculator</h1>
          <p>Calculate discounts with any fuss or hassle.</p>
        </section>

        <form>
          <fieldset>
            <legend>Select a discount type</legend>
            <label>
              Percent off
              <input type="radio" name="percent" value="percent" />
            </label>

            <label>
              Fixed amount off
              <input type="radio" name="fixed" value="fixed" />
            </label>
          </fieldset>

          <div>
            <label>
              Price (before discount)
              <input type="number" name="price" />
            </label>

            <label>
              Discount (amount)
              <input type="number" name="price-amount" />
            </label>

            <label>
              Discount (percentage)
              <input type="number" name="price-percentage" min={1} max={100} />
            </label>
          </div>

          {/* price before discount: number input */}
          {/* discount: percentage or integer based on radio button */}
          {/* price after discount: price - discount */}
          {/* you saved: discount amount */}

          <div>
            <button type="submit">Calcuate</button>
            {/* inputs need initial values for reset button 2 work; this will be controlled by react anyways tho */}
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
