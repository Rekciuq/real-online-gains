import { useFormContext } from "react-hook-form";

type RadioInputProps = {
  id: string;
  value: string;
};

const RadioInput = ({ id, value }: RadioInputProps) => {
  const defaultClassNames = "!border-emerald-100 !hover:border-emerald-200";
  const { register } = useFormContext();
  return (
    <input
      className={defaultClassNames}
      value={value}
      type="radio"
      {...register(id)}
    />
  );
};

export default RadioInput;
