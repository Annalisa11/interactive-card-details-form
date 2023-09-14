import React from "react";
import "./Cards.scss";
import Logo from "../../images/card-logo.svg";
import { expDate } from "../../App";

type Props = {
  name: string;
  expDate: expDate;
  cardNumber: string;
  verificationNumber: string;
};

const Cards = ({
  name,
  expDate,
  cardNumber,
  verificationNumber,
}: Props): JSX.Element => {
  return (
    <div className='cards'>
      <div className='card-back'>
        <p className='pin'>{verificationNumber ? verificationNumber : "000"}</p>
      </div>
      <div className='card-front'>
        <div className='circles'>
          <img src={Logo} />
        </div>
        <div>
          <p className='iban'>
            {cardNumber ? cardNumber : "0000 0000 0000 0000"}
          </p>
        </div>
        <div className='lower-row'>
          <p className='name'>{name ? name : "Jane Appleseed"}</p>
          <p className='date'>{`${expDate.month ? expDate.month : "00"}/${
            expDate.year ? expDate.year : "00"
          }`}</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
