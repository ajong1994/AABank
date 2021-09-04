import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Textfield from './Textfield'
import Button from './Button'


const Account = ({location}) => {

  //Use URL API to create new URLSearchParams instance  from location.search 
  const searchQuery = new URLSearchParams(location.search)

  //Get customer data from local storage using searchQuery get function on parameter "id". Then put it into State
  const [customerData, setCustomerData] = useState(JSON.parse(localStorage.getItem(`user-${searchQuery.get("id")}`)) || null );
  
  function handleDeposit() {
    const depositAmount = Number(document.getElementById('deposit-input').value);
    if (depositAmount && depositAmount > 0) {
      setCustomerData((prevState) => ({
        ...prevState,
        balance: Number(prevState.balance) + depositAmount
      }))
    } else if (depositAmount < 0) {
      alert("You can't input a negative value.")
    }
  };

  function handleWithdraw() {
    const withdrawAmount = Number(document.getElementById('withdraw-input').value);
    //Error handling to ensure customer can't withdraw more than their account balance
    if (withdrawAmount && withdrawAmount > 0 && withdrawAmount <= customerData.balance) {
      setCustomerData((prevState) => ({
        ...prevState,
        balance: Number(prevState.balance) - withdrawAmount
      }))
    } else if (withdrawAmount && withdrawAmount < 0 && withdrawAmount <= customerData.balance) {
      alert("You can't input a negative value.")
    } else {
      alert("You can't withdraw more than your current balance")
    }
  };

  function handleTransfer() {
    const receivingAccount = document.getElementById('recipient-input').value;
    const transferAmount = Number(document.getElementById('transfer-input').value);
    const receivingCustomerData = JSON.parse(localStorage.getItem(`user-${receivingAccount}`));
    console.log(typeof receivingAccount)
    console.log(typeof customerData.accNum)
    console.log(receivingCustomerData)
    //Check if account exists
    if (receivingAccount !== customerData.accNum && receivingCustomerData !== null && transferAmount < customerData.balance) {
      receivingCustomerData.balance = receivingCustomerData.balance + transferAmount;
      localStorage.setItem(`user-${receivingAccount}`, JSON.stringify(receivingCustomerData));

      setCustomerData((prevState) => ({
        ...prevState,
        balance: Number(prevState.balance) - transferAmount
      }))
    } else if (receivingAccount !== customerData.accNum && receivingCustomerData !== null) {
      alert("Transfer amount exceeds current balance.")
    } else if (receivingAccount !== customerData.accNum && transferAmount > customerData.balance){
      alert("Recipient account number does not exist.")
    } else {
      alert("Can't send to own account.")
    }

  };

  useEffect(() => {
    // Add handler on mount if id in query is invalid
    if (customerData) {
      localStorage.setItem(`user-${customerData.accNum}`, JSON.stringify(customerData))
    }
  }, [customerData])

  return (
    <div> 
      {(customerData !== null) ? (
      <div>
        <div>Account Number: {customerData.accNum}</div>
        <div>Full Name: {customerData.firstname} {customerData.lastname}</div>
        <div>Email: {customerData.email}</div>
        <div>Balance: {customerData.balance}</div>
        <div style={{border: '1px solid black', padding: '10px'}}> 
          <Textfield id="deposit-input" placeholder="Enter your deposit amount" type="number">Deposit</Textfield>
          <Button onclick={handleDeposit}>Deposit Amount</Button>
        </div>
        <div style={{border: '1px solid black', padding: '10px'}}> 
          <Textfield id="withdraw-input" placeholder="Enter your withdraw amount" type="number">Withdraw</Textfield>
          <Button onclick={handleWithdraw}>Withdraw Amount</Button>
        </div>
        <div style={{border: '1px solid black', padding: '10px'}}> 
          <Textfield id="recipient-input" placeholder="Enter receiving account number" type="number">Transfer</Textfield>
          <Textfield id="transfer-input" placeholder="Enter your transfer amount" type="number"/>
          <Button onclick={handleTransfer}>Transfer Amount</Button>
        </div> 
      </div>
    ) : (
      <div>
        <p>"Customer account number does not exist."</p>
        <Link to="/accounts">Return to accounts</Link>
      </div>
      )}
    </div>
  )
}

export default Account
