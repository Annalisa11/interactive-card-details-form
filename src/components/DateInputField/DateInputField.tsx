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
  validateInput?: (event: React.ChangeEvent<HTMLInputElement>) => boolean;
  formatInput?: (input: string) => string;
  onChangeState?: React.Dispatch<React.SetStateAction<string>>;
  setFunction:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<expDate>>;
};

const DateInputField = ({
  inputValue,
  maxLength,
  errorMsg,
  onChange,
  validateInput,
  formatInput,
  onChangeState,
  setFunction,
}: Props): JSX.Element => {
  const [error, setError] = useState<boolean>(false);
  const [errorInputM, setErrorInputM] = useState<boolean>(false);
  const [errorInputY, setErrorInputY] = useState<boolean>(false);

  const testForOnlyDigits = (s: string): boolean => {
    return /^\d+$/.test(s);
  };

  const validateCardNumber = (number: string) => {
    const num = number.replace(/\s/g, "");

    if (testForOnlyDigits(num)) return true;
    else return false;
  };

  const handleBlankInput = () => {
    if (inputValue.month == "") {
      console.log("month blank");
      setErrorInputM(true);
      setError(true);
    }
    if (inputValue.year == "") {
      console.log("year blank");
      setErrorInputY(true);
      setError(true);
    }

    console.log("nothing blank");
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let eventValue = event.target.value;
    if (validateInput) {
      const invalidInput = validateInput(event);
      setError(invalidInput);
      setErrorInputM(invalidInput);
      setErrorInputY(invalidInput);
    }
    if (formatInput) eventValue = formatInput(eventValue);
    if (onChangeState) {
      if (validateCardNumber(eventValue)) onChangeState(eventValue);
    } else if (onChange) {
      onChange(event);
    } else return;
  };

  return (
    <div className='date-input-field'>
      <label htmlFor={`m-date`}>Exp.date (MM/YY)</label>
      <div className='date-input-containter'>
        <div className={` ${error ? (errorInputM ? "error" : "") : ""}`}>
          <input
            name='m-date'
            type='text'
            placeholder='MM'
            value={inputValue.month}
            maxLength={maxLength}
            onChange={handleInput}
            onBlur={handleBlankInput}
          />
        </div>
        <div className={` ${error ? (errorInputY ? "error" : "") : ""}`}>
          <input
            name='y-date'
            type='text'
            placeholder='YY'
            value={inputValue.year}
            maxLength={maxLength}
            onChange={handleInput}
            onBlur={handleBlankInput}
          />
        </div>
      </div>
      {error && <div className='errorMsg'>can't be blank</div>}

      {/* <InputField
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
        /> */}
      {/* {!!error && <div className='errorMsg'>{errorMessage}</div>} */}
    </div>
  );
};

export default DateInputField;
