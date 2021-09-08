import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import Button from '../components/Button'
import Header from '../parts/Header'
import {list_users} from '../utils/ListUsersUtil'

const Accounts = ({status}) => {

  const history = useHistory();

  //Set state of list of customers in data with value of object with account info
  const generatedList = list_users();
  const[customerList, setCustomerList] = useState(generatedList);

  //onChange function to filter Accounts display results depending on search
  function handleOnKeyUp(e){
    if (e.key === 'Enter') {
      const searchQuery = e.target.value;
      const filteredCustomers = customerList.filter(customer => customer.accNum === searchQuery);
      setCustomerList(filteredCustomers);
    } else if (e.key === 'Backspace' || e.key === 'Clear' || e.key === 'Cut' || e.key === 'Delete' ) {
      setCustomerList(list_users())
    }
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
    <Header />
    <h1>Welcome { status.currentAdmin }</h1>
      <div className="accounts-main">
        <input type="text" name = "accounts-search-input" id="accounts-search-input" className="form-control" placeholder="Search" onKeyUp={handleOnKeyUp}/>
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
            { customerList.length ? (<tbody>
              {customerList.map((customer) => (
                <tr key = {customer.accNum}>
                  <td>{customer.accNum}</td>
                  <td>{`${customer.firstname} ${customer.lastname}`}</td>
                  <td>{customer.balance}</td>
                  <td><Button classnames="buttons table-btn" onclick={() => handleOnClick(customer.accNum)}>View Account</Button></td>
                </tr>
              ))}
            </tbody>) : (
              "No customer accounts yet."
              // Include state implementation here so that 2 different messages are displayed: no customer accounts and no search results
            )}
          </table>
        </div>
      </div>
    </>
  )
}

export default Accounts