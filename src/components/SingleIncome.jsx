const { monthNames } = require('../utils/data');

const SingleIncome = (props) => {
  let date = props.date;

  date = date.split('-');
  if (props.year === date[0] && props.month == date[1] - 1)
    return (
      <div
        key={props.index}
        className="w-[95%] flex justify-between items-center p-2 rounded-xl mx-auto my-2 bg-blue-300 text-gray-700"
      >
        <div className="flex gap-2">
          <div>
            <div className=" text-2xl font-normal">
              {props.currentCurrency[0] +
                (props.amount * props.rate).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </div>
          </div>
        </div>

        <div>{date[0] + ' ' + monthNames[date[1] - 1] + ' ' + date[2]}</div>
      </div>
    );
};

export default SingleIncome;
