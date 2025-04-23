import { SetFormErrorsProps } from "../../types";

function FormErrors(errors: SetFormErrorsProps) {
  return (
    <>
      {errors.discount.length || errors.price.length ? (
        <div>
          {errors.discount.length
            ? errors.discount.map((error: string) => (
                <p>
                  <b>{error}</b>
                </p>
              ))
            : ""}

          {errors.price.length
            ? errors.price.map((error: string) => (
                <p>
                  <b>{error}</b>
                </p>
              ))
            : ""}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default FormErrors;
