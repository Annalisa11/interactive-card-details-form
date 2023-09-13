import "./InputField.scss";

type Props = {
  label: string;
  placeholder?: string;
  use: string;
  type: string;
};

const InputField = ({ label, placeholder, use, type }: Props): JSX.Element => {
  return (
    <div className='inputfield'>
      <label htmlFor={`${use}`}>{label}</label>
      <input type={`${type}`} name={`${use}`} placeholder={`${placeholder}`} />
    </div>
  );
};

export default InputField;
