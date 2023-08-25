import React, {useState} from "react";

import "./NewExpense.css";
import {API_KEY} from '../../API';
import ExpenseForm from "./ExpenseForm";

function NewExpense(props) {
  const [isEditing, setIsEditing] = useState(false);

  const saveExpenseDataHandler = async (expenseData) => {
    await fetch(
      `${API_KEY}/expenses.json`,
      {
        method: 'POST',
        body: JSON.stringify({
          expenseData
        }),
      }
    );
    setIsEditing(false);
    props.onAddExpense({...expenseData, id: Math.random()});
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className="new-expense">
      {!isEditing && (
        <button onClick={startEditingHandler}>Add Expenses</button>
      )}
      {isEditing && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
}

export default NewExpense;
