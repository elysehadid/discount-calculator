export type FormValuesProps = {
  // Form values are either a string or a blob.
  [key: string]: string | Blob;
};

export type SummaryProps = {
  amount: number;
  difference: number;
  discount: string;
  price: number;
};
