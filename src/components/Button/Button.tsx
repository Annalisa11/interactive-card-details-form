import "./Button.scss";

type Props = {
  label: string;
};

const Button = ({ label }: Props): JSX.Element => {
  return (
    <button type='submit' className='button'>
      {label}
    </button>
  );
};

export default Button;
