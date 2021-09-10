import React, { useState, useEffect} from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import Button from '../components/Button'
import Header from '../parts/Header'
import {list_users} from '../utils/ListUsersUtil'

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
    if (searchQuery === '' && customerList.length === 0) {
      setErrorMsg('No users yet.')
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
      <div className="accounts-main">
      <input type="text" name = "accounts-search-input" id="accounts-search-input" className="form-control" placeholder="Search" onChange={handleOnChange} onKeyUp={handleOnKeyUp} value={searchQuery}/>
        { customerList.length ? (
        <div className="table-main-container">
          <table className="accounts-table">
              <thead>
                <tr>
                  <th>AccNum</th>
                  <th>Customer Name</th>
                  <th>Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customerList.map((customer) => (
                  <tr key = {customer.accNum}>
                    <td>{customer.accNum}</td>
                    <td>{`${customer.firstname} ${customer.lastname}`}</td>
                    <td>{customer.balance}</td>
                    <td><Button classnames="buttons table-btn" onclick={() => handleOnClick(customer.accNum)}>View Account</Button></td>
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