import { useFormContext } from "react-hook-form";

type ErrorMessageProps = {
  inputName: string;
};

const ErrorMessage = ({ inputName }: ErrorMessageProps) => {
  const { formState } = useFormContext();
  const errorMessage = formState.errors[inputName];
  return errorMessage && <span>{errorMessage}</span>;
};

export default ErrorMessage;
