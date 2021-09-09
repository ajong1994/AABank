import { getLocalDate } from "../utils/LocalDateUtil";

const Transactions = ({customerData}) => {

  const lastten_transac = customerData.transactions.slice(-10).reverse();
  return (
    <div>
    {lastten_transac.length 
    ? <>
        <h2>Last 10 Transactions</h2>
        <table className="transactions-table"> 
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Transaction Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {lastten_transac.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td>{transaction.transactionId}</td>
              <td>{transaction.transaction}</td>
              <td>{transaction.amount}</td>
              <td>{getLocalDate(transaction.date)}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </>
    : <div className="no-transaction-container">
        <div>icon or graphic for no transaction here</div>
        <p>No transactions yet.</p>
      </div>
    }
    </div>
  )
}

export default Transactions
