import { deleteExpense } from '../utils/delete';
import delete_btn from '../assets/delete_btn.png';

const { monthNames } = require('../utils/data');

const SingleTransaction = (props) => {
  const { expense_category, expense_date, expense_amount, expense_id } =
    props.expense;
  const { year, month } = props.formValues;
  let date = expense_date;
  let title =
    expense_category.charAt(0).toUpperCase() + expense_category.slice(1);

  const handleDelete = () => {
    deleteExpense(expense_id, props.user, props.getExpenses);
  };

  date = date.split('-');
  if (year === date[0] && month == date[1] - 1)
    return (
      <div className="w-[95%] flex flex-col sm:flex-row justify-between text-white sm:items-center p-1 bg-bg mx-auto my-2 border border-bg border-b-neon2">
        <div className="flex gap-2">
          {/* <img
            src={require(`../assets/${props.category}.png`)}
            alt="category"
            className="h-12 "
          /> */}
          <div>
            <div className=" text-2xl font-normal">
              {props.currentCurrency[0] +
                (expense_amount * props.rate).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </div>
            <div>{title}</div>
          </div>
        </div>

        <div>{date[0] + ' ' + monthNames[date[1] - 1] + ' ' + date[2]}</div>
        <button
          onClick={handleDelete}
          className="px-2 py-2 bg-neon2 rounded-md hover:bg-black duration-150 flex justify-center"
        >
          <img src={delete_btn} alt="delete" className="h-6" />
        </button>
      </div>
    );
};

export default SingleTransaction;
