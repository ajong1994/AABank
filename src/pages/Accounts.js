import React, { useState, useEffect} from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import Button from '../components/Button'
import Header from '../parts/Header'
import {list_users} from '../utils/ListUsersUtil'
import {SearchIcon} from '@heroicons/react/outline'
import {formatMoney} from '../utils/FormatMoneyUtil'
import {AlertVector} from '../components/AlertVector'
import {NewAccVector} from '../components/NewAccVector'

const Accounts = ({status, updater}) => {

  const history = useHistory();

  //Set state of list of customers in data with value of object with account info
  const [generatedList, setGeneratedList] = useState(list_users());
  const[customerList, setCustomerList] = useState(generatedList);

  //Set state of searchquery
  const [searchQuery, setSearchQuery] = useState('');

  //State of error message
  //setState when input state is empty and customerList is empty then change to 'No customer accounts yet'. otherwise it's 'No search results. Try again.'
  const [errorMsg, setErrorMsg] = useState('No customer accounts yet.')

  //Every time the input value of the search changes, as long as it's not empty, filter through the list of total customers and check if the account exists
  //If input is blank, then display total list of customers
  useEffect(() => {
    if (searchQuery !== '') {
      const filteredCustomers = generatedList.filter(customer => customer.accNum === searchQuery);
      setCustomerList(filteredCustomers);
    } else {
      setCustomerList(generatedList)
    }
  },[searchQuery])

  //If filtered customers was changed, check if search query is blank and if total list if customers is empty. if both true, display no customer UI. 
  //If filtered customer list is empty but search query is not empty, then display no search match UI.
  useEffect(() => {
    if (searchQuery === '' && generatedList.length === 0) {
      setErrorMsg('No customer accounts yet.')
    } else if (searchQuery !== '' && customerList.length === 0) {
      setErrorMsg('No user with that account number.')
    }
  },[customerList])

  //If user not isLoggedIn based on state passed as prop, redirect to accounts component
  if (!status.isLoggedIn) {
    return <Redirect to="/login"/>
  } 

  function handleOnChange(e) {
    setSearchQuery(e.target.value);
  }

  //Redirect to specific account page by passing in customer as prop to Account component on click
  function handleOnClick(customerId){
    history.push({
      pathname: "/account", 
      search: `?id=${customerId}`
    });
  }

  return (
    <>
    <div className="flex">
      <Header status={status} updater={updater} />
      <div className="mx-auto px-10 w-7/12 my-8">
        {/* <h1>Welcome, { status.currentAdmin }!</h1> */}
        <div className="flex align-middle">
        <span className="mt-1 mb-2 h-10 px-3 rounded-md rounded-r-none bg-gray-100 border-transparent flex items-center">
          <SearchIcon className="h-5 w-5inline-block"/>
        </span>
        <input type="text" name = "accounts-search-input" id="accounts-search-input" placeholder="Enter account number" onChange={handleOnChange} value={searchQuery}
        className="mt-1 mb-2 inline-block h-10 rounded-md rounded-l-none bg-gray-100 border-transparent focus:border-transparent focus:bg-white focus:ring-0 text-sm flex-grow"/>
        </div>
        { customerList.length ? (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-8">
          <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="cstm-th">Account Number</th>
                  <th className="cstm-th">Customer Name</th>
                  <th className="cstm-th">Balance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customerList.map((customer) => (
                  <tr key = {customer.accNum}>
                    <td className="cstm-td"><p className="cstm-td-text">{customer.accNum}</p></td>
                    <td className="cstm-td"><p className="cstm-td-text">{`${customer.firstname} ${customer.lastname}`}</p></td>
                    <td className="cstm-td"><p className="cstm-td-text">{formatMoney(customer.balance)}</p></td>
                    <td className="cstm-td text-sm"><Button classnames="text-primary hover:underline cursor-pointer" onclick={() => handleOnClick(customer.accNum)}>View Account</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>) : ( 
        <div className="mt-8 py-8 rounded-md bg-white">
          <div className="max-w-xs sm:max-w-md mx-auto py-8 flex justify-center">{errorMsg === 'No customer accounts yet.' ? <NewAccVector width="74%" height="auto"/> : <AlertVector width="100%" height="auto"/>}</div>
          <p className="mx-auto text-center">{errorMsg}</p>
        </div>
        )}
      </div>
    </div>
      
    </>
  )
}

export default Accounts