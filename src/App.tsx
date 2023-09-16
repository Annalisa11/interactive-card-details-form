import { useState } from "react";
import "./App.scss";
import Button from "./components/Button";
import Cards from "./components/Cards";
import DateInputField from "./components/DateInputField";
import InputField from "./components/InputField/InputField";

export interface expDate {
  month: string;
  year: string;
}

export interface validationResponse {
  valid: boolean;
  errorMsg: string;
}

function App() {
  const [name, setName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expDate, setExpDate] = useState<expDate>({ month: "", year: "" });
  const [verificationNumber, setVerificationNumber] = useState<string>("");

  const removeSpaces = (s: string): string => {
    return s.replace(/\s/g, "");
  };

  const validateInputNumbers = (input: string): boolean => {
    return !/^\d+$/.test(input);
  };

  const validateInputString = (input: string): boolean => {
    return !/^[A-Za-z\s]*$/.test(input);
  };

  const validateCardNumber = (number: string): boolean => {
    const num = removeSpaces(number);
    return validateInputNumbers(num);
  };

  const formatCardNumber = (number: string): string => {
    const strippedNum = removeSpaces(number);
    const devidedNum = strippedNum.match(/.{1,4}/g);
    return devidedNum ? devidedNum.join(" ").toUpperCase() : "";
  };

  const handleExpDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ): boolean => {
    const { name, value } = event.target;

    const regex = /^(\s*|\d+)$/;
    if (regex.test(value)) {
      const month = name == "m-date" ? value : expDate.month;
      const year = name == "y-date" ? value : expDate.year;
      setExpDate({ month: month, year: year });
    }
    return false; //needer for the error recognition (there's never an error, since it's impossible to make one)
  };

  return (
    <div className='app'>
      <div className='container'>
        <div className='banner'></div>
        <Cards
          name={name}
          cardNumber={cardNumber}
          verificationNumber={verificationNumber}
          expDate={expDate}
        />
        <div className='card-form'>
          <form className='form'>
            <InputField
              label='Cardholder Name'
              use='name'
              type='text'
              placeholder='e.g Jane Appleseed'
              inputValue={name}
              validateInput={validateInputString}
              onChangeState={setName}
              errorMsg='no numbers allowed'
            />
            <InputField
              label='Card Number'
              use='cardNr'
              type={"text"}
              placeholder='e.g 1234 5678 9123 0000'
              inputValue={cardNumber}
              errorMsg={"wrong format, numbers only"}
              maxLength={16 + 3}
              onChangeState={setCardNumber}
              validateInput={validateCardNumber}
              formatInput={formatCardNumber}
            />
            <div className='last-input-row'>
              <DateInputField
                label={"label"}
                inputValue={expDate}
                maxLength={2}
                onChange={handleExpDate}
                validateInput={handleExpDate}
              />
              <InputField
                label='Cvc'
                use='cvc'
                type='text'
                placeholder='e.g 123'
                inputValue={verificationNumber}
                errorMsg={"only numbers allowed"}
                maxLength={3}
                onChangeState={setVerificationNumber}
                validateInput={validateCardNumber}
              />
            </div>
            <Button label='Confirm' />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
