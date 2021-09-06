import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import Button from '../components/Button'
import Header from '../parts/Header'


const Accounts = ({status}) => {

  const history = useHistory();
  
  //Get list of total customers to loop through from localStorage
  const customerList = JSON.parse(localStorage.getItem('customerList'));

  //Set state of list of customers in data with value of object with account info
  const[customerData, setCustomerData] = useState(list_users());
  
  //For every customer, get their data from local storage and add it to array for mapping
  function list_users() {
    if (customerList !== null) {
      var populatedCustomerList = []
      for (let customer of customerList) {
         populatedCustomerList.push(JSON.parse(localStorage.getItem(customer)))
      }
      return populatedCustomerList;
    } else {
      return [];
    };
  }

  //onChange function to filter Accounts display results depending on search
  function handleOnKeyUp(e){
    if (e.key === 'Enter') {
      const searchQuery = e.target.value;
      const filteredCustomers = customerData.filter(customer => customer.accNum === searchQuery);
      setCustomerData(filteredCustomers);
    } else if (e.key === 'Backspace' || e.key === 'Clear' || e.key === 'Cut' || e.key === 'Delete' ) {
      setCustomerData(list_users())
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
            { customerData.length ? (<tbody>
              {customerData.map((customer) => (
                <tr key = {customer.accNum}>
                  <td>{customer.accNum}</td>
                  <td>{`${customer.firstname} ${customer.lastname}`}</td>
                  <td>{customer.balance}</td>
                  <td><Button classnames="buttons table-btn" onclick={() => handleOnClick(customer.accNum)}>View Account</Button></td>
                </tr>
              ))}
            </tbody>) : (
              "No customer accounts yet."
            )}
          </table>
        </div>
      </div>
    </>
  )
}

export default Accounts