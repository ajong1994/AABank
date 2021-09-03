import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Textfield from './Textfield'


//component
import Account from './Account'


const Accounts = () => {
  
  //Get list of total customers to loop through from localStorage
  const customerList = JSON.parse(localStorage.getItem('customerList'));

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

  return (
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
                  <td>icons here</td>
                </tr>
              ))}
            </tbody>) : (
              "No customer accounts yet."
            )}
          </table>
        </div>
      </div>
  )
}

export default Accounts