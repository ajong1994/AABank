import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Deposit from '../parts/Deposit'
import Withdraw from '../parts/Withdraw'
import Transfer from '../parts/Transfer'
import Form from '../components/Form'
import {deposit} from '../utils/DepositUtil'
import {withdraw} from '../utils/WithdrawUtil'
import {send} from '../utils/SendUtil'


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
        setWithdrawAmount(Number(e.target.value) || '');
        break;
      case 'transfer-amount' :
        setTransferAmount(Number(e.target.value) || '');
        break;
      case 'transfer-account' :
        setReceivingAccount(e.target.value);
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
      const new_balance = deposit(customerData.accNum, depositAmount);
      setCustomerData((prevState) => ({
        ...prevState,
        balance: new_balance
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
    //Error handling to ensure customer can't withdraw more than their account balance
    if (withdrawAmount && withdrawAmount > 0 && withdrawAmount <= customerData.balance) {
      const new_balance = withdraw(customerData.accNum, withdrawAmount);
      setCustomerData((prevState) => ({
        ...prevState,
        balance: new_balance
      }));
      setModalStat((prevState) => ({
        ...prevState,
        status: 'paid'
      }));
      setWithdrawAmount('');
    } else if (withdrawAmount && withdrawAmount < 0 && withdrawAmount <= customerData.balance) {
      alert("You can't input a negative value.")
    } else {
      alert("You can't withdraw more than your current balance")
    }
  };

  function handleTransfer() {
    const receivingCustomerData = JSON.parse(localStorage.getItem(`user-${receivingAccount}`));
    const {from_newBalance, to_newBalance} = send(customerData.accNum, receivingAccount, transferAmount);
    //Check if account exists
    if (receivingAccount !== customerData.accNum && receivingCustomerData !== null && transferAmount <= customerData.balance) {
      receivingCustomerData.balance = to_newBalance
      localStorage.setItem(`user-${receivingAccount}`, JSON.stringify(receivingCustomerData));
      setCustomerData((prevState) => ({
        ...prevState,
        balance: from_newBalance
      }));
      setModalStat((prevState) => ({
        ...prevState,
        status: 'paid'
      }));
      setTransferAmount('');
    } else if (receivingAccount !== customerData.accNum && receivingCustomerData === null) {
      alert("Recipient account number does not exist.")
    } else if (receivingAccount !== customerData.accNum && transferAmount > customerData.balance){
      alert("Transfer amount exceeds current balance.")
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
          <Deposit key={modalStat} modalStat={modalStat} customerData={customerData} depositAmount={depositAmount} onChange={(e) => handleOnChange(e, 'deposit')} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} handleDeposit={handleDeposit}/>
          <Withdraw modalStat={modalStat} customerData={customerData} withdrawAmount={withdrawAmount} onChange={(e) => handleOnChange(e, 'withdraw')} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} handleWithdraw={handleWithdraw}/>
          <Transfer modalStat={modalStat} customerData={customerData} receivingAccount={receivingAccount} transferAmount={transferAmount} onChangeAmount={(e) => handleOnChange(e, 'transfer-amount')} 
            onChangeAccount={(e) => handleOnChange(e, 'transfer-account')} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} handleTransfer={handleTransfer}/>
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
