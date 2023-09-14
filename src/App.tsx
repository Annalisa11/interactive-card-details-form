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

function App() {
  const [name, setName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expDate, setExpDate] = useState<expDate>({ month: "", year: "" });
  const [verificationNumber, setVerificationNumber] = useState<string>("");

  const removeSpaces = (s: string): string => {
    return s.replace(/\s/g, "");
  };

  const validateCardNumber = (number: string): boolean => {
    const num = removeSpaces(number);
    const onlyD = /^\d+$/.test(num);

    if (num.length > 16) return false;
    if (onlyD) return false;
    else return true;
  };

  const formatCardNumber = (number: string) => {
    const strippedNum = removeSpaces(number);
    const devidedNum = strippedNum.match(/.{1,4}/g);
    if (devidedNum) return devidedNum?.join(" ");
    else return "";
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // setInputValue(event.target.value);
  };

  const handleExpDate = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    console.log("event.target", name, value);
    const month = name == "m-date" ? value : expDate.month;
    const year = name == "y-date" ? value : expDate.year;
    setExpDate({ month: month, year: year });
    console.log("state", expDate);
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
              onChange={handleInput}
              onChangeState={setName}
            />
            <InputField
              label='Card Number'
              use='iban'
              type={"text"}
              placeholder='e.g 1234 5678 9123 0000'
              inputValue={cardNumber}
              onChangeState={setCardNumber}
              validateInput={validateCardNumber}
              formatInput={formatCardNumber}
              errorMsg={"wrong format, numbers only"}
            />
            <div className='last-input-row'>
              <DateInputField
                label={"label"}
                onChange={handleExpDate}
                inputValue={expDate}
              />
              <InputField
                label='Cvc'
                use='cvc'
                type='text'
                placeholder='e.g 123'
                inputValue={verificationNumber}
                onChangeState={setVerificationNumber}
                errorMsg={"can't be blank"}
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
