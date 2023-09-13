import React from "react";
import "./Cards.scss";
import Logo from "../../images/card-logo.svg";

type Props = {};

const Cards = ({}: Props): JSX.Element => {
  return (
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
  );
};

export default Cards;
