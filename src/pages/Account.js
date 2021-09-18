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
import {AlertVector} from '../components/AlertVector'
import Header from '../parts/Header'
import {ArrowRightIcon} from '@heroicons/react/outline'
import PageContent from '../parts/PageContent'
import CreditCard from '../parts/CreditCard'
import TransactionBlock from '../parts/TransactionBlock'
import AccountGreeting from '../parts/AccountGreeting'


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

  //Initialize state for initial transaction modal (input forms)
  const [transactModal, setTransactModal] = useState({
    depositModal: false,
    withdrawalModal: false,
    sendModal: false
  })

  //Initialize state for Modal overlay background
  const [modalOverlay, setModalOverlay] =useState(false);

  //Initialize states for general confirmation and success modals applicable to all transactions
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

  //Initialize input error states for transaction block input fields
  const [inputErrs, setInputErrs] = useState({
    depositInputErr: false,
    withdrawInputErr: false,
    receiverInputErr: false,
    sendInputErr: false,
  });

  //Validators to hide errors on input change if input is not blank and positive
  useEffect(() => {
    if (depositAmount && depositAmount > 0) {
      setInputErrs((prevState) => ({
        ...prevState,
        depositInputErr: false,
      }))
    }
  },[depositAmount])

  useEffect(() => {
    if (withdrawAmount && withdrawAmount > 0) {
      setInputErrs((prevState) => ({
        ...prevState,
        withdrawInputErr: false,
      }))
    }
  },[withdrawAmount])

  useEffect(() => {
    if (sendAmount && sendAmount > 0) {
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
  

  //If user not isLoggedIn based on state passed as prop, redirect to accounts component. Authentication condition
  if (!status.isLoggedIn) {
    return <Redirect to="/login"/>
  } 
  
  //Main transactional functions
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
      handleError("You can't withdraw more than your current balance.");
      setModalOverlay(false);
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
      updateTransactions(latest_transaction, receivingTransData.latest_transaction);  
      return;
    } else if (receivingAccount !== customerData.accNum && receivingCustomerData === null) {
      handleError("Recipient account number does not exist.")
    } else if (receivingAccount !== customerData.accNum && sendAmount > customerData.balance){
      handleError("You can't send more than your current balance.")
    } else {
      handleError("Can't send to own account.");
    };
    hideModal();
    setModalOverlay(false);
  }

  //Helper functions for updating customer data
  function updateBalance(new_balance, new_transactions) {
    setCustomerData((prevState) => ({
      ...prevState,
      balance: new_balance,
      transactions: new_transactions
    }));
  }

  function updateTransactions(sender_transaction, receiver_transaction) {
    if (receiver_transaction !== undefined) {
      setTransactionList((prevState) => ([...prevState, sender_transaction, receiver_transaction]));
      setTotalTransactions((prevTotal) => (Number(prevTotal) + 1));
    } else {
      setTransactionList((prevState) => ([...prevState, sender_transaction]));
      setTotalTransactions((prevTotal) => (Number(prevTotal) + 1));
    }
  }

  //Auxiliary functions
  function handleOnChange(e, state) {
    switch (state) {
      case 'deposit' :
        //Adding a default state of '' is necessary because without it, the input states will always have a default first digit of 0  due to the Number() casting
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

  //onClick handler of transaction blocks (cash in, cash out, send money.
  //This will open top-level modal and update secondary-level modal state so that it knows what content to render )
  function handleTransactModalClick(trigger){
    if (trigger === 'deposit') {
      setTransactModal({
        depositModal: true,
        withdrawalModal: false,
        sendModal: false
      })
      setModalStat({
        show: false, 
        status: 'confirmation',
        deposit: true,
        withdrawal: false,
        send: false
    })
    } else if(trigger === 'withdrawal') {
      setTransactModal({
        depositModal: false,
        withdrawalModal: true,
        sendModal: false
      })
      setModalStat({
        show: false, 
        status: 'confirmation',
        deposit: false,
        withdrawal: true,
        send: false
    })
    } else {
      setTransactModal({
        depositModal: false,
        withdrawalModal: false,
        sendModal: true
      })
      setModalStat({
        show: false, 
        status: 'confirmation',
        deposit: false,
        withdrawal: false,
        send: true
    })
    }
    setModalOverlay(true);
  }

  //Function to handle close action or cancel button click of the top-most level Transaction Modal
  function handletransactModalClose(){
    setModalStat((prevState) => ({
      ...prevState,
      show: false
      }));
    setTransactModal({
      depositModal: false,
      withdrawalModal: false,
      sendModal: false
    })
    setModalOverlay(false);
  } 

  function hideModal() {
    setModalStat((prevState) => ({
      ...prevState,
      show: false
      }))
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
    setTransactModal({
      depositModal: false,
      withdrawalModal: false,
      sendModal: false
    })
  }

  function handleNewTransaction() {
    setModalStat((prevState) => ({
      ...prevState,
      show: false
      }));
    setModalOverlay(false);
  }

  function handleTransBack(trigger) {
    setModalStat((prevState) => ({
      ...prevState,
      show: false
      }));
      handleTransactModalClick(trigger)
  }

  
  function updateModalToPaid() {
    setModalStat((prevState) => ({
      ...prevState,
      status: 'paid'
    }));
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
        <div className="my-auto px-8"> 
        {(customerData !== null) 
        ? (
          <div className="py-6">
            <AccountGreeting customerData={customerData}/>
            <div className="flex gap-8">  
              <CreditCard customerData={customerData}/>
              <div className='flex flex-grow gap-4'>
                <TransactionBlock img_src='piggy' caption="Cash In" onClick={() => handleTransactModalClick('deposit')}/>
                <TransactionBlock img_src='money out' caption="Cash Out" onClick={() => handleTransactModalClick('withdrawal')}/>
                <TransactionBlock caption="Send Money" onClick={() => handleTransactModalClick('send')}/>
              </div>
            </div>
            <div>
              <Deposit 
                className={transactModal.depositModal ? 'show' : 'hide hidden'} 
                modalStat={modalStat} 
                customerData={customerData} 
                depositAmount={depositAmount} 
                onChange={(e) => handleOnChange(e, 'deposit')} 
                handleModalOpen={handleModalOpen} 
                handleNewTransaction={handleNewTransaction} 
                handleDeposit={handleDeposit}
                handleCancel={handletransactModalClose}
                handleTransBack={handleTransBack}
                modalOverlay={modalOverlay && modalStat.deposit ? 'show' : 'hide hidden'} 
                error={inputErrs.depositInputErr}/> 
              <Withdraw 
                className={transactModal.withdrawalModal ? 'show' : 'hide hidden'} 
                modalStat={modalStat} 
                customerData={customerData} 
                withdrawAmount={withdrawAmount} 
                onChange={(e) => handleOnChange(e, 'withdraw')} 
                handleModalOpen={handleModalOpen} 
                handleNewTransaction={handleNewTransaction} 
                handleWithdraw={handleWithdraw}
                handleCancel={handletransactModalClose}
                handleTransBack={handleTransBack}
                modalOverlay={modalOverlay && modalStat.withdrawal ? 'show' : 'hide hidden'}  
                error={inputErrs.withdrawInputErr}/> 
                <Send 
                className={transactModal.sendModal ? 'show' : 'hide hidden'}
                modalStat={modalStat} 
                customerData={customerData} 
                receivingAccount={receivingAccount} 
                sendAmount={sendAmount} 
                onChangeAmount={(e) => handleOnChange(e, 'send-amount')} 
                onChangeAccount={(e) => handleOnChange(e, 'receiving-account')} 
                handleModalOpen={handleModalOpen} 
                handleNewTransaction={handleNewTransaction} 
                handleSend={handleSend}
                handleCancel={handletransactModalClose}
                handleTransBack={handleTransBack}
                modalOverlay={modalOverlay && modalStat.send ? 'show' : 'hide hidden'}   
                accErr={inputErrs.receiverInputErr} 
                amtErr={inputErrs.sendInputErr}/>
            </div>
            <Transactions customerData={customerData}/>
            {showToastErr === true && <Toast type="error" onClick={closeToast}>{toastErrMsg}</Toast>}
          </div>
          )
        : (
          <div className="flex flex-col justify-center items-center p-8">
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
