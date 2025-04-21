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
