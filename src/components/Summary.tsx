import { SummaryProps } from "../types";
import { formatToDollar } from "../utils";

function Summary({
  amount,
  difference,
  discount,
  discountType,
  price,
}: SummaryProps) {
  return (
    <section>
      {amount > 0 && difference > 0 ? (
        <>
          <p>
            With an original price of <b>{formatToDollar(price)}</b> and a
            discount of{" "}
            <b>
              {discountType === "percent"
                ? `${(discount * 100).toString()}%`
                : formatToDollar(discount)}
            </b>
          </p>
          <h2>Price after discount: {formatToDollar(difference)}</h2>
          <h2>You saved: {formatToDollar(price - difference)}</h2>
        </>
      ) : (
        ""
      )}
    </section>
  );
}

export default Summary;
