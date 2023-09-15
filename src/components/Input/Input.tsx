import { useState } from "react";
import "./InputField.scss";

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
  handleInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
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
  return (
    <input
      type={`${type}`}
      name={`${use}`}
      placeholder={`${placeholder}`}
      value={inputValue}
      maxLength={maxLength}
    />
  );
};

export default Input;
