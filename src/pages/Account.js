import { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Deposit from '../parts/Deposit'
import Withdraw from '../parts/Withdraw'
import Send from '../parts/Send'
import Transactions from '../parts/Transactions'
import { deposit } from '../utils/DepositUtil'
import { withdraw } from '../utils/WithdrawUtil'
import { send } from '../utils/SendUtil'
import { record_transaction } from '../utils/RecordTransacUtil'
import Toast from '../parts/Toast'
import { formatMoney } from '../utils/FormatMoneyUtil'
import {AlertVector} from '../components/AlertVector'
import Header from '../parts/Header'
import {ArrowRightIcon} from '@heroicons/react/outline'
import PageContent from '../parts/PageContent';



const Account = ({status, updater, location}) => {

  //Use URL API to create new URLSearchParams instance  from location.search 
  const searchQuery = new URLSearchParams(location.search)

  //Get customer data from local storage using searchQuery get function on parameter "id". Then put it into State
  const [customerData, setCustomerData] = useState(JSON.parse(localStorage.getItem(`user-${searchQuery.get("id")}`)) || null );

  useEffect(() => {
    // Add handler on mount if id in query is invalid
    if (customerData) {
      localStorage.setItem(`user-${customerData.accNum}`, JSON.stringify(customerData));
    }
  }, [customerData])

  //Initialize state for form input values
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [receivingAccount, setReceivingAccount] = useState('');

  //Initialize state for transaction State
  const [totalTransactions, setTotalTransactions] = useState(Number(localStorage.getItem('totalTransactions')) || 0);
  const [transactionList, setTransactionList] = useState(JSON.parse(localStorage.getItem('transactionList')) || []);

  useEffect(() => {
    localStorage.setItem('transactionList', JSON.stringify(transactionList));
  }, [transactionList])

  useEffect(() => {
    localStorage.setItem('totalTransactions', (totalTransactions))
  }, [totalTransactions])

  //Initialize states for transaction modals
  const [modalStat, setModalStat] = useState({
    show: false, 
    status: 'confirmation',
    deposit: false,
    withdrawal: false,
    send: false
  });

  //Initialize error message text
  const [toastErrMsg, setToastErrMsg] = useState('');

  //Initialize error message visibility
  const [showToastErr, setShowToastErr] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => closeToast(), 5000)
    return () => clearTimeout(timer);
  },[toastErrMsg])

  //Initialize input error states for transaction components
  const [inputErrs, setInputErrs] = useState({
    depositInputErr: false,
    withdrawInputErr: false,
    receiverInputErr: false,
    sendInputErr: false,
  });

  useEffect(() => {
    if (depositAmount) {
      setInputErrs((prevState) => ({
        ...prevState,
        depositInputErr: false,
      }))
    }
  },[depositAmount])

  useEffect(() => {
    if (withdrawAmount) {
      setInputErrs((prevState) => ({
        ...prevState,
        withdrawInputErr: false,
      }))
    }
  },[withdrawAmount])

  useEffect(() => {
    if (sendAmount) {
      setInputErrs((prevState) => ({
        ...prevState,
        sendInputErr: false,
      }))
    }
  },[sendAmount])

  useEffect(() => {
    if (receivingAccount) {
      setInputErrs((prevState) => ({
        ...prevState,
        receiverInputErr: false,
      }))
    }
  },[receivingAccount])
  

  //If user not isLoggedIn based on state passed as prop, redirect to accounts component
  if (!status.isLoggedIn) {
    return <Redirect to="/login"/>
  } 
  
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
  
  function handleDeposit() {
    if (depositAmount && depositAmount > 0) {
      const new_balance = deposit(customerData.accNum, depositAmount);
      const {new_transactions, latest_transaction} = record_transaction(customerData, depositAmount, 'deposit', totalTransactions)
      updateBalance(new_balance, new_transactions);
      updateModalToPaid();
      setDepositAmount('');
      updateTransactions(latest_transaction); 
    }
  };

  function handleWithdraw() {
    //Error handling to ensure customer can't withdraw more than their account balance
    if ((withdrawAmount && withdrawAmount > 0) && withdrawAmount <= customerData.balance) {
      const new_balance = withdraw(customerData.accNum, withdrawAmount);
      const {new_transactions, latest_transaction} = record_transaction(customerData, withdrawAmount, 'withdrawal', totalTransactions)
      updateBalance(new_balance, new_transactions);
      updateModalToPaid();
      setWithdrawAmount('');
      updateTransactions(latest_transaction);  
    } else {
      handleError("You can't withdraw more than your current balance");
      hideModal();
    }
  };

  function handleSend() {
    //Check if account exists
    const receivingCustomerData = JSON.parse(localStorage.getItem(`user-${receivingAccount}`));
    if (receivingAccount && (sendAmount && sendAmount > 0 ) && receivingAccount !== customerData.accNum && receivingCustomerData !== null && sendAmount <= customerData.balance) {
      const {from_newBalance, to_newBalance} = send(customerData.accNum, receivingAccount, sendAmount);
      const {new_transactions, latest_transaction} = record_transaction(customerData, sendAmount, 'sent', totalTransactions, receivingAccount);
      //Update receiving customer's data on the back-end/localStorage. Dev Notes: Removed State implementation for this because it doesn't affect any rendering elements anyway and to reduce re-rendering.
      const receivingTransData = record_transaction(receivingCustomerData, sendAmount, 'received', totalTransactions, customerData.accNum);
      receivingCustomerData.balance = to_newBalance;
      receivingCustomerData.transactions = receivingTransData.new_transactions;
      localStorage.setItem(`user-${receivingAccount}`, JSON.stringify(receivingCustomerData));
      //End of receiving customer data update and start of localstate updating
      updateBalance(from_newBalance, new_transactions);
      updateModalToPaid();
      setSendAmount('');
      updateTransactions(latest_transaction);  
      return;
    } else if (receivingAccount !== customerData.accNum && receivingCustomerData === null) {
      handleError("Recipient account number does not exist.")
    } else if (receivingAccount !== customerData.accNum && sendAmount > customerData.balance){
      handleError("Transfer amount exceeds current balance.")
    } else {
      handleError("Can't send to own account.");
    };
    hideModal();
}

  //Auxiliary functions
  function hideModal() {
    setModalStat((prevState) => ({
      ...prevState,
      show: false
      }))
  }

  function updateBalance(new_balance, new_transactions) {
    setCustomerData((prevState) => ({
      ...prevState,
      balance: new_balance,
      transactions: new_transactions
    }));
  }

  function updateModalToPaid() {
    setModalStat((prevState) => ({
      ...prevState,
      status: 'paid'
    }));
  }

  function handleModalOpen(newstate) {
    //Validate fields before showing modal
    if ((newstate.deposit && !depositAmount) || (newstate.deposit && depositAmount < 0)) {
      setInputErrs((prevState) => ({
        ...prevState,
        depositInputErr: true,
      }))
      return
    } else if((newstate.withdrawal && !withdrawAmount) || (newstate.withdrawal && withdrawAmount < 0)) {
      setInputErrs((prevState) => ({
        ...prevState,
        withdrawInputErr: true,
      }))
      return
    } else if(newstate.send && !receivingAccount) {
      setInputErrs((prevState) => ({
        ...prevState,
        receiverInputErr: true,
      }));
      if((newstate.send && !sendAmount) || (newstate.send && sendAmount < 0)) {
        setInputErrs((prevState) => ({
          ...prevState,
          sendInputErr: true,
        }))
      }
      return
    } else if((newstate.send && !sendAmount) || (newstate.send && sendAmount < 0)) {
      setInputErrs((prevState) => ({
        ...prevState,
        sendInputErr: true,
      }))
      return
    }
    setModalStat(newstate);
    setShowToastErr(false);
    setToastErrMsg('');
  }

  function handleModalClose() {
    setModalStat((prevState) => ({
      ...prevState,
      show: false
      }))
  }

  function updateTransactions(latest_transaction) {
    setTransactionList((prevState) => ([...prevState, latest_transaction]));
    setTotalTransactions((prevTotal) => (Number(prevTotal) + 1));
  }

  function handleError(err) {
    setShowToastErr(true)
    setToastErrMsg(err);
  }

  function closeToast(){
    setShowToastErr(false)
  }

  return (
    <div className="flex h-full">
      <Header status={status} updater={updater}/>
      <PageContent>
        <div className="my-auto px-8 flex-shrink"> 
        {(customerData !== null) 
        ? (
          <div className="py-8">
            <div className='grid grid-cols-2 grid-rows-3'>
              <h2 className='text-xl font-bold'>Account Number: {customerData.accNum}</h2>
              <p className='capitalize col-start-1'>Full Name: {customerData.firstname} {customerData.lastname}</p>
              <p className='col-start-1 text-gray-500'>Email: {customerData.email}</p>
              <h2 className='row-start-2 row-end-4 col-start-2 text-2xl font-bold text-right'>Balance: {formatMoney(customerData.balance)}</h2>
            </div>
            <div className="flex gap-4 py-8">
              <Deposit modalStat={modalStat} customerData={customerData} depositAmount={depositAmount} onChange={(e) => handleOnChange(e, 'deposit')} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} handleDeposit={handleDeposit} error={inputErrs.depositInputErr}/>
              <Withdraw modalStat={modalStat} customerData={customerData} withdrawAmount={withdrawAmount} onChange={(e) => handleOnChange(e, 'withdraw')} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} handleWithdraw={handleWithdraw} error={inputErrs.withdrawInputErr}/>
              <Send modalStat={modalStat} customerData={customerData} receivingAccount={receivingAccount} sendAmount={sendAmount} onChangeAmount={(e) => handleOnChange(e, 'send-amount')} 
                onChangeAccount={(e) => handleOnChange(e, 'receiving-account')} handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} handleSend={handleSend} accErr={inputErrs.receiverInputErr} amtErr={inputErrs.sendInputErr}/>
            </div>
            <Transactions customerData={customerData}/>
            {showToastErr === true && <Toast type="error" onClick={closeToast}>{toastErrMsg}</Toast>}
          </div>
          )
        : (
          <div className="flex flex-col items-center">
            <AlertVector width="40%" height="auto"/>
            <p className="mx-auto text-center pt-4">Customer account number does not exist.</p>
            <Link to="/accounts" className="pt-8 text-primary block hover:underline">Return to accounts<ArrowRightIcon className="w-4 h-4 inline ml-2 -mt-1" /></Link>
          </div>
          )}
        </div>
      </PageContent>
    </div>

  )
}

export default Account
