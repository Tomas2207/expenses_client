import delete_btn from '../assets/delete_btn.png';
import { deleteIncome } from '../utils/delete';
const { monthNames } = require('../utils/data');

const SingleIncome = (props) => {
  const { income_date, income_amount, income_id } = props.income;
  let date = income_date;
  const { year, month } = props.formValues;

  const handleDelete = () => {
    deleteIncome(income_id, props.user, props.getIncomes);
  };

  date = date.split('-');
  if (year === date[0] && month == date[1] - 1)
    return (
      <div className="w-[95%] flex flex-col sm:flex-row justify-between sm:items-center p-2 mx-auto my-2 bg-bg text-white border border-bg border-b-neon2">
        <div className="flex gap-2">
          <div>
            <div className=" text-2xl font-normal">
              {props.currentCurrency[0] +
                (income_amount * props.rate).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </div>
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

export default SingleIncome;
