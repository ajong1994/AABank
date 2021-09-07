import React, {useState}  from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../parts/Header'


const Create = ({status}) => {

    const validNameRegex = RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]+/);
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    
    const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

    const history = useHistory()

    const [check, setCheck] = useState({
        firstname: null,
        lastname: null,
        email: null,
        balance:0,
        
        errors:  {
            firstname: '',
            lastname: '',
            email: '',
            balance:''
      }
    })

    
    const [firstnameErr, SetfirstnameErr] = useState({})
    const [lastnameErr, SetlastnameErr] = useState({})
    const [emailErr, SetemailErr] = useState({})
    const [balanceErr, SetbalanceErr] = useState({})
    
    var accInfo = {};

    function create_user() {
        
        let firstname_input = document.getElementById('user-firstname').value;
        let lastname_input = document.getElementById('user-lastname').value;
        let email_input = document.getElementById('user-email').value;
        let user_balance = document.getElementById('user-balance').value;
        let accNum;
        let totalCustomers;
        var populatedCustomerList = []
        let email_exist 
        let user_exist

        firstname_input = firstname_input.toLowerCase()
        lastname_input = lastname_input.toLowerCase()
        email_input = email_input.toLowerCase()


        // Get list of total customers from localStorage 
        const customerList = JSON.parse(localStorage.getItem('customerList'));

        if (customerList !== null) {
            //loop through each cutomer accounts and cross-check
            for (let customer of customerList) {
                populatedCustomerList.push(JSON.parse(localStorage.getItem(customer)))
            }
                for (let accounts of populatedCustomerList) {
                    console.log(accounts)   

                    if ((firstname_input + lastname_input) === ((accounts.firstname) + (accounts.lastname))){
                        user_exist = true
                    } else {
                        user_exist = false
                    }

                    if (email_input === accounts.email){
                        email_exist = true
                    } else {
                        email_exist = false
                    }
                }
        } 
                if (user_balance  !== '') {
                  user_balance = user_balance
                } else {
                  user_balance = 0
                }

        //create UID and set numbers of totalCustomers
        if (localStorage.getItem('totalCustomers') === null) {
            localStorage.setItem('totalCustomers', 1)    
            totalCustomers = Number(localStorage.getItem('totalCustomers'))
            accNum = totalCustomers
        } else {
            totalCustomers = Number(localStorage.getItem('totalCustomers'))
            accNum = totalCustomers + 1
            localStorage.setItem('totalCustomers', accNum)           
        }
        

        if (user_exist === true) {
            alert('user already exist!')
        } else if(email_input===''){
            alert('email is empty!')
        } else if(email_exist===true){
            alert('email already exist!')
        } else if ((firstname_input !== '') && (lastname_input !== '') && (email_input !== '')) {
       
                totalCustomers = Number(localStorage.getItem('totalCustomers'))
                accNum = totalCustomers
                //format accNum to 5-digit number
                accNum = String(accNum).padStart(5, '0')
                accInfo.accNum = accNum
                accInfo.firstname = firstname_input;
                accInfo.lastname = lastname_input;
                accInfo.email = email_input;
                accInfo.balance = Number(user_balance);
                accInfo.transactions = [];
                localStorage.setItem(`user-${accNum}`, JSON.stringify(accInfo)); 
        

                if (localStorage.getItem('customerList') === null) {
                    localStorage.setItem('customerList', JSON.stringify([`user-${accNum}`]))
                } else  {
                    const customerList = JSON.parse(localStorage.getItem('customerList'))
                    customerList.push(`user-${accNum}`)
                    localStorage.setItem('customerList', JSON.stringify(customerList))
                }

                //if account is successfully created move to accounts page
                history.push('/accounts') 
                alert(`User ${firstname_input} succesfully created!`)
            
        } else {
          alert(`Fill all required fields!`)
        }

    }
  
    const handleChange = (event) => { 
        event.preventDefault();
        const { name, value } = event.target;
        let errors = check.errors;
        
    //error handling
        switch (name) {
          case 'firstname': 
          errors.firstname = 
              value.length < 2
                ? firstnameErr.firstNameShort = 'First name is too short'
                :
              validNameRegex.test(value)
                ? firstnameErr.firstNameShort = 'First name must not include numbers and special characters!'
                : '';
            break;
         
          case 'lastname': 
          errors.lastname = 
              value.length < 2
                ? lastnameErr.lastNameShort = 'Last name is too short'
                :
                validNameRegex.test(value)
                ? lastnameErr.lastNameShort = 'Last name must not include numbers and special characters!'
                : '';
            break;
        case 'email': 
            errors.email = 
                validEmailRegex.test(value)
                  ? ''
                  : 'Email is not valid!';
              break;
          case 'balance': 
          errors.balance = 
              value < 0
                ? balanceErr.balanceShort = 'Balance must not be a negative number'
                : 0;
            break;
          default:
            break;
        }
        setCheck({errors, [name]: value});
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if(validateForm(check.errors)) {
          console.info('Valid Form')
        }else{
          console.error('Invalid Form')
        }
    } 
    
    const {errors} = check;
      
    return (
        <> 
        <Header />
        <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>Create User</h2>
          <form onSubmit={handleSubmit} noValidate>

            <div className='fullName'>
              <label htmlFor="firstname">First Name</label>
              <input type='text' id='user-firstname' name='firstname' onChange={handleChange} noValidate />
              {errors.firstname.length > 0 && <span className='error'>{errors.firstname}</span>}
            </div>

            <div className='fullName'>
              <label htmlFor="lastname">Last Name</label>
              <input type='text' id='user-lastname' name='lastname' onChange={handleChange} noValidate />
              {errors.lastname.length > 0 && <span className='error'>{errors.lastname}</span>}
            </div>

            <div className='email'>
              <label htmlFor="email">Email</label>
              <input type='email' id='user-email' name='email' onChange={handleChange} noValidate />
              {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
            </div>

            <div className='balance'> 
              <label htmlFor="balance">Balance</label>
              <input type='number' id='user-balance'name='balance' onChange={handleChange} noValidate placeholder='0'/>
              {errors.balance.length > 0 && <span className='error'>{errors.balance}</span>}
            </div>
            <div className='submit'>
              <button onClick={create_user}>Create</button>
            </div>
          </form>
        </div>
      </div>   
    </>
    )
}

export default Create