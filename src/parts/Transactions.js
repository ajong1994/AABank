import { getLocalDate } from "../utils/LocalDateUtil";
import { formatMoney } from "../utils/FormatMoneyUtil";
import {AlertVector} from '../components/AlertVector'

const Transactions = ({customerData}) => {

  const lastten_transac = customerData.transactions.slice(-10).reverse();
  return (
    <div className="pb-8">
    {lastten_transac.length > 0 && <h2 className="font-bold">Last 10 Transactions</h2>}
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-8">
    {lastten_transac.length > 0
    ? <table className="min-w-full divide-y divide-gray-200"> 
          <thead className="bg-gray-50">
            <tr>
              <th className="cstm-th">Transaction ID</th>
              <th className="cstm-th">Transaction Type</th>
              <th className="cstm-th">Amount</th>
              <th className="cstm-th">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lastten_transac.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td className="cstm-td"><p>{transaction.transactionId}</p></td>
              <td className="cstm-td"><p className="capitalize">{transaction.transaction}</p></td>
              <td className="cstm-td"><p>{formatMoney(transaction.amount)}</p></td>
              <td className="cstm-td"><p>{getLocalDate(transaction.date)}</p></td>
            </tr>
          ))}
          </tbody>
        </table>
    : <div className="py-8 bg-white">
        <div className="max-w-xs sm:max-w-md mx-auto py-8 flex justify-center">
          <AlertVector width="74%" height="auto"/>
        </div>
        <p className="mx-auto text-center">No transactions yet.</p>
      </div>
    }
    </div>
    </div>
  )
}

export default Transactions
