import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { ValuesContext } from '../utils/Context';
import { currencies } from '../utils/data';

const NewIncome = (props) => {
  const { setShowForm, getChartData, currentUser } = props;
  const { getIncomes, getYear } = useContext(ValuesContext);
  const initalValues = {
    amount: '',
    date: new Date().toISOString().split('T')[0],
  };
  const [formValues, setFormValues] = useState(initalValues);
  const [formErrors, setFormErrors] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState(['$', 'USD']);
  const [convertionResult, setConvertionResult] = useState();
  const [loading, setLoading] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.amount) {
      errors.amount = 'Set a valid amount';
    }
    return errors;
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setFormErrors(null);
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
    if (Object.keys(formErrors).length === 0) {
      const body = {
        income_amount: convertionResult,
        income_date: formValues.date.split('T')[0],
        user_id: currentUser.user_id,
      };
      fetch(`${process.env.REACT_APP_ORIGIN_URL}/income`, {
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
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors(validate(formValues));
    convertCurrency();
  };

  useEffect(() => {
    if (convertionResult) setIsSubmit(true);
  }, [convertionResult]);

  return (
    <div className="w-full flex justify-center text-white bg-bg p-2 rounded-lg h-[15rem]">
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
          <div className="flex w-full">
            <div className="text-black">
              <select
                name="currency"
                id=""
                className=" w-full text-sm rounded-lg block w-full p-2.5 bg-body border-gray-600 placeholder-gray-400 text-white outline-none"
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

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="bg-body outline-none w-[90%] rounded-md ml-1 px-1"
              value={formValues.amount}
              onChange={handleChange}
            />
          </div>
          <div className="text-bg font-normal">
            {formErrors ? (
              <div className="text-red-600">{formErrors.amount}</div>
            ) : null}
          </div>
        </div>
        <input
          type="date"
          name="date"
          className="bg-body outline-none w-full text-center h-8 rounded-md px-32"
          value={formValues.date}
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-body px-2 py-1 rounded-md text-white w-full"
        >
          {!loading ? 'Add' : 'Loading...'}
        </button>
      </form>
    </div>
  );
};

export default NewIncome;
