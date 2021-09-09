import React from 'react'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import Header from '../parts/Header'
import Textfield from '../components/Textfield'



const Register = ({status}) => {

  const history = useHistory()

// If currentAdmin is not amcanlubo or ajong, do not authorize to register other accounts
  if(status.isLoggedIn){
    if ((status.currentAdmin === 'amcanlubo') || (status.currentAdmin === 'ajong')){
    //???
  } else {     
    console.log('ACCESS DENIED');  
    alert('ACCESS DENIED'); 
    history.push('/accounts') 
  }
}

const [error, setError] = useState({
  usernameErr   : '',
  firstnameErr  : '',
  lastnameErr   : '',
  passwordErr   : ''
  // isFormValid   : false
})

const [userName, setuserName] = useState('')
const [firstName, setfirstName] = useState('')
const [lastName, setlastName] = useState('')
const [passWord, setpassWord] = useState('')

console.log(userName)
console.log(error.usernameErr)

let user_exist,
    form_valid

//Regular expression for pattern matching to check 
const validNameRegex = RegExp(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?0-9]+/);

//local storage data
let adminInfo = {};

// validate user input
const validateUser = (e) => {
  
  let username = e.target.value
  let saved_user = JSON.parse(localStorage.getItem(username))
  
  if (saved_user !== null) {
    form_valid =false
    user_exist = true
  } else {  
    user_exist = false
  }
 

return user_exist
} 

//Save validated account
const saveAccount = () => {

  if ((userName !== '') && (firstName !== '') && (lastName !== '') && (passWord !== '')) {
    
    
    if (form_valid===true) {

      adminInfo.firstname = firstName
      adminInfo.lastname = lastName
      adminInfo.password = passWord
      localStorage.setItem(userName, JSON.stringify(adminInfo)); 
      history.push('/accounts') 
      alert(`User ${userName} succesfully created!`)
    } else {   
          form_valid=false
          alert(`Invalid!`)
    }     
  } else {
      form_valid=false
      alert ('Please fill required fields!')
  }
} 

  //form validator checks/counts errors
  const validateForm = (error) => {
    let valid=true;
    Object.values(error).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    if(valid === true){
      console.log("Registering can be done");
   }else{
      console.log("You cannot be registered!!!")
   }
    return valid;
}
  
//onChange function
const handleChange = (e, state) => { 

    switch (state) {
      case 'userName':
        validateUser(e) 
        error.usernameErr = 
          e.target.value === ''
          ? setError({usernameErr   : 'Username must not be empty'})
          :
          e.target.value.length < 5
          ? setError({usernameErr   : 'Username must be at least 5 characters long'})
          :
          user_exist===true
          ? setError({usernameErr   : 'Username already exist'})
          : ''
          setuserName(e.target.value)
        break;
      case 'firstName' :
        error.firstnameErr = 
          e.target.value === ''
          ? setError({firstnameErr   : 'Firstname must not be empty'})
          :
          validNameRegex.test(e.target.value)
          ? setError({firstnameErr   : 'First name must not include numbers and special characters!'})
          :
          e.target.value.length < 2
          ? setError({firstnameErr   : 'Firstname must be at least 2 characters long'})
          : ''
          setfirstName(e.target.value)
        break;
      case 'lastName':
        error.lastnameErr =
        e.target.value === ''
        ? setError({lastnameErr   : 'Lastname must not be empty'})
        : 
        (e.target.value.length < 2)
        ? setError({lastnameErr   : 'Last name must be at least 2 characters long'})
        :
        (validNameRegex.test(e.target.value))
        ? setError({lastnameErr   : 'Must not include numbers and special characters!'})
        :''
        setlastName(e.target.value)
        break;
      case 'passWord' :
        error.passwordErr =
        e.target.value === ''
        ? setError({passwordErr   : 'Password must not be empty'})
        : 
        (e.target.value.length < 6)
        ? setError({passwordErr   : 'Password must be at least 6 characters long!'})
        :''
        setpassWord(e.target.value)
        break;
      default:
        break
    }
    
 
    // console.log(userName)
}

//on submit handle validation
const handleSubmit = (e) => {
  e.preventDefault();
  // validateUser()
      if (validateForm(error))  {
        // console.info('Valid Form')
        form_valid = true
        console.info('Form submitted')
        saveAccount()
      } 
     
      else{
        form_valid = false
        // console.error('Invalid Form')
        console.error('Form has errors')
      }
} 


  return (

  <> 
    <Header />
    <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>Register Admin</h2>
          
          <form onSubmit={handleSubmit}>

          <div className='fullName'>
            <Textfield id="admin-username" type="text" onChange={(e) => handleChange (e, 'userName')} value={userName}>User Name</Textfield>
            {/* <Error classnames={error.usernameErr === true ? 'errortext' : 'hide'}>{error.usernameErr}</Error> */}
            {error.usernameErr !== '' && <span className='error'>{error.usernameErr}</span>} 
            </div>

            <div className='fullName'>
            <Textfield id="admin-firstname" type="text"  onChange={(e) => handleChange (e, 'firstName')} value={firstName}>First Name</Textfield>
            {/* <Error classnames={error.firstnameErr === true ? 'errortext' : 'hide'}>{error.firstnameErr}</Error> */}
               {error.firstnameErr !== '' && <span className='error'>{error.firstnameErr}</span>} 
            </div>

            <div className='fullName'>
            <Textfield id="admin-lastname" type="text" value={lastName} onChange={(e) => handleChange (e, 'lastName')}>Last Name</Textfield>
            {/* <Error classnames={error.lastameErr === true ? 'errortext' : 'hide'}>{error.lastameErr}</Error> */}
              {error.lastnameErr !== '' && <span className='error'>{error.lastnameErr}</span>}
            </div>

            <div className='password'>
            <Textfield id="admin-password" type="password" value={passWord} onChange={(e) => handleChange (e, 'passWord')}>Password</Textfield>
            {/* <Error classnames={error.passwordErr === true ? 'errortext' : 'hide'}>{error.passwordErr}</Error> */}
              {error.passwordErr !== '' && <span className='error'>{error.passwordErr}</span>}
              {/* {error.passwordErr > 0 && <span className='error'>{error.passWord}</span>} */}
            </div>
   
            <div className='info'>
              <small>Password must be six characters in length.</small>
            </div>
            <div className='submit'>
              <button>Register</button>
            </div>
          </form>
        </div>
      </div>
  </>
  )




}

export default Register