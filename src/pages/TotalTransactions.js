import { getLocalDate } from "../utils/LocalDateUtil";
import { useState } from "react";
import { Redirect } from "react-router";
import ReactToExcel from 'react-html-table-to-excel'
import Header from "../parts/Header";

function TotalTransactions({status}) {

  const [transactionList, setTransactionList] = useState(JSON.parse(localStorage.getItem('transactionList')).reverse() || []);
    //If user not isLoggedIn based on state passed as prop, redirect to accounts component
  if (!status.isLoggedIn) {
    return <Redirect to="/login"/>
  } 

  return (
      <>
      <Header status={status}/>
      <div class="container flex justify-center mx-auto">
      <div class="flex flex-col">
      <div class="w-full">
      <div class="border-b border-gray-200 shadow">
      {transactionList.length 
      ? <>
        <h2 className="text-center font-bold text-2xl uppercase mb-10">All Transactions</h2>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"></div>
        {/* <table className="all-transactions-table">  */}
        <table className="min-w-full divide-y divide-gray-200" id="all-transactions-table"> 
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-2 text-xs text-gray-500" >Transaction ID</th>
              <th className="px-6 py-2 text-xs text-gray-500">Transaction Type</th>
              <th className= "px-6 py-2 text-xs text-gray-500">Amount</th>
              <th className="px-6 py-2 text-xs text-gray-500">Date</th>
              <th className="px-6 py-2 text-xs text-gray-500">Account Origin</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transactionList.map((transaction) => (
            <tr key={transaction.transactionId} className="whitespace-nowrap">
              <td className="px-6 py-4 text-sm text-gray-500">{transaction.transactionId}</td>
              <td className="px-6 py-4 text-sm text-gray-500"><div className="text-sm text-gray-900">{transaction.transaction}</div></td>
              <td className="px-6 py-4">{transaction.amount}</td>
              <td className="px-6 py-4">{getLocalDate(transaction.date)}</td>
              <td className="px-6 py-4">{transaction.user}</td>
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
      </div>
      </div>
      </div>
      <div className="mt-5 flex place-content-center w-full bg-gray-50">
      <ReactToExcel
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        table="all-transactions-table"
        filename="Transactions excelFile"
        sheet="Sheet"
        buttonText="Download"  
        />

      </div>
    </>
  )
}

export default TotalTransactions
