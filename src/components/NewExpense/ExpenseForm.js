import React, { useRef, useState } from 'react';
import './ExpenseForm.css';

const isEmpty = (value) => value.trim() === '';
const isAmount = (value) => {
  if (value.trim() === '' || value === '0') {
    return false;
  }else{
    return true;
  }
};

// touche/updated {valid, showError: true/false,}
// const {hasError, valid, onChange} = useValidator(intiailValidationValue)
function ExpenseForm(props) {
  const [formInputsValidity, setFormInputsValidity] = useState({
    title: true,
    amount: true,
    date: true,
  });

  const titleInputRef = useRef();
  const amountInputRef = useRef();
  const dateInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enterdedTitle = titleInputRef.current.value;
    const enterdedAmount = amountInputRef.current.value;
    const enterdedDate = dateInputRef.current.value;

    const enterdedTitleIsValid = !isEmpty(enterdedTitle);
    const enterdedAmountIsValid = isAmount(enterdedAmount);
    const enterdedDateIsValid = Boolean(enterdedDate);

    setFormInputsValidity({
      title: enterdedTitleIsValid,
      amount: enterdedAmountIsValid,
      date: enterdedDateIsValid
    })

    const formIsValid = enterdedTitleIsValid && enterdedAmountIsValid && enterdedDateIsValid

    if(!formIsValid){
      return;
    }

    const expenseData = {
      title: enterdedTitle,
      amount: +enterdedAmount,
      date: new Date(enterdedDate),
    };

    props.onSaveExpenseData(expenseData);
  };

  const titleControlClasses = `new-expense__control ${
    formInputsValidity.title ? '' : 'invalid'
  }`;

  const amountControlClasses = `new-expense__control ${
    formInputsValidity.amount ? '' : 'invalid'
  }`;

  const dateControlClasses = `new-expense__control ${
    formInputsValidity.date ? '' : 'invalid'
  }`;

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className={titleControlClasses}>
          <label>Title</label>
          <input type="text" ref={titleInputRef} />
          {!formInputsValidity.title && <p>Please enter a valid name!</p>}
        </div>
        <div className={amountControlClasses}>
          <label>Amount</label>
          <input type="number" min="0.01" step="0.01" ref={amountInputRef} />
          {!formInputsValidity.amount && <p>Please enter a valid amount!</p>}
        </div>
        <div className={dateControlClasses}>
          <label>Date</label>
          <input
            type="date"
            min="2022-01-01"
            max="2025-12-31"
            ref={dateInputRef}
          />
          {!formInputsValidity.date && <p>Please select a date</p>}
        </div>
        <div className="new-expense__actions">
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button type="submit">Add Expense</button>
        </div>
      </div>
    </form>
  );
}

export default ExpenseForm;
