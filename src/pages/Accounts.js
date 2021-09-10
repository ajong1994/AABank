import React, { useState, useEffect} from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import Button from '../components/Button'
import Header from '../parts/Header'
import {list_users} from '../utils/ListUsersUtil'
import {SearchIcon} from '@heroicons/react/outline'
import {formatMoney} from '../utils/FormatMoneyUtil'

const Accounts = ({status, updater}) => {

  const history = useHistory();

  //Set state of list of customers in data with value of object with account info
  const generatedList = list_users();
  const[customerList, setCustomerList] = useState(generatedList);

  //Set state of searchquery
  const [searchQuery, setSearchQuery] = useState('');

  //State of error message
  //setState when input state is empty and customerList is empty then change to 'No customer accounts yet'. otherwise it's 'No search results. Try again.'
  const [errorMsg, setErrorMsg] = useState('No customer accounts yet.')

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

  //onChange function to filter Accounts display results depending on search
  //Convert this to state implementation
  function handleOnKeyUp(e){
    if (e.key === 'Enter') {
      const filteredCustomers = customerList.filter(customer => customer.accNum === searchQuery);
      setCustomerList(filteredCustomers);
    } else if (e.target.value === '') {
      setCustomerList(list_users())
    }
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
    <Header status={status} />
    <h1>Welcome { status.currentAdmin }</h1>
      <div className="accounts-main container m-auto">
        <div className="flex align-middle">
        <span className="mt-1 mb-2 h-10 px-3 rounded-md rounded-r-none bg-gray-100 border-transparent flex items-center">
          <SearchIcon className="h-5 w-5inline-block"/>
        </span>
        <input type="text" name = "accounts-search-input" id="accounts-search-input" placeholder="Enter account number" onChange={handleOnChange} onKeyUp={handleOnKeyUp} value={searchQuery}
        className="mt-1 mb-2 inline-block h-10 rounded-md rounded-l-none bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"/>
        </div>
        { customerList.length ? (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
        <div>
          <p>{errorMsg}</p>
        </div>
        )}
      </div>
    </>
  )
}

export default Accounts