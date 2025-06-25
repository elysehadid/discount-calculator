import { RawFormDataProps, FormValuesProps } from "../types";

export const formatToDollar = (amount: number) => {
  const usDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return usDollar.format(amount);
};

export const getAllFormValues = (formData: RawFormDataProps) => {
  const values: FormValuesProps = {};
  for (const value of formData.entries()) {
    values[value[0]] = value[1];
  }
  return values;
};

export const calculateDiscount = (formValues: FormValuesProps) => {
  // Rename props so names don't clash.
  const {
    price: priceString,
    discount: discountString,
    "discount-type": discountType,
  } = formValues;

  const isPercent = discountType === "percent";
  const price = Number(priceString);
  const discountNumber = Number(discountString);
  const discount = isPercent ? discountNumber / 100 : discountNumber; // numerical discount represented by percentage or whole number
  const amount = isPercent ? price * discount : discount; // total amount of discount
  const difference = price - amount; // amount of money saved with discount

  return {
    amount,
    difference,
    discount,
    discountType,
    price,
  };
};
