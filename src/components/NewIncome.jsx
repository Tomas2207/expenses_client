import React, { useState } from 'react';
import { useEffect } from 'react';
import { currencies, options } from '../utils/data';

const NewIncome = (props) => {
  const { getIncomes, setShowForm, getYear, getChartData } = props;
  const initalValues = {
    amount: '',
    date: new Date().toISOString().split('T')[0],
  };
  const [formValues, setFormValues] = useState(initalValues);
  const [formErrors, setFormErrors] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState(['$', 'USD']);
  const [convertionResult, setConvertionResult] = useState();

  const validate = (values) => {
    const errors = {};
    if (!values.amount) {
      errors.amount = 'Set a valid amount';
    }
    return errors;
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log(formValues);
  };

  var myHeaders = new Headers();
  myHeaders.append('apikey', process.env.REACT_APP_CURRENCY_API);

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  const handleCurrencyChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    let value = e.target.value.split('-');
    setCurrentCurrency(value);
    console.log(formValues);
  };

  const convertCurrency = () => {
    fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=USD&from=${currentCurrency[1]}&amount=${formValues.amount}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setConvertionResult(result.result))
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    if (isSubmit) {
      makeRequest();
    }
    setIsSubmit(false);
  }, [isSubmit]);

  useEffect(() => {
    getIncomes();
  }, []);

  const makeRequest = () => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0) {
      const body = {
        income_amount: convertionResult,
        income_date: formValues.date.split('T')[0],
      };
      console.log(body);
      fetch('http://localhost:5000/income', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then((data) => {
        getIncomes();
        getChartData();
        getYear();
        setShowForm(false);
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    convertCurrency();
  };

  useEffect(() => {
    if (convertionResult) setIsSubmit(true);
  }, [convertionResult]);

  return (
    <div className="w-[25rem] flex items-center justify-center text-white to-neonPink p-2 rounded-lg mx-auto">
      <form
        action=""
        className="flex gap-4 flex-col justify-between w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl text-bg font-bold text-center text-white">
          New Income
        </h2>
        <div className="flex flex-col gap-2 items-center">
          <div className="text-bg font-normal">
            {formErrors ? formErrors.category : null}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <label htmlFor="amount" className="font-normal">
            Amount
          </label>
          <div className="flex w-full">
            <div className="text-black">
              <select
                name="currency"
                id=""
                className=" w-full text-sm rounded-lg block w-full p-2.5 bg-bg border-gray-600 placeholder-gray-400 text-white outline-none"
                value={formValues.currency}
                onChange={handleCurrencyChange}
              >
                {currencies.map((currency) => (
                  <option value={currency[0] + '-' + currency[1]}>
                    {currency[0] + currency[1]}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="tel"
              name="amount"
              placeholder="Amount"
              className="bg-bg outline-none w-[90%] rounded-md ml-1 px-1"
              value={formValues.amount}
              onChange={handleChange}
            />
          </div>
          <div className="text-bg font-normal">
            {formErrors ? formErrors.amount : null}
          </div>
        </div>

        <label htmlFor="date" className="font-normal self-center">
          Date
        </label>
        <input
          type="date"
          name="date"
          className="bg-bg outline-none w-full text-center h-10 rounded-md px-32"
          value={formValues.date}
          onChange={handleChange}
        />

        <button className="bg-bg px-2 py-1 rounded-md text-white w-full">
          Add
        </button>
      </form>
    </div>
  );
};

export default NewIncome;
