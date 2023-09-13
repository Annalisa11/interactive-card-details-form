import "./App.scss";
import Button from "./components/Button";
import Cards from "./components/Cards";
import InputField from "./components/InputField/InputField";

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <div className='banner'></div>
        <Cards />
        <div className='card-form'>
          <form className='form'>
            <InputField
              label='Cardholder Name'
              use='name'
              type='text'
              placeholder='e.g Jane Appleseed'
            />
            <InputField
              label='Card Number'
              use='iban'
              type={"text"}
              placeholder='e.g 1234 5678 9123 0000'
            />
            <Button label='Confirm' />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
