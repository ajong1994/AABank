import React from 'react'
import {Redirect, useHistory } from 'react-router-dom'
import { useState } from 'react'
// import Textfield from './Textfield'
// import Form from './Form'
// import Button from './Button'
// import Error from './Error'
import Header from './Header'


const Register = ({status}) => {

  const history = useHistory()

// If currentAdmin is not amcanlubo or ajong, do not authorize to register other accounts
  if(status.isLoggedIn){
    if ((status.currentAdmin === 'amcanlubo') || (status.currentAdmin === 'ajong')){
    //???
  } else {     
    console.log('ACCESS DENIED');  
    alert('ACCESS DENIED'); 
    // <Redirect to="/accounts"/>
    history.push('/accounts') 
  }
}
  //Regular expression tester for pattern-matching and "search-and-replace" functions on text
  const validNameRegex = RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]+/);
  
  //form validator
  const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

  //Initial state
  const [check, setCheck] = useState({
    username: null,
    firstname: null,
    lastname: null,
    password: null,
    errors:  {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: ''
  }
})

  const [usernameErr, SetusernameErr] = useState({})
  const [firstnameErr, SetfirstnameErr] = useState({})
  const [lastnameErr, SetlastnameErr] = useState({})
  const [passwordErr, SetpasswordErr] = useState({})
  
  
  var adminInfo = {};
  let user_exist;
  

  function validate() {
    
    let username_input = document.getElementById('admin-username').value,
        storageUsers = JSON.parse(localStorage.getItem(adminInfo));
        
        if (storageUsers !== null) {
            //loop through each admin user accounts and cross-check
            for (let adminInfo of storageUsers) {
               
                if (username_input === adminInfo) {
                  user_exist = true
                } else {
                  user_exist = false    
                }
            }
            return user_exist
        }
  }

  function saveAccount() {
    
    let username_input = document.getElementById('admin-username').value,
        firstname_input = document.getElementById('admin-firstname').value,
        lastname_input = document.getElementById('admin-lastname').value,
        password_input = document.getElementById('admin-password').value;
        
        validate()
    
        if (user_exist === true) {
          alert(`User ${username_input} already exist!`)
        }   
        //if username doesn't exist, all fields are complete and password is at least 6 characters, proceed to registration
        else if ((localStorage.getItem(username_input) === null) && (firstname_input !== '') && (lastname_input !== '') && (password_input.length >= 6)) {
          adminInfo.firstname = document.getElementById('admin-firstname').value;
          adminInfo.lastname = document.getElementById('admin-lastname').value;
          adminInfo.password = document.getElementById('admin-password').value;
          localStorage.setItem(username_input, JSON.stringify(adminInfo)); 
          history.push('/accounts') 
          alert(`User ${username_input} succesfully created!`)
        } else {   
          alert(`Fill all required fields!`)
        }
              
  }     

  const handleChange = (event) => { 
    
    event.preventDefault();
    const { name, value } = event.target;
    // validate()
    let errors = check.errors;
    
    
    switch (name) {
      case 'username': 
      errors.username = 
          value.length < 2
            ? usernameErr.usernameShort = 'Username is too short'
          //   :
          // (user_exist===true)
          //   ? usernameErr.userNameShort = 'Username already exist!'
            : '';
        break;
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
      
      case 'password': 
      errors.password = 
          value.length < 6
            ? passwordErr.passwordShort = 'Password must be 6 characters long'
            : '';
        break;
      default:
        break;
    }
    setCheck({errors, [name]: value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm(check.errors)) {
      console.info('Valid Form')
    } else{
      console.error('Invalid Form')
    }
  } 

  const {errors} = check;
  
  return (

  <> 
    <Header />
    <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>Register Admin</h2>
          <form onSubmit={handleSubmit} noValidate>

            <div className='fullName'>
              <label htmlFor="username">User Name</label>
              <input required type='text' id='admin-username' name='username' onChange={handleChange} noValidate />
              {errors.username.length > 0 && <span className='error'>{errors.username}</span>}          
            </div>

            <div className='fullName'>
              <label htmlFor="firstname">First Name</label>
              <input required type='text' id='admin-firstname' name='firstname' onChange={handleChange} noValidate />
              {errors.firstname.length > 0 && <span className='error'>{errors.firstname}</span>}
            </div>

            <div className='fullName'>
              <label htmlFor="lastname">Last Name</label>
              <input required type='text' id='admin-lastname' name='lastname' onChange={handleChange} noValidate />
              {errors.lastname.length > 0 && <span className='error'>{errors.lastname}</span>}
            </div>

            <div className='password'>
              <label htmlFor="password">Password</label>
              <input required type='password' id='admin-password'name='password' onChange={handleChange} noValidate />
              {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
            </div>

            <div className='info'>
              <small>Password must be six characters in length.</small>
            </div>
            <div className='submit'>
              <button onClick={saveAccount}>Create</button>
            </div>
          </form>
        </div>
      </div>
  </>
  )
}

export default Register