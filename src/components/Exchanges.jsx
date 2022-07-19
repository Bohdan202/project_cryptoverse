import React from 'react';
import PropTypes from 'prop-types';
import '../currencyInput.css';

const Exchanges = (props) => {

  return (
    <div className="group">
      <select value={props.currency} onChange={ev => props.onCurrencyChange(ev.target.value)}>
        {props.currencies.map(((currency, i) => (
          <option key={i} value={currency}>{currency}</option>
        )))}
      </select>
      <input className="group-input" type="text" value={props.amount} onChange={ev => props.onAmountChange(ev.target.value)} />
    </div>
  );
};

Exchanges.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
};

export default Exchanges;
