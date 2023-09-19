import { useState } from "react";
import "./App.scss";
import Button from "./components/Button";
import Cards from "./components/Cards";
import DateInputField from "./components/DateInputField";
import InputField from "./components/InputField/InputField";
import { useForm, useWatch } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import "./components/Input/Input.scss";
import "./components/InputField/InputField.scss";

export interface expDate {
  month: string;
  year: string;
}

export interface validationResponse {
  valid: boolean;
  errorMsg: string;
}

export interface formData {
  name: string;
  cardNumber: string;
  expDateMonth: string;
  expDateYear: string;
  cvc: string;
}

function App() {
  // const [name, setName] = useState<string>("");
  // const [cardNumber, setCardNumber] = useState<string>("");
  // const [expDate, setExpDate] = useState<expDate>({ month: "", year: "" });
  // const [verificationNumber, setVerificationNumber] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // const [formData, setFormData] = useState<formData>();

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

  const formatCardNumber = (number: string): void => {
    const strippedNum = removeSpaces(number);
    const devidedNum = strippedNum.match(/.{1,4}/g);

    setValue(
      "cardNumber",
      `${devidedNum ? devidedNum.join(" ").toUpperCase() : ""}`,
      { shouldDirty: true, shouldValidate: true }
    );
  };

  // const handleExpDate = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ): boolean => {
  //   const { name, value } = event.target;

  //   const regex = /^(\s*|\d+)$/;
  //   if (regex.test(value)) {
  //     const month = name == "m-date" ? value : expDate.month;
  //     const year = name == "y-date" ? value : expDate.year;
  //     setExpDate({ month: month, year: year });
  //   }
  //   return false; //needed for the error recognition (false bcs there's never an error, since it's impossible to make one)
  // };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitted(true);
  };

  type FormData = {
    name: string;
    cardNumber: string;
    expDate: {
      month: string;
      year: string;
    };
    cvc: string;
  };

  const onSubmit = (data: FormData) => {
    console.log("form submitted", data);
    // setIsSubmitted(true);
  };

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      cardNumber: "",
      expDate: { month: "", year: "" },
      cvc: "",
    },
    mode: "onChange",
  });
  const { register, control, handleSubmit, formState, setValue } = form;
  const { errors } = formState;
  // const {name, ref, onChange, onBlur} = register("name") Bsp

  const name = useWatch({ name: "name", control: control });
  const cardNumber = useWatch({ name: "cardNumber", control: control });
  const cvc = useWatch({ name: "cvc", control: control });
  const expDate = useWatch({ name: "expDate", control: control });

  return (
    <div className='app'>
      <div className='container'>
        <div className='banner'></div>
        <Cards
          name={name}
          cardNumber={cardNumber}
          verificationNumber={cvc}
          expDate={expDate}
        />
        {isSubmitted ? (
          <div className='submitted'>THANK YOU</div>
        ) : (
          <div className='card-form'>
            <form className='form' onSubmit={handleSubmit(onSubmit)} noValidate>
              <div
                className={`input inputfield ${
                  errors.cardNumber ? "error" : ""
                }`}
              >
                <label htmlFor='cardNumber'>Card Number</label>
                <input
                  type='text'
                  placeholder='e.g. 1234 5678 9123 4567'
                  maxLength={19}
                  {...register("cardNumber", {
                    required: "Can't be blank",
                    validate: {
                      notNumeric: (inputValue) =>
                        !validateCardNumber(inputValue) ||
                        "Card Number not valid",
                    },
                    onChange: (e) => {
                      formatCardNumber(e.target.value);
                    },
                  })}
                />
                <p className='errorMsg'>{errors.cardNumber?.message}</p>
              </div>

              <div className='input'>
                <label htmlFor='name'>Name</label>
                <input type='text' {...register("name")} />
              </div>
              <div className='input'>
                <label htmlFor='month'>Date Month</label>
                <input type='text' {...register("expDate.month")} />
              </div>
              <div className='input'>
                <input type='text' {...register("expDate.year")} />
              </div>
              <div className='input'>
                <label htmlFor='cvc'>Cvc</label>
                <input type='text' {...register("cvc")} />
              </div>

              <button type='submit'>Submit</button>
            </form>
            <DevTool control={control} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
