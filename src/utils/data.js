const options = [
  'entertainment',
  'shopping',
  'restaurant',
  'services',
  'groceries',
  'transport',
  'holidays',
  'health',
  'other',
];

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const currencies = [
  ['$', 'USD'],
  ['$', 'ARS'],
  ['€', 'EUR'],
  ['₩', 'KRW'],
  ['¥', 'JPY'],
];

let date_array = [
  { date_part: 1, amount: 0, income: 0 },
  { date_part: 2, amount: 0, income: 0 },
  { date_part: 3, amount: 0, income: 0 },
  { date_part: 4, amount: 0, income: 0 },
  { date_part: 5, amount: 0, income: 0 },
  { date_part: 6, amount: 0, income: 0 },
  { date_part: 7, amount: 0, income: 0 },
  { date_part: 8, amount: 0, income: 0 },
  { date_part: 9, amount: 0, income: 0 },
  { date_part: 10, amount: 0, income: 0 },
  { date_part: 11, amount: 0, income: 0 },
  { date_part: 12, amount: 0, income: 0 },
];

module.exports = { options, monthNames, currencies, date_array };
