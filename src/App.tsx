import "./App.scss";
import mobileImgae from "./images/bg-main-mobile.png";
import Logo from "./images/card-logo.svg";

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <div className='banner'></div>
        <div className='cards'>
          <div className='card-back'>
            <p className='pin'>000</p>
          </div>
          <div className='card-front'>
            <div className='circles'>
              <img src={Logo} />
            </div>
            <div>
              <p className='iban'>0000 0000 0000 0000</p>
            </div>
            <div className='lower-row'>
              <p className='name'>Jane Appleseed</p>
              <p className='date'>00/00</p>
            </div>
          </div>
        </div>
        <div className='card-form'>
          <form className='form'>
            <div className='inputfield'>
              <label htmlFor='name'>Label</label>
              <input type='text' name='name' />
            </div>
            <button type='submit' className='button'>
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
