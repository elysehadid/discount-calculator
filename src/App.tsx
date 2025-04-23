import { useState } from "react";
import Summary from "./components/Summary";
import DiscountCalculatorForm from "./components/DiscountCalculatorForm";
import { SummaryProps } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
        <Header />
        <DiscountCalculatorForm setSummary={setSummary} />
        {summary.price > 0 && summary.discount ? <Summary {...summary} /> : ""}
      </main>
      <Footer />
    </>
  );
}

export default App;
