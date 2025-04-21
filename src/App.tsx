import { useState } from "react";
import Summary from "./components/Summary";
import DiscountCalculatorForm from "./components/DiscountCalculatorForm";
import { SummaryProps } from "./types";

function App() {
  const [summary, setSummary] = useState<SummaryProps>({
    amount: 0,
    difference: 0,
    discount: "",
    price: 0,
  });

  return (
    <>
      <main>
        <section>
          <h1>Discount calculator</h1>
          <p>Calculate discounts with any fuss or hassle.</p>
        </section>
        <DiscountCalculatorForm setSummary={setSummary} />
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
