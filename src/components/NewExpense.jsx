import React, { useState } from 'react';
import { useEffect } from 'react';
import { options } from '../utils/data';

const NewExpense = ({
  getExpenses,
  setShowForm,
  getYear,
  getChartData,
  getPieData,
}) => {
  const initalValues = {
    category: 'default',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  };
  const [formValues, setFormValues] = useState(initalValues);
  const [formErrors, setFormErrors] = useState();
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (values.category === 'default') {
      errors.category = 'Set a valid category';
    }
    if (!values.amount) {
      errors.amount = 'Set a valid amount';
    }
    return errors;
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isSubmit) {
      makeRequest();
    }
    setIsSubmit(false);
  }, [isSubmit]);

  useEffect(() => {
    getExpenses();
  }, []);

  const makeRequest = () => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0) {
      const body = {
        expense_category: formValues.category,
        expense_amount: formValues.amount,
        expense_date: formValues.date.split('T')[0],
      };
      console.log(body);
      fetch('http://localhost:5000/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then((data) => {
        getExpenses();
        getYear();
        getChartData();
        getPieData();
        setShowForm(false);
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  return (
    <div className="w-full flex items-center justify-center text-white bg-neonPurple p-2 rounded-sm mx-auto">
      <form
        action=""
        className="flex gap-4 flex-col justify-between w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 items-center">
          <label htmlFor="category" className="font-normal">
            Category
          </label>

          <select
            name="category"
            id=""
            className=" text-sm rounded-lg block w-full p-2.5 bg-bg border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500
            outline-none"
            value={formValues.category}
            onChange={handleChange}
          >
            <option value="default">--select category--</option>
            {options.map((option) => (
              <option className="flex items-center" value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="text-bg font-normal">
            {formErrors ? formErrors.category : null}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <label htmlFor="amount" className="font-normal">
            Amount
          </label>
          <div className="flex w-full">
            <div>$</div>
            <input
              type="tel"
              name="amount"
              placeholder="Amount"
              className="bg-bg outline-none w-full "
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
          className="bg-bg outline-none w-full"
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

export default NewExpense;
