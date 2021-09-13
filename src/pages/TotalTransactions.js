import { getLocalDate } from "../utils/LocalDateUtil";
import { useState } from "react";
import { Redirect } from "react-router";
import ReactToExcel from 'react-html-table-to-excel'
import {formatMoney} from '../utils/FormatMoneyUtil'
import Header from "../parts/Header";


function TotalTransactions({status}) {

  const [transactionList, setTransactionList] = useState(JSON.parse(localStorage.getItem('transactionList')).reverse() || []);
    //If user not isLoggedIn based on state passed as prop, redirect to accounts component
  if (!status.isLoggedIn) {
    return <Redirect to="/login"/>
  } 

  return (
      <>
      <div className="container grid grid-rows-1 grid-flow-col gap-6 h-screen">
          <div className="row-span-3">
          <Header status={status}/>
          </div>
        
      <div> 
          <h2 className="text-center font-bold text-2xl text-gray-600 uppercase pt-5 font-Lato">All Transactions</h2>
          <div className="row-span-1 w-full p-8">
          {transactionList.length 
          ? 
          <>            
            <table className="h-full w-full divide-y divide-gray-200" id="all-transactions-table"> 
              <thead className="bg-gray-50 text-center">
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
          
          </> 
          : <div className="mt-8 py-8 rounded-md bg-white">
              <div className="max-w-xs sm:max-w-md mx-auto py-8 flex justify-center">icon or graphic for no transaction here</div>
              <p>No transactions yet.</p>
            </div>
          }   
          
        <div className="flex justify-center p-3 bg-gray-50">
          <ReactToExcel
            className="bg-transparent hover:text-white font-semibold py-2 px-4 border border-gray-400 rounded-full shadow hover:bg-purple-400 text-gray-800"
            table="all-transactions-table"
            filename="Transactions excelFile"
            sheet="Sheet"
            buttonText='⭳ Download '
          />
        </div>
      </div> 
    </div> 
    </div> 
    </>
  )
}

export default TotalTransactions
