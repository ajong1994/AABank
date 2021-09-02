import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Textfield from './Textfield'


//component
import Account from './Account'


const Accounts = () => {
  
  //Get list of total customers to loop through from localStorage
  const customerList = JSON.parse(localStorage.getItem('customerList'));

  //onChange function to filter Accounts display results depending on search

  //For every customer, get their data from local storage and add it to array for mapping
  const customerData = [];
  if (customerList !== null) {
    for (let customer of customerList) {
      customerData.push(JSON.parse(localStorage.getItem(customer)));
    }
  };

  

  return (
      <div className="accounts-main">

        <header className="App-header">
        <ul>
              <li><NavLink className="navItem" to='/create'>Create an account</NavLink></li>
              <li><NavLink className="navItem" to='/transactions'>Transactions</NavLink></li>
        </ul>
        </header>

      <Textfield classnames="form-control" id="accounts-search-input" type="text" placeholder="Search"/>
      <div class="table-main-container">
        <table class="accounts-table">
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
              <tr>
                <td>{customer.accNum}</td>
                <td>{`${customer.firstname} ${customer.lastname}`}</td>
                <td>{customer.balance}</td>
                <td>icons here</td>
              </tr>
            ))}
          </tbody>) : (
            "No customer accounts yet."
          )}
        </table>
      </div>
               {/* {
            accounts.length ?
              accounts.map((value, index) => (
                //LIST OF ACCOUNTS
                <Account
                  key={index}
                  index={index}
                  value={value}
                />
              )) : <span>No records found!</span>
          } */}
      </div>
  )
}

export default Accounts