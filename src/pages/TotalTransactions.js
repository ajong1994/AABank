import { getLocalDate } from "../utils/LocalDateUtil";
import { useState } from "react";
import { Redirect } from "react-router";
import ReactToExcel from 'react-html-table-to-excel'
import {formatMoney} from '../utils/FormatMoneyUtil'
import Header from "../parts/Header";
import { AlertVector } from "../components/AlertVector";


function TotalTransactions({status, updater}) {

  if (localStorage.getItem('transactionList')!== null) {
    var parsedList = JSON.parse(localStorage.getItem('transactionList')).reverse() 
  } else {
    var parsedList = []
  }

  const [transactionList, setTransactionList] = useState(parsedList);
 
  //If user not isLoggedIn based on state passed as prop, redirect to accounts component
  if (!status.isLoggedIn) {
    return <Redirect to="/login"/>
  } 

  return (
      <>
      <div className="flex">
        <Header status={status} updater={updater}/>
        <div className="mx-auto px-10 w-9/12 mt-8">
          
          {transactionList.length 
          ? 
          <>
          <h2 className="text-center font-bold text-2xl text-gray-600 uppercase pt-5 font-Lato">All Transactions</h2>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-8">       
            <table className="min-w-full divide-y divide-gray-200" id="all-transactions-table"> 
              <thead className="bg-gray-50">
                <tr>
                  <th className="cstm-th text-center" >Transaction ID</th>
                  <th className="cstm-th text-center">Transaction Type</th>
                  <th className= "cstm-th text-center">Amount</th>
                  <th className="cstm-th text-center">Date</th>
                  <th className="cstm-th text-center">Account Origin</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactionList.map((transaction) => (
                <tr key={transaction.transactionId}>
                  <td className="cstm-td text-center"><p className="cstm-td-text text-center">{transaction.transactionId}</p></td>
                  <td className="cstm-td text-center"><p className="cstm-td-text text-center">{transaction.transaction}</p></td>
                  <td className="cstm-td text-center"><p className="cstm-td-text text-center">{formatMoney(transaction.amount)}</p></td>
                  <td className="cstm-td text-center"><p className="cstm-td-text text-center">{getLocalDate(transaction.date)}</p></td>
                  <td className="cstm-td text-center"><p className="cstm-td-text text-center">{transaction.user}</p></td>
                </tr>
              ))}
              </tbody>
            </table>   
          </div> 
          </>
        :   <div className="mt-14 py-20 rounded-md bg-white">
              <div className="max-w-xs sm:max-w-md mx-auto py-8 flex justify-center"><AlertVector width="74%" height="auto"/></div>
              <p className="mx-auto text-center">No transactions yet.</p>
            </div>
          }   
        {transactionList === null 
        ?
        <div className="flex justify-center p-3 bg-gray-50">
          <ReactToExcel
            className="bg-transparent hover:text-white font-semibold py-2 px-4 border border-gray-400 rounded-full shadow hover:bg-purple-400 text-gray-800"
            table="all-transactions-table"
            filename="Transactions excelFile"
            sheet="Sheet"
            buttonText='⭳ Download '
          />
        </div>
        : <></>
        }   
      </div> 
    </div> 
    </>
  )
}

export default TotalTransactions
