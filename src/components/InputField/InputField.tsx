import { useState } from "react";
import "./InputField.scss";
import Input from "../Input/Input";

type Props = {
  label?: string;
  placeholder?: string;
  use: string;
  type: string;
  inputValue: string;
  errorMsg?: string;
  maxLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeState?: React.Dispatch<React.SetStateAction<string>>;
  validateInput?: (input: string) => boolean;
  formatInput?: (input: string) => string;
};

const InputField = ({
  label,
  placeholder,
  use,
  type,
  inputValue,
  errorMsg,
  maxLength,
  onChange,
  onChangeState,
  validateInput,
  formatInput,
}: Props): JSX.Element => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(errorMsg ?? "");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let eventValue = event.target.value;

    if (validateInput) {
      setError(validateInput(eventValue));
      setErrorMessage(errorMsg ?? "");
    }

    if (formatInput) eventValue = formatInput(eventValue);

    if (onChangeState) onChangeState(eventValue);
    else if (onChange) onChange(event);
  };

  const handleBlankInput = () => {
    if (inputValue === "") {
      setErrorMessage("can't be blank");
      setError(true);
    }
  };

  return (
    <div className={`inputfield ${error ? "error" : ""}`}>
      <label htmlFor={`${use}`}>{label}</label>
      <Input
        type={`${type}`}
        use={`${use}`}
        placeholder={`${placeholder}`}
        inputValue={inputValue}
        maxLength={maxLength}
        onChange={handleInput}
        onBlur={handleBlankInput}
      />
      {error && <div className='errorMsg'>{errorMessage}</div>}
    </div>
  );
};

export default InputField;
