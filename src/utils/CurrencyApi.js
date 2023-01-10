var myHeaders = new Headers();
myHeaders.append('apikey', process.env.REACT_APP_CURRENCY_API);

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
};

const GetCurrencyChange = async (currentCurrency) => {
  const response = await fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${currentCurrency[1]}&from=USD&amount=1`,
    requestOptions
  );
  const data = await response.json();

  return data;
};

module.exports = { GetCurrencyChange };
