import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Textfield from './Textfield'
import Button from './Button'
import Deposit from '../parts/Deposit'
import Form from './Form'


const Account = ({location}) => {

  //Use URL API to create new URLSearchParams instance  from location.search 
  const searchQuery = new URLSearchParams(location.search)

  //Get customer data from local storage using searchQuery get function on parameter "id". Then put it into State
  const [customerData, setCustomerData] = useState(JSON.parse(localStorage.getItem(`user-${searchQuery.get("id")}`)) || null );

  //Initialize state for form input values
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [receivingAccount, setReceivingAccount] = useState('');


  //Initialize states for transaction modals
  const [modalStat, setModalStat] = useState({
    show: false, 
    status: 'confirmation',
    deposit: false,
    withdrawal: false,
    transfer: false
  });
  
  function handleOnChange(e, state) {
    switch (state) {
      case 'deposit' :
        setDepositAmount(Number(e.target.value) || '');
        break;
      case 'withdraw' :
        setWithdrawAmount(Number(e.target.value));
        break;
      case 'transfer-amount' :
        setTransferAmount(Number(e.target.value));
        break;
      case 'transfer-account' :
        setReceivingAccount(Number(e.target.value));
        break;
      default:
        break;
    }
  }

  function handleModalOpen(newstate) {
    setModalStat(newstate)
  }

  function handleModalClose() {
    setModalStat((prevState) => ({
      ...prevState,
      show: false
      }))
  }
  
  function handleDeposit() {
    if (depositAmount && depositAmount > 0) {
      setCustomerData((prevState) => ({
        ...prevState,
        balance: Number(prevState.balance) + depositAmount
      }));
      setModalStat((prevState) => ({
        ...prevState,
        status: 'paid'
      }));
      setDepositAmount('');
    } else if (depositAmount < 0) {
      alert("You can't input a negative value.")
    }
  };

  function handleWithdraw() {
    withdrawAmount = Number(document.getElementById('withdraw-input').value);
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
    receivingAccount = document.getElementById('recipient-input').value;
    transferAmount = Number(document.getElementById('transfer-input').value);
    const receivingCustomerData = JSON.parse(localStorage.getItem(`user-${receivingAccount}`));
    //Check if account exists
    if (receivingAccount !== customerData.accNum && receivingCustomerData !== null && transferAmount < customerData.balance) {
      receivingCustomerData.balance = receivingCustomerData.balance + transferAmount;
      localStorage.setItem(`user-${receivingAccount}`, JSON.stringify(receivingCustomerData));
      setCustomerData((prevState) => ({
        ...prevState,
        balance: Number(prevState.balance) - transferAmount
      }));
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
        <Form>
          <Deposit modalStat={modalStat} customerData={customerData} depositAmount={depositAmount} onChange={(e) => handleOnChange(e, 'deposit')} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} handleDeposit={handleDeposit}/>
          <div style={{border: '1px solid black', padding: '10px'}}> 
            <Textfield id="withdraw-input" placeholder="Enter your withdraw amount" type="number">Withdraw</Textfield>
            <Button onclick={handleWithdraw}>Withdraw Amount</Button>
          </div>
          <div style={{border: '1px solid black', padding: '10px'}}> 
            <Textfield id="recipient-input" placeholder="Enter receiving account number" type="number">Transfer</Textfield>
            <Textfield id="transfer-input" placeholder="Enter your transfer amount" type="number"/>
            <Button onclick={handleTransfer}>Transfer Amount</Button>
          </div>
        </Form>
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
