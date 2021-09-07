import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Deposit from '../parts/Deposit'
import Withdraw from '../parts/Withdraw'
import Send from '../parts/Send'
import Form from '../components/Form'
import { deposit } from '../utils/DepositUtil'
import { withdraw } from '../utils/WithdrawUtil'
import { send } from '../utils/SendUtil'
import { record_transaction } from '../utils/RecordTransacUtil'


const Account = ({location}) => {

  //Use URL API to create new URLSearchParams instance  from location.search 
  const searchQuery = new URLSearchParams(location.search)

  //Get customer data from local storage using searchQuery get function on parameter "id". Then put it into State
  const [customerData, setCustomerData] = useState(JSON.parse(localStorage.getItem(`user-${searchQuery.get("id")}`)) || null );

  //Initialize state for form input values
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [receivingAccount, setReceivingAccount] = useState('');

  //Initialize state for transaction State
  const [totalTransactions, setTotalTransactions] = useState(localStorage.getItem('totalTransactions') || 0);
  const [transactionList, setTransactionList] = useState(JSON.parse(localStorage.getItem('transactionList')) || []);

  // Initialize state for send function customer state
  const [receivingCustomerData, setReceivingCD] = useState(JSON.parse(localStorage.getItem(`user-${receivingAccount}`)));



  //Initialize states for transaction modals
  const [modalStat, setModalStat] = useState({
    show: false, 
    status: 'confirmation',
    deposit: false,
    withdrawal: false,
    send: false
  });
  
  function handleOnChange(e, state) {
    switch (state) {
      case 'deposit' :
        setDepositAmount(Number(e.target.value) || '');
        break;
      case 'withdraw' :
        setWithdrawAmount(Number(e.target.value) || '');
        break;
      case 'send-amount' :
        setSendAmount(Number(e.target.value) || '');
        break;
      case 'receiving-account' :
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
      const {new_transactions, latest_transaction} = record_transaction(customerData, depositAmount, 'deposit', totalTransactions)
      setCustomerData((prevState) => ({
        ...prevState,
        balance: new_balance,
        transactions: new_transactions
      }));
      setModalStat((prevState) => ({
        ...prevState,
        status: 'paid'
      }));
      setDepositAmount('');
      setTransactionList((prevState) => ([...prevState, latest_transaction]));
      setTotalTransactions((prevTotal) => (Number(prevTotal) + 1));
    } else if (depositAmount < 0) {
      alert("You can't input a negative value.")
    }
  };

  function handleWithdraw() {
    //Error handling to ensure customer can't withdraw more than their account balance
    if (withdrawAmount && withdrawAmount > 0 && withdrawAmount <= customerData.balance) {
      const new_balance = withdraw(customerData.accNum, withdrawAmount);
      const {new_transactions, latest_transaction} = record_transaction(customerData, withdrawAmount, 'withdraw', totalTransactions)
      setCustomerData((prevState) => ({
        ...prevState,
        balance: new_balance,
        transactions: new_transactions
      }));
      setModalStat((prevState) => ({
        ...prevState,
        status: 'paid'
      }));
      setWithdrawAmount('');
      setTransactionList((prevState) => ([...prevState, latest_transaction]));
      setTotalTransactions((prevTotal) => (Number(prevTotal) + 1));
    } else if (withdrawAmount && withdrawAmount < 0 && withdrawAmount <= customerData.balance) {
      alert("You can't input a negative value.")
    } else {
      alert("You can't withdraw more than your current balance")
    }
  };

  function handleSend() {
    //Check if account exists
    setReceivingCD(JSON.parse(localStorage.getItem(`user-${receivingAccount}`)));
    if (receivingAccount !== customerData.accNum && receivingCustomerData !== null && sendAmount <= customerData.balance) {
      const {from_newBalance, to_newBalance} = send(customerData.accNum, receivingAccount, sendAmount);
      const {new_transactions, latest_transaction} = record_transaction(customerData, sendAmount, 'send', totalTransactions, receivingAccount);
      const receivingTransData = record_transaction(customerData, sendAmount, 'receive', totalTransactions, customerData.accNum);
      setReceivingCD((prevState) => ({
        ...prevState,
        balance: to_newBalance,
        transactions: receivingTransData.new_transactions
      }));
      setCustomerData((prevState) => ({
        ...prevState,
        balance: from_newBalance,
        transactions: new_transactions
      }));
      setModalStat((prevState) => ({
        ...prevState,
        status: 'paid'
      }));
      setSendAmount('');
      setTransactionList((prevState) => ([...prevState, latest_transaction]));
      setTotalTransactions((prevTotal) => (Number(prevTotal) + 1));
    } else if (receivingAccount !== customerData.accNum && receivingCustomerData === null) {
      alert("Recipient account number does not exist.")
    } else if (receivingAccount !== customerData.accNum && sendAmount > customerData.balance){
      alert("Transfer amount exceeds current balance.")
    } else {
      alert("Can't send to own account.")
    }

  };

  useEffect(() => {
    // Add handler on mount if id in query is invalid
    if (customerData) {
      localStorage.setItem(`user-${customerData.accNum}`, JSON.stringify(customerData));
    }
  }, [customerData])

  useEffect(() => {
    localStorage.setItem('totalTransactions', (totalTransactions))
  }, [totalTransactions])

  useEffect(() => {
    localStorage.setItem('transactionList', (JSON.stringify(transactionList)));
  }, [transactionList])

  useEffect(() => {
    if (receivingAccount !== '') {
      localStorage.setItem(`user-${receivingAccount}`, JSON.stringify(receivingCustomerData));
    }
  }, [receivingCustomerData])

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
          <Send modalStat={modalStat} customerData={customerData} receivingAccount={receivingAccount} sendAmount={sendAmount} onChangeAmount={(e) => handleOnChange(e, 'send-amount')} 
            onChangeAccount={(e) => handleOnChange(e, 'receiving-account')} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} handleSend={handleSend}/>
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
