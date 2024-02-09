import "./InputField.scss";
import "../Input/Input.scss";
import { FieldError, useFormContext } from "react-hook-form";

type Props = {
  label: string;
  placeholder: string;
  maxLength?: number;
  name: string;
  validation?: (value: string) => boolean;
  formatInput?: (value: string) => void;
  error: FieldError | undefined;
};

const InputField = ({
  label,
  placeholder,
  maxLength,
  validation,
  error,
  name,
  formatInput,
}: Props): JSX.Element => {
  const { register } = useFormContext();
  return (
    <div className={`input ${error?.message ? "error" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type='text'
        placeholder={placeholder}
        maxLength={maxLength}
        {...register(name, {
          required: "Can't be blank",
          validate: (inputValue) => {
            if (validation && validation(inputValue)) {
              return "Wrong format, numbers only";
            }
          },
          onChange: (e) => {
            if (formatInput) formatInput(e.target.value);
          },
        })}
      />
      <p className='errorMsg'>{error?.message}</p>
    </div>
  );
};

export default InputField;
