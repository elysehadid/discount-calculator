export type FormValuesProps = {
  // Form values are either a string or a blob.
  [key: string]: string | Blob;
};

export type RawFormDataProps = globalThis.FormData;

export type SummaryProps = {
  amount: number;
  difference: number;
  discount: string;
  price: number;
};

export type SetFormErrorsProps = {
  discount: string[];
  price: string[];
};

export type SetSummaryProps = {
  setSummary: React.Dispatch<React.SetStateAction<SummaryProps>>;
};
