import { useFormContext } from "react-hook-form";

type LabelProps = {
  htmlFor: string;
  inputTitle: string;
};

const Label = ({ htmlFor, inputTitle }: LabelProps) => {
  const { formState } = useFormContext();
  const hasError = formState.errors[htmlFor];
  return (
    <label className={hasError && "text-red-400"} htmlFor={htmlFor}>
      {inputTitle}
    </label>
  );
};

export default Label;
