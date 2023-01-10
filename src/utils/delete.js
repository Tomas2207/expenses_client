export const deleteExpense = async (expense, user, callback) => {
  try {
    const body = {
      expense_id: expense,
    };
    const response = await fetch(
      `${process.env.REACT_APP_ORIGIN_URL}/expenses/delete/${user.user_id}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    callback();
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteIncome = async (income, user, callback) => {
  const body = {
    income_id: income,
  };
  const response = await fetch(
    `${process.env.REACT_APP_ORIGIN_URL}/income/delete/${user.user_id}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  const data = await response.json();
  callback();
};
