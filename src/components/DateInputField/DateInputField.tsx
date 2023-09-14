import { expDate } from "../../App";
import InputField from "../InputField";
import "./DateInputField.scss";

type Props = {
  label: string;
  inputValue: expDate;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DateInputField = ({ inputValue, onChange }: Props): JSX.Element => {
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
        />
        <InputField
          use='y-date'
          type='text'
          placeholder='YY'
          inputValue={inputValue.year}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default DateInputField;
