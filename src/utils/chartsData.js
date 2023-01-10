import { date_array } from './data';

const copy_array = JSON.parse(JSON.stringify(date_array));

export const BarChartData = async (formValues, currentUser) => {
  const response = await fetch(
    `${process.env.REACT_APP_ORIGIN_URL}/expenses/chart?year=${formValues.year}&id=${currentUser.user_id}`
  );
  const data = await response.json();

  if (data.length === 0) return date_array;

  data.forEach((dat) => {
    copy_array[dat.date_part - 1].amount = dat.amount;
    copy_array[dat.date_part - 1].date_part = dat.date_part;
  });

  return copy_array;
};
export const ChartDataIncome = async (formValues, currentUser) => {
  const response = await fetch(
    `${process.env.REACT_APP_ORIGIN_URL}/income/chart?year=${formValues.year}&id=${currentUser.user_id}`
  );
  const data = await response.json();

  if (data.length === 0) return date_array;

  data.forEach((dat) => {
    copy_array[dat.date_part - 1].income = dat.amount;
    copy_array[dat.date_part - 1].date_part = dat.date_part;
  });

  return copy_array;
};
export const PieData = async (formValues, currentUser) => {
  const response = await fetch(
    `${process.env.REACT_APP_ORIGIN_URL}/expenses/pie?year=${formValues.year}&month=${formValues.month}&id=${currentUser.user_id}`
  );
  const data = await response.json();
  return data;
};
