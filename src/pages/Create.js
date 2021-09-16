import React, {useState, useEffect}  from 'react'
import { useHistory } from 'react-router-dom'
import { Redirect } from "react-router";
import Header from '../parts/Header'
import Textfield from '../components/Textfield'
import Error from '../components/Error'
import {format_idNumber} from '../utils/UserIdUtil'
import {getISOdate} from '../utils/ISODateUtil'
import Toast from '../parts/Toast'
import PageContent from '../parts/PageContent';
import {AddUserVector} from '../components/AddUserVector'


const Create = ({status, updater}) => {
  
    const history = useHistory()

    //Initialize state for form input values
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [balance, setBalance] = useState('')
    //Initialize state of errors
    const [error, setError] = useState({
        firstnameErr  : '',
        lastnameErr   : '',
        emailErr      : '',
        balanceErr    : ''
    })

  //Initialize error/success message text
  const [toastMsg, setToastMsg] = useState('');

  //Initialize error/success message visibility
  const [showToastMsg, setShowToastMsg] = useState('');

  //Initialize toast type 
  const [toastType, setToastType] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => closeToast(), 5000)
    return () => clearTimeout(timer);
  },[showToastMsg])

    
  //If user not isLoggedIn based on state passed as prop, redirect to accounts component
  if (!status.isLoggedIn) {
    return <Redirect to="/login"/>
  }       

    let user_exist = false;
    let email_exist = false;
    let populatedCustomerList = []
    let accInfo = {}  


    //handles the changes and errors committed for each user input values
    const handleChange = (e, state) => { 
      e.preventDefault()
      // validateUser()
        switch (state) {
          case 'firstname' :
            error.firstnameErr = 
              e.target.value === ''
              ? setError((prevState) => ({
                ...prevState,
                firstnameErr   : 'Firstname must not be empty'}))
              :
              validNameRegex.test(e.target.value)
              ? setError((prevState) => ({
                ...prevState,
                firstnameErr   : 'First name must not include numbers and special characters!'}))
              :
              e.target.value.length < 2
              ? setError((prevState) => ({
                ...prevState,
                firstnameErr   : 'Firstname must be at least 2 characters long'}))
              : ''
              setFirstname(e.target.value)
            break;

          case 'lastname':     
            error.lastnameErr =
            e.target.value === ''
            ? setError((prevState) => ({
              ...prevState,
              lastnameErr   : 'Lastname must not be empty'}))
            : 
            (e.target.value.length < 2)
            ? setError((prevState) => ({
              ...prevState,
              lastnameErr   : 'Last name must be at least 2 characters long'}))
            :
            (validNameRegex.test(e.target.value))
            ? setError((prevState) => ({
              ...prevState,
              lastnameErr   : 'Must not include numbers and special characters!'}))
            :''
            setLastname(e.target.value)
            break;

          case 'email' :
            validateEmail(e)
            error.emailErr = 
            e.target.value === ''
            ? setError((prevState) => ({
              ...prevState,
              emailErr   : 'Email must not be empty'}))
            : 
            email_exist === true
            ? setError((prevState) => ({
              ...prevState,
              emailErr   : 'Email already exist'}))
            :        
            validEmailRegex.test(e.target.value)
            ? ''
            : setError((prevState) => ({
              ...prevState,
              emailErr   : 'Email invalid!'}))
            
            setEmail(e.target.value)
            break;

          case 'balance' :
            error.balanceErr = 
            e.target.value < 0
            ? setError((prevState) => ({
              ...prevState,
              balanceErr   : 'Balance must not be a negative number!'}))
            : 
            e.target.value.length === ''
            ? setBalance((prevState) => ({
              ...prevState,
              balance  : 0}))
            : ''
            setBalance(e.target.value)
            break;
          default:
            break
        }
  }
 
    // Get list of total customers from localStorage and cross-check for same firstname and lastname
    const validateUser = () => {
     
      const customerList = JSON.parse(localStorage.getItem('customerList'));

      if (customerList !== null) {
          
          for (let customer of customerList) {
              populatedCustomerList.push(JSON.parse(localStorage.getItem(customer)))      
          }
          console.log(populatedCustomerList)
          for (let accounts of populatedCustomerList) { 
            console.log('State input: ' + (firstname.toLowerCase() + lastname.toLowerCase()))
            console.log('Account compared to: ' + (accounts.firstname + accounts.lastname))
              if ((firstname.toLowerCase().trim() + lastname.toLowerCase().trim()) === ((accounts.firstname) + (accounts.lastname))){
                  user_exist = true;
                  return user_exist;
              }
          }                      
      } return user_exist;
    }

    //Regular expression for pattern matching
    const validNameRegex = RegExp(/[~`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?0-9]+/);
    const validEmailRegex = RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    // Get list of total customers from localStorage and cross-check fro same email
    const validateEmail = (e) => {
        
        let email = e.target.value
         
        const customerList = JSON.parse(localStorage.getItem('customerList'));
        if (customerList !== null) {
            
            for (let customer of customerList) {
                populatedCustomerList.push(JSON.parse(localStorage.getItem(customer)))      
            }
                for (let accounts of populatedCustomerList) {
                    
                    if (email.toLowerCase().trim() === accounts.email) {
                        email_exist = true
                        return email_exist;
                    } 
                }
        } return email_exist;
    }

    //form validator that checks/counts errors
    const validateForm = (error) => {
      let valid=true;
      Object.values(error).forEach(
      (val) => val.length > 0 && (valid = false)
      );
      if (valid === true){
      console.log("Registering can be done");
      }   else{
      console.log("You cannot be registered!!!")
      }
      return valid;
    }
    
    const create_user = () => {
     
      let transaction_details = {},
      transactionList=[]

       validateUser()     
        let totalCustomers;
        let accNum;

        if (user_exist === true) {
          // alert('User already exists!')
          handleError('User already exists!');
        }
        else {
      
          if ((firstname !== '') && (lastname !== '') && (email !== '')) {  
             
        //Set UID and numbers of totalCustomers
        if (localStorage.getItem('totalCustomers') === null) {
            localStorage.setItem('totalCustomers', 1)    
            totalCustomers = Number(localStorage.getItem('totalCustomers'))
            accNum = totalCustomers
        } else {
            totalCustomers = Number(localStorage.getItem('totalCustomers'))
            accNum = totalCustomers + 1
            localStorage.setItem('totalCustomers', accNum)           
        }
        
        
        var totalTransactions;

        //Set total transactions of each user
        if (localStorage.getItem('totalTransactions') === null) {
          localStorage.setItem('totalTransactions', 1)    
          totalTransactions = Number(localStorage.getItem('totalTransactions'))
          
        } else {
            totalTransactions = Number(localStorage.getItem('totalTransactions'))
            totalTransactions =  totalTransactions + 1
            localStorage.setItem('totalTransactions', totalTransactions)           
        }

                totalCustomers = Number(localStorage.getItem('totalCustomers'))
                accNum = totalCustomers
                accNum = format_idNumber(accNum)
                accInfo.accNum = accNum
                accInfo.firstname = firstname.toLowerCase();
                accInfo.lastname = lastname.toLowerCase();
                accInfo.email = email.toLowerCase();
                accInfo.balance = Number(balance);
                accInfo.transactions = [{
                  date: getISOdate(),
                  amount: Number(balance),
                  transaction: 'deposit', 
                  transactionId: format_idNumber(totalTransactions)
                }]

                localStorage.setItem(`user-${accNum}`, JSON.stringify(accInfo)); 
                
                transaction_details = {
                  date: getISOdate(),
                  amount: Number(balance),
                  transaction: 'deposit', 
                  transactionId: format_idNumber(totalTransactions),
                  user: accNum
              }


                if (localStorage.getItem('transactionList') === null) {
                  transactionList.push(transaction_details) 
                  localStorage.setItem(`transactionList`, JSON.stringify(transactionList)); 
                }
                else{
                transactionList = JSON.parse(localStorage.getItem('transactionList'))
                transactionList.push(transaction_details) 
                localStorage.setItem(`transactionList`, JSON.stringify(transactionList)); 
                }
                // alert(`User ${firstname} succesfully created!`)
                handleSuccess(`User ${firstname} succesfully created!`);

              //if account is successfully created move to accounts page
              setTimeout(() => history.push('/accounts'),3000) 

                //Set for mapping of customerlist
                if (localStorage.getItem('customerList') === null) {
                  localStorage.setItem('customerList', JSON.stringify([`user-${accNum}`]))
              } else  {
                  const customerList = JSON.parse(localStorage.getItem('customerList'))
                  customerList.push(`user-${accNum}`)
                  localStorage.setItem('customerList', JSON.stringify(customerList))
              }

          } else {   
            // alert ('Please fill required fields!')  
            handleError('Please fill required fields!'); 
          }    
        }
    }            
   
    let form_valid;
    const handleSubmit = (e) => {
      
        e.preventDefault();
            if (validateForm(error))  {
              form_valid = true
              console.info('Form submitted')
              create_user()
            } 
           
            else{
              form_valid = false
              console.error('Form has errors')
              // alert('Please check errors!')
              handleError('Please check errors!')
            }
    }
    
    function handleSuccess(success) {
      setShowToastMsg(true);
      setToastMsg(success);
      setToastType('success')
      setFirstname('');
      setLastname('');
      setEmail('');
      setBalance(0);
    }
    
    function handleError(err) {
      setShowToastMsg(true);
      setToastMsg(err);
      setToastType('error')
    }
    
    function closeToast() {
      setShowToastMsg(false)
    }
    

    return (
      <div className="flex h-full">
        <Header status={status} updater={updater} />
        <PageContent>
        <form onSubmit={handleSubmit} className="bg-white px-4 py-8 rounded-sm shadow-md mt-6 m-auto max-w-md flex-grow">
        <div className="flex justify-between">
          <h2 className="text-2xl text-primary font-bold w-40 mt-3">Create User</h2>
          <AddUserVector width="30%" height="auto" className="absolute flex justify-end top-11 w-1/3"/>
        </div>
          
          <div className="mt-2 grid grid-cols-1 gap-2 m-auto">
  
            <div className='fullName'>
              <Textfield id="user-firstname" type="text" onChange={(e) => handleChange (e, 'firstname')} value={firstname}>First Name</Textfield>
              {error.firstnameErr !== '' && <Error>{error.firstnameErr}</Error>} 
            </div>

            <div className='fullName'>
              <Textfield id="user-lastname" type="text" onChange={(e) => handleChange (e, 'lastname')} value={lastname}>Last Name</Textfield>
              {error.lastnameErr !== '' && <Error>{error.lastnameErr}</Error>} 
            </div>

            <div className='email'>
              <Textfield id="user-email" type="email" onChange={(e) => handleChange (e, 'email')} value={email}>Email</Textfield>  
              {error.emailErr !== '' && <Error>{error.emailErr}</Error>} 
            </div>

            <div className='balance'> 
              <Textfield className="border border-gray-300 shadow p-3 w-full rounded mb-" id="user-balance" type="number" onChange={(e) => handleChange (e, 'balance')} value={balance}  placeholder='0'>Balance</Textfield>
              {error.balanceErr !== '' && <Error>{error.balanceErr}</Error>} 
            </div>
            <div className='submit mt-8'>
              <button className="bg-primary w-full py-2 px-1 rounded-md text-white font-Lato">Create</button>    
            </div>

          </div>
        </form>
        {showToastMsg === true && <Toast type={toastType} onClick={closeToast}>{toastMsg}</Toast>}
        </PageContent>
      </div>
    )
}

export default Create