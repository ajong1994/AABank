import React, {useState}  from 'react'
import { useHistory } from 'react-router-dom'
import { Redirect } from "react-router";
import Header from '../parts/Header'
import Textfield from '../components/Textfield'
import {format_idNumber} from '../utils/UserIdUtil'

const Create = ({status}) => {

  
    const history = useHistory()

    const [error, setError] = useState({
        firstnameErr  : '',
        lastnameErr   : '',
        emailErr      : '',
        balanceErr    : ''
    })

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [balance, setBalance] = useState('')

    //email cannot be the same
    //firstname + lastname cannot be the same
    let user_exist,
        email_exist,
        form_valid
        
    
    //If user not isLoggedIn based on state passed as prop, redirect to accounts component
    if (!status.isLoggedIn) {
      return <Redirect to="/login"/>
    }       
        
    //Regular expression for pattern matching to check 
    const validNameRegex = RegExp(/[~`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?0-9]+/);
    const validEmailRegex = RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    // const validBalanceRegex = RegExp(/(^[0-9]+[-]*[0-9]+$)/);

    
    const validateUser = () => {
     
      // Get list of total customers from localStorage 
      const customerList = JSON.parse(localStorage.getItem('customerList'));

      if (customerList !== null) {
          //loop through each customer accounts and cross-check
          for (let customer of customerList) {
              populatedCustomerList.push(JSON.parse(localStorage.getItem(customer)))      
          }
          
              for (let accounts of populatedCustomerList) { 
                  if ((firstname.toLowerCase() + lastname.toLowerCase()) === ((accounts.firstname) + (accounts.lastname))){
                      user_exist = true
                      // console.log(user_exist)
                  } else {
                      user_exist = false
                  }
              }     
                         
      } return user_exist
    }


      const validateEmail = (e) => {
        let email = e.target.value
        // Get list of total customers from localStorage 
        const customerList = JSON.parse(localStorage.getItem('customerList'));
  
        if (customerList !== null) {
            //loop through each customer accounts and cross-check
            for (let customer of customerList) {
                populatedCustomerList.push(JSON.parse(localStorage.getItem(customer)))      
            }
            
                for (let accounts of populatedCustomerList) {
                    
                    if (email.toLowerCase() === accounts.email){
                        email_exist = true
                    } else {
                        email_exist = false
                    }           
                }
        }
    }

    let accInfo = {}  
    let populatedCustomerList = []
    

    const create_user = () => {

        validateUser()     
        let totalCustomers;
        let accNum;

        if (user_exist === true) {
          alert('user already exist!')
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
        
        let totalTransactions;
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
                accInfo.transactions = []; 
                localStorage.setItem(`user-${accNum}`, JSON.stringify(accInfo)); 
                //if account is successfully created move to accounts page
                history.push('/accounts') 
                alert(`User ${firstname} succesfully created!`)

                //Set for mapping of customerlist
                if (localStorage.getItem('customerList') === null) {
                  localStorage.setItem('customerList', JSON.stringify([`user-${accNum}`]))
              } else  {
                  const customerList = JSON.parse(localStorage.getItem('customerList'))
                  customerList.push(`user-${accNum}`)
                  localStorage.setItem('customerList', JSON.stringify(customerList))
              }


          } else {   
            alert ('Please fill required fields!')   
          }    
        }
    }            
  
    //form validator checks/counts errors
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
              alert('Please check errors!')
            }
    } 

    return (
        <> 
        <Header status={status} />
        <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>Create User</h2>
          <form onSubmit={handleSubmit} noValidate>

            <div className='fullName'>
            <Textfield id="user-firstname" type="text" onChange={(e) => handleChange (e, 'firstname')} value={firstname}>First Name</Textfield>
            {error.firstnameErr !== '' && <span className='error'>{error.firstnameErr}</span>} 
            </div>

            <div className='fullName'>
            <Textfield id="user-lastname" type="text" onChange={(e) => handleChange (e, 'lastname')} value={lastname}>Last Name</Textfield>
            {error.lastnameErr !== '' && <span className='error'>{error.lastnameErr}</span>} 
            </div>

            <div className='email'>
            <Textfield id="user-email" type="email" onChange={(e) => handleChange (e, 'email')} value={email}>Email</Textfield>  
            {error.emailErr !== '' && <span className='error'>{error.emailErr}</span>} 
            </div>

            <div className='balance'> 
            <Textfield id="user-balance" type="number" onChange={(e) => handleChange (e, 'balance')} value={balance}  placeholder='0'>First Name</Textfield>
            {error.balanceErr !== '' && <span className='error'>{error.balanceErr}</span>} 
            </div>

            <div className='submit'>
              <button>Create</button>
            </div>
        </form>
    </div>
    </div>   
    </>

    )
}

export default Create