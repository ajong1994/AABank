import { getLocalDate } from "../utils/LocalDateUtil";
import { formatMoney } from "../utils/FormatMoneyUtil";
import {AlertVector} from '../components/AlertVector'
import TransIcon from "../components/TransIcon";

const Transactions = ({customerData}) => {

  const lastten_transac = customerData.transactions.slice(-10).reverse();
  return (
    <div className="pb-8">
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-8 bg-white p-8">
    {lastten_transac.length > 0 && <h2 className="font-bold px-6 text-xl pb-6">Last 10 Transactions</h2>}
    {lastten_transac.length > 0
    ? <table className="min-w-full divide-y divide-gray-200"> 
          <thead className="">
            <tr>
              <th className="cstm-th text-gray-300">Transaction Type</th>
              <th className="cstm-th text-gray-300">Details</th>
              <th className="cstm-th text-gray-300 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lastten_transac.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td className="cstm-td">
                <TransIcon transaction={transaction.transaction}/>
                <span className="capitalize td-centered-text">{transaction.transaction}</span>
              </td>
              <td className="cstm-td text-gray-400">
                <p>Transaction No.: #{transaction.transactionId}</p>
                <p>{getLocalDate(transaction.date)}</p>
              </td>
              {(transaction.transaction === 'received') || (transaction.transaction === 'deposit') 
              ? 
              <td className="cstm-td"><p className='text-primary text-right'>{formatMoney(transaction.amount)}</p></td>
              :
              <td className="cstm-td text-right"><p>-{formatMoney(transaction.amount)}</p></td>
              }
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
