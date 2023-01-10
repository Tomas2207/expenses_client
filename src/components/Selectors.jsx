import React from 'react';
import { useContext } from 'react';
import { ValuesContext } from '../utils/Context';
import { currencies, monthNames } from '../utils/data';

const Selectors = ({ formValues, handleChange, handleCurrencyChange }) => {
  const { years } = useContext(ValuesContext);
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full self-start">
      {years ? (
        <select
          name="year"
          id=""
          className=" text-lg rounded-lg block w-full p-2.5 bg-bg border-gray-600 placeholder-gray-400 text-white
      outline-none"
          value={formValues.year}
          onChange={handleChange}
        >
          {years.map((year, i) => (
            <option value={year.date_part} key={i}>
              {year.date_part}
            </option>
          ))}
        </select>
      ) : null}
      <select
        name="month"
        id=""
        className=" text-lg rounded-lg block w-full p-2.5 bg-bg border-gray-600 placeholder-gray-400 text-white
      outline-none"
        value={monthNames.indexOf(monthNames[formValues.month])}
        onChange={handleChange}
      >
        {monthNames.map((month, i) => (
          <option key={i} value={i}>
            {month}
          </option>
        ))}
      </select>

      <select
        name="currency"
        id=""
        className=" text-lg rounded-lg block w-full p-2.5 bg-bg border-gray-600 placeholder-gray-400 text-white
      outline-none"
        value={formValues.currency}
        onChange={handleCurrencyChange}
      >
        {currencies.map((currency, i) => (
          <option key={i} value={currency[0] + '-' + currency[1]}>
            {currency[0] + currency[1]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selectors;
