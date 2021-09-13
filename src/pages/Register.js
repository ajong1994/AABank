import React from 'react'
import { useHistory } from 'react-router-dom'
import { Redirect } from "react-router";
import { useState, useEffect } from 'react'
import Header from '../parts/Header'
import Error from '../components/Error'
import Textfield from '../components/Textfield'
import Toast from '../parts/Toast'


const Register = ({status}) => {

  const history = useHistory()


  const [error, setError] = useState({
    usernameErr   : '',
    firstnameErr  : '',
    lastnameErr   : '',
    passwordErr   : ''
  })

  const [userName, setuserName] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [passWord, setpassWord] = useState('')

  // //Initialize error message text
  // const [toastErrMsg, setToastErrMsg] = useState('');
  // const [toastSuccessMsg, setToastSuccessMsg] = useState('');

  // //Initialize error message visibility
  // const [showToastErr, setShowToastErr] = useState('');

  // //Initialize success message visibility
  // const [showToastSuccess, setShowToastSuccess] = useState('');

  // useEffect(() => {
  //   const timer = setTimeout(() => closeToast, 5000)
  //   return () => clearTimeout(timer);
  // },[toastErrMsg, toastSuccessMsg])


// If currentAdmin is not amcanlubo or ajong, do not authorize to register other accounts
if(status.isLoggedIn){
  if ((status.currentAdmin === 'amcanlubo') || (status.currentAdmin === 'ajong')){
  
  } else {     
    console.log('ACCESS DENIED');  
    alert('ACCESS DENIED'); 
    history.push('/accounts') 
  }
} else {
return <Redirect to="/login"/>
}

console.log(userName)
console.log(error.usernameErr)

let user_exist,
    form_valid,
    adminInfo = {};

//Regular expression for pattern matching to check 
const validNameRegex = RegExp(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?0-9]+/);



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
      // handleSuccess(`User ${userName} succesfully created!`)
    } else {   
      form_valid=false
      alert(`Invalid!`)
    }     
  } else {
      form_valid=false
      // handleError('Please fill required fields!')
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
  e.preventDefault()
    switch (state) {
      case 'userName':
        validateUser(e) 
        error.usernameErr = 
          e.target.value === ''
          ? setError((prevState) => ({
            ...prevState,
            usernameErr:'Username must not be empty'}))
          :
          e.target.value.length < 5
          ? setError((prevState) => ({
            ...prevState,
            usernameErr: 'Username must be at least 5 characters long'}))
          :
          user_exist===true
          ? setError((prevState) => ({
            ...prevState,
            usernameErr: 'Username already exist' }))
          :
          e.target.value === 'amcanlubo'
          ? setError((prevState) => ({
            ...prevState,
            usernameErr: 'Username already exist' }))
          : 
          e.target.value === 'ajong1994'
          ? setError((prevState) => ({
            ...prevState,
            usernameErr: 'Username already exist' }))
          : ''
          setuserName(e.target.value)
  
        break;
      case 'firstName' :
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
          setfirstName(e.target.value)
        break;
      case 'lastName':
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
        setlastName(e.target.value)
        break;
      case 'passWord' :
        error.passwordErr =
        e.target.value === ''
        ? setError((prevState) => ({
          ...prevState,
          passwordErr   : 'Password must not be empty'}))
        : 
        (e.target.value.length < 6)
        ? setError((prevState) => ({
          ...prevState,
          passwordErr   : 'Password must be at least 6 characters long!'}))
        :''
        setpassWord(e.target.value)
        break;
      default:
        break
    }
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

// const handleSuccess =(success) => {
//   setShowToastSuccess(true)
//   setToastSuccessMsg(success);
// }

// const handleError =(err) => {
//   setShowToastErr(true)
//   setToastErrMsg(err);
// }

// const closeToast =() =>{
//   setShowToastErr(false)
//   showToastSuccess(false)
// }


  return (

  <> 
    

        <div className="flex justify-between container m-auto h-screen">

        
        <Header status={status} />
        

        <form onSubmit={handleSubmit} className="bg-white px-4 py-8 rounded-sm shadow-md mt-5 m-auto max-w-md flex-grow">
          
          <h2 className="text-2xl text-primary text-shadow font-bold">Register Admin</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 m-auto">
          <div className='fullName'>
          <Textfield id="admin-username" type="text" onChange={(e) => handleChange (e, 'userName')} value={userName}>User Name</Textfield>
          {error.usernameErr !== '' && <Error>{error.usernameErr}</Error>} 
          </div>

            <div className='fullName'>
            <Textfield id="admin-firstname" type="text"  onChange={(e) => handleChange (e, 'firstName')} value={firstName}>First Name</Textfield>
            {error.firstnameErr !== '' && <Error>{error.firstnameErr}</Error>} 
            </div>

            <div className='fullName'>
            <Textfield id="admin-lastname" type="text" value={lastName} onChange={(e) => handleChange (e, 'lastName')}>Last Name</Textfield>
            {error.lastnameErr !== '' && <Error>{error.lastnameErr}</Error>}
            </div>

            <div className='password'>
            <Textfield id="admin-password" type="password" value={passWord} onChange={(e) => handleChange (e, 'passWord')}>Password</Textfield>
            {error.passwordErr !== '' && <Error>{error.passwordErr}</Error>}

            </div>
  
            <div className='submit mt-8'>
              <button className="bg-primary w-full py-2 px-1 rounded-md text-white font-Lato">Register</button>
            </div>
            </div>
        </form>
          {/* {showToastErr === true && <Toast type="error" onClick={closeToast}>{toastSuccessMsg}</Toast>} */}
          {/* {showToastErr === true && <Toast type="success" onClick={closeToast}>{toastErrMsg}</Toast>} */}
        
      </div>
  </>
  )




}

export default Register