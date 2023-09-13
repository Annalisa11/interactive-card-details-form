import "./App.scss";

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <div className='banner'></div>
        <div className='cards'>
          <div className='card-front'></div>
          <div className='card-back'></div>
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
