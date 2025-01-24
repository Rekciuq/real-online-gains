import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button";
import { z, ZodSchema } from "zod";

type FormProps<T extends ZodSchema> = {
  handleSubmit: SubmitHandler<z.infer<T>>;
  schema: T;
  defaultValues?: z.infer<T>;
  children: React.ReactNode;
};

const Form = <T extends ZodSchema>({
  handleSubmit,
  schema,
  defaultValues,
  children,
}: FormProps<T>) => {
  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema, {}, { mode: "sync", raw: true }),
    mode: "all",
    defaultValues,
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form>
    </FormProvider>
  );
};

Form.Submit = Button;

export default Form;
