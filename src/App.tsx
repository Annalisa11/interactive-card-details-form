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
import SubmittedLogo from "./images/icon-complete.svg";

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
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    setIsSubmitted(true);
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
          <div className='form'>
            <div className='submitted'>
              <img src={SubmittedLogo} alt='completed submission icon' />
              <h2>Thank you!</h2>
              <p>We've added your card details</p>
            </div>
          </div>
        ) : (
          <div className='card-form'>
            <form className='form' onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className={`input inputfield ${errors.name ? "error" : ""}`}>
                <label htmlFor='name'>Cardholder Name</label>
                <input
                  type='text'
                  placeholder='e.g. Jane Appleseed'
                  {...register("name", {
                    required: "Can't be blank",
                  })}
                />
                <p className='errorMsg'>{errors.name?.message}</p>
              </div>

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
                        "Wrong format, numbers only",
                    },
                    onChange: (e) => {
                      formatCardNumber(e.target.value);
                    },
                  })}
                />
                <p className='errorMsg'>{errors.cardNumber?.message}</p>
              </div>

              <div className='last-input-row'>
                <div className='date-inputfields'>
                  <label htmlFor='month'>Exp.Date (MM/YY)</label>
                  <div
                    className={`input inputfield ${
                      errors.expDate?.month ? "error" : ""
                    }`}
                  >
                    <input
                      type='text'
                      placeholder='MM'
                      maxLength={2}
                      {...register("expDate.month", {
                        required: "Can't be blank",
                        validate: {
                          notNumeric: (inputValue) =>
                            !validateCardNumber(inputValue) ||
                            "Wrong format, numbers only",
                        },
                      })}
                    />
                  </div>

                  <div
                    className={`input inputfield ${
                      errors.expDate?.year ? "error" : ""
                    }`}
                  >
                    <input
                      type='text'
                      placeholder='YY'
                      maxLength={2}
                      {...register("expDate.year", {
                        required: "Can't be blank",
                        validate: {
                          notNumeric: (inputValue) =>
                            !validateCardNumber(inputValue) ||
                            "Wrong format, numbers only",
                        },
                      })}
                    />
                  </div>
                  <p className='errorMsg'>
                    {errors.expDate?.month?.message ||
                      errors.expDate?.year?.message}
                  </p>
                </div>

                <div
                  className={`input inputfield ${errors.cvc ? "error" : ""}`}
                >
                  <label htmlFor='cvc'>Cvc</label>
                  <input
                    type='text'
                    placeholder='e.g. 123'
                    maxLength={3}
                    {...register("cvc", {
                      required: "Can't be blank",
                      validate: {
                        notNumeric: (inputValue) =>
                          !validateCardNumber(inputValue) ||
                          "Wrong format, numbers only",
                      },
                    })}
                  />
                  <p className='errorMsg'>{errors.cvc?.message}</p>
                </div>
              </div>

              <Button label='Confirm' />
            </form>
            <DevTool control={control} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
