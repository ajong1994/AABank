import { getLocalDate } from "../utils/LocalDateUtil";
import { useState } from "react";
import { Redirect } from "react-router";
import ReactToExcel from 'react-html-table-to-excel'
import {formatMoney} from '../utils/FormatMoneyUtil'
import Header from "../parts/Header";
import { AlertVector } from "../components/AlertVector";
import PageContent from '../parts/PageContent';
import TransIcon from "../components/TransIcon";


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
      <div className="flex h-full">
        <Header status={status} updater={updater}/>
        <PageContent>
          <div className="mx-auto p-10 w-9/12">
            {transactionList.length 
            ? 
            <>
            <h2 className="text-center font-bold text-2xl text-gray-600 uppercase  font-Lato ">All Transactions</h2>
            <div className="shadow border-b border-gray-200 sm:rounded-lg mt-8">       
              <table className="min-w-full divide-y divide-gray-200" id="all-transactions-table"> 
                <thead className="bg-gray-50">
                  <tr>
                    <th className="cstm-th  text-gray-400" >Transaction ID</th>
                    <th className="cstm-th  text-gray-400">Transaction Type</th>
                    <th className= "cstm-th  text-gray-400">Details</th>
                    <th className="cstm-th  text-gray-400 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactionList.map((transaction) => (
                  <tr key={transaction.transactionId}>
                    <td className="cstm-td"><p className="cstm-td-text">#{transaction.transactionId}</p></td>
                    <td className="cstm-td">
                    <TransIcon transaction={transaction.transaction}/>
                    <span className="capitalize td-centered-text">{transaction.transaction}</span>
                    </td>
                    <td className="cstm-td text-gray-300">
                    <p>#{transaction.user}</p>
                    <p>{getLocalDate(transaction.date)}</p>
                    </td>
                    {/* <td className="cstm-td text-center"><p className="cstm-td-text text-right">{formatMoney(transaction.amount)}</p></td> */}
                    {(transaction.transaction === 'received') || (transaction.transaction === 'deposit') 
                    ? 
                    <td className="cstm-td text-center"><p className='text-primary text-right'>{formatMoney(transaction.amount)}</p></td>
                    :
                    <td className="cstm-td text-right"><p>-{formatMoney(transaction.amount)}</p></td>
                    }
                  </tr>
                ))}
                </tbody>
              </table>   
            </div> 
            </>
            : <div className="mt-14 py-20 rounded-md bg-white">
                <div className="max-w-xs sm:max-w-md mx-auto py-8 flex justify-center"><AlertVector width="74%" height="auto"/></div>
                <p className="mx-auto text-center">No transactions yet.</p>
              </div>
            }   
            {transactionList !== null 
            ? <div className="flex justify-center p-3 bg-gray-50">
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
        </PageContent>
      </div> 
  )
}

export default TotalTransactions
