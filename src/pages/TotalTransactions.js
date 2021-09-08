import { getLocalDate } from "../utils/LocalDateUtil";
import { useState } from "react";
import { Redirect } from "react-router";

function TotalTransactions(status) {

  const [transactionList, setTransactionList] = useState(JSON.parse(localStorage.getItem('transactionList')).reverse() || []);
    //If user not isLoggedIn based on state passed as prop, redirect to accounts component
  if (!status.isLoggedIn) {
    return <Redirect to="/login"/>
  } 

  return (
      <div>
      <h2>All Transactions</h2>
      <table className="all-transactions-table"> 
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Account Origin</th>
          </tr>
        </thead>
      </table>
        {transactionList.length ? (<tbody>
          {transactionList.map((transaction) => (
          <tr key={transaction.transactionId}>
            <td>{transaction.transactionId}</td>
            <td>{transaction.transaction}</td>
            <td>{transaction.amount}</td>
            <td>{getLocalDate(transaction.date)}</td>
            <td>{transaction.user}</td>
          </tr>
        ))}
        </tbody>) : "none"}
      </div>
  )
}

export default TotalTransactions
