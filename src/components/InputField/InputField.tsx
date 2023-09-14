import { useState } from "react";
import "./InputField.scss";

type Props = {
  label?: string;
  placeholder?: string;
  use: string;
  type: string;
  inputValue: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeState?: React.Dispatch<React.SetStateAction<string>>;
};

const InputField = ({
  label,
  placeholder,
  use,
  type,
  inputValue,
  onChange,
  onChangeState,
}: Props): JSX.Element => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeState) onChangeState(event.target.value);
    if (onChange) onChange(event);
    else return;
  };
  return (
    <div className='inputfield'>
      <label htmlFor={`${use}`}>{label}</label>
      <input
        type={`${type}`}
        name={`${use}`}
        placeholder={`${placeholder}`}
        value={inputValue}
        onChange={handleInput}
      />
    </div>
  );
};

export default InputField;
