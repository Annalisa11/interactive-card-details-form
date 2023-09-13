import InputField from "../InputField";
import "./DateInputField.scss";

type Props = {
  label: string;
};

const DateInputField = ({ label }: Props): JSX.Element => {
  return (
    <div className='date-input-field'>
      <label htmlFor='m-date'>Exp.date (MM/YY)</label>
      <div>
        <InputField use='m-date' type='text' placeholder='MM' />
        <InputField use='y-date' type='text' placeholder='YY' />
      </div>
    </div>
  );
};

export default DateInputField;
