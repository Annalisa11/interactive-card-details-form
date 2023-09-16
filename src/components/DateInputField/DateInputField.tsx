import { useState } from "react";
import { expDate } from "../../App";
import "./DateInputField.scss";
import Input from "../Input";

type Props = {
  label: string;
  inputValue: expDate;
  errorMsg?: string;
  maxLength?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validateInput: (event: React.ChangeEvent<HTMLInputElement>) => boolean;
  formatInput?: (input: string) => string;
};

const DateInputField = ({
  inputValue,
  maxLength,
  onChange,
  validateInput,
  formatInput,
}: Props): JSX.Element => {
  const [errorInputM, setErrorInputM] = useState<boolean>(false);
  const [errorInputY, setErrorInputY] = useState<boolean>(false);

  const handleBlankInput = () => {
    if (inputValue.month == "") {
      setErrorInputM(true);
    }
    if (inputValue.year == "") {
      setErrorInputY(true);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let eventValue = event.target.value;
    if (validateInput) {
      const invalidInput = validateInput(event);
      setErrorInputM(invalidInput);
      setErrorInputY(invalidInput);
    }
    if (formatInput) eventValue = formatInput(eventValue);
    if (onChange) onChange(event);
    else return;
  };

  return (
    <div className='date-input-field'>
      <label htmlFor={`m-date`}>Exp.date (MM/YY)</label>
      <div className='date-input-containter'>
        <div className={`${errorInputM ? "error" : ""}`}>
          <Input
            use='m-date'
            type='text'
            placeholder='MM'
            inputValue={inputValue.month}
            maxLength={maxLength}
            onChange={handleInput}
            onBlur={handleBlankInput}
          />
        </div>
        <div className={`${errorInputY ? "error" : ""}`}>
          <Input
            use='y-date'
            type='text'
            placeholder='YY'
            inputValue={inputValue.year}
            maxLength={maxLength}
            onChange={handleInput}
            onBlur={handleBlankInput}
          />
        </div>
      </div>
      {(errorInputM || errorInputY) && (
        <div className='errorMsg'>can't be blank</div>
      )}
    </div>
  );
};

export default DateInputField;
