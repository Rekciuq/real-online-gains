import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import PasswordInput from "./PasswordInput";
import TextInput from "./TextInput";

type TextInputGroupProps = {
  children: React.ReactNode;
};

const InputGroup = ({ children }: TextInputGroupProps) => {
  return <div>{children}</div>;
};

InputGroup.Label = Label;
InputGroup.TextInput = TextInput;
InputGroup.PasswordInput = PasswordInput;
InputGroup.ErrorMessage = ErrorMessage;

export default InputGroup;
