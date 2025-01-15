import { useForm, FormProvider, FieldValues } from "react-hook-form";
import InputGroup from "./InputGroup";

type FormProps = {
  handleSubmit: (data: FieldValues) => void;
  children: React.ReactNode;
};

const Form = ({ handleSubmit, children }: FormProps) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form>
    </FormProvider>
  );
};

Form.InputGroup = InputGroup;

export default Form;
