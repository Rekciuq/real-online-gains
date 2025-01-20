import ErrorMessage from "../ErrorMessage";
import Label from "../Label";
import DateInput from "./DateInput";
import ImageInput from "./ImageInput";
import PasswordInput from "./PasswordInput";
import TextArea from "./TextArea";
import TextInput from "./TextInput";

type TextInputGroupProps = {
  children: React.ReactNode;
};

const InputGroup = ({ children }: TextInputGroupProps) => {
  return <div className="flex flex-col p-2 m-2 gap-1">{children}</div>;
};

InputGroup.Label = Label;
InputGroup.TextInput = TextInput;
InputGroup.DateInput = DateInput;
InputGroup.ImageInput = ImageInput;
InputGroup.TextArea = TextArea;
InputGroup.PasswordInput = PasswordInput;
InputGroup.ErrorMessage = ErrorMessage;

export default InputGroup;
