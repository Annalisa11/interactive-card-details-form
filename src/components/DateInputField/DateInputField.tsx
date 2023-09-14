import { useState } from "react";
import { expDate } from "../../App";
import InputField from "../InputField";
import "./DateInputField.scss";

type Props = {
  label: string;
  inputValue: expDate;
  errorMsg?: string;
  maxLength?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validateInput?: (input: string) => boolean;
  formatInput?: (input: string) => string;
};

const DateInputField = ({
  inputValue,
  maxLength,
  errorMsg,
  onChange,
  validateInput,
  formatInput,
}: Props): JSX.Element => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(errorMsg ?? "");

  const handleBlankInput = () => {
    setErrorMessage("can't be blank");
    setError(true);
  };

  return (
    <div className='date-input-field'>
      <label htmlFor='m-date'>Exp.date (MM/YY)</label>
      <div>
        <InputField
          use='m-date'
          type='text'
          placeholder='MM'
          inputValue={inputValue.month}
          onChange={onChange}
          maxLength={maxLength}
          validateInput={validateInput}
        />
        <InputField
          use='y-date'
          type='text'
          placeholder='YY'
          inputValue={inputValue.year}
          onChange={onChange}
          maxLength={maxLength}
          validateInput={validateInput}
        />
        {!!error && <div className='errorMsg'>{errorMessage}</div>}
      </div>
    </div>
  );
};

export default DateInputField;
