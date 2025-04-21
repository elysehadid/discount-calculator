export const formatToDollar = (amount: number) => {
  const usDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return usDollar.format(amount);
};
