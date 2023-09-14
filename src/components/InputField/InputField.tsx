import { useState } from "react";
import "./InputField.scss";
import { error } from "console";

type Props = {
  label?: string;
  placeholder?: string;
  use: string;
  type: string;
  inputValue: string;
  errorMsg?: string;
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
  onChange,
  onChangeState,
  validateInput,
  formatInput,
}: Props): JSX.Element => {
  const [error, setError] = useState<boolean>(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let eventValue = event.target.value;
    if (validateInput) setError(validateInput(event.target.value));
    if (formatInput) eventValue = formatInput(eventValue);
    if (onChangeState) onChangeState(eventValue);
    else if (onChange) onChange(event);
    else return;
  };
  return (
    <div className={`inputfield ${!!error ? "" : "error"}`}>
      <label htmlFor={`${use}`}>{label}</label>
      <input
        type={`${type}`}
        name={`${use}`}
        placeholder={`${placeholder}`}
        value={inputValue}
        onChange={handleInput}
      />
      {!!error && inputValue && <div className='errorMsg'>{errorMsg}</div>}
    </div>
  );
};

export default InputField;
