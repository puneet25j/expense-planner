import React,{useEffect, useState} from "react"

import Expenses from './components/Expenses/Expenses'
import NewExpense from './components/NewExpense/NewExpense';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();


  useEffect(() => {
    const fetchExpenses = async () => {
      const respone = await fetch(
        `${process.env.REACT_APP_API_KEY}/expenses.json`
      );

      if (!respone.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await respone.json();

      const loadedExpenses = [];

      for (const expense in responseData) {
        loadedExpenses.push({
          id: expense,
          title: responseData[expense].expenseData.title,
          amount: responseData[expense].expenseData.amount,
          date: new Date(responseData[expense].expenseData.date),
        });
      }
      setExpenses(loadedExpenses);
      setIsLoading(false);
    };
    fetchExpenses().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  let output = <Expenses items={expenses}></Expenses>;

  if (isLoading) {
    output = <h2 className="fallback">Loading...</h2>
  }

  if (httpError) {
    output = (
      <h2 className="fallback">{httpError}</h2>
    );
  }

  const addExpenseHandler = (expense) => {
    setExpenses(prevExpeneses => {
      return [expense,...prevExpeneses];
    })
  };
  
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler}/>
      {output}
    </div>
  );
}

export default App;
