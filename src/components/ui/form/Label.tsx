import { useFormContext } from "react-hook-form";

const Label = () => {
  const { formState } = useFormContext();
  const hasError = formState.errors[htmlFor];
  return <label htmlFor={htmlFor}>{inputTitle}</label>;
};

export default Label;
