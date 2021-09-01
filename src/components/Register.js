import React from 'react'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'


const Register = () => {

  let history = useHistory()
  const [isError, setError] = useState({
    userNameError:false,
    passwordError:false
  });
  
  var adminInfo = {}; 
  var userNameError = "username already exist"
  var passwordError = "password is invalid" 
  
  const save = (event) => {
    
    // implement error checking for empty input (username at least 8 characters)  
   
    let username_input = document.getElementById('admin-username').value
    let password_input = document.getElementById('admin-password').value
            
        if (username_input !== '') {  
          if  ((localStorage.getItem(username_input) === null) && (password_input.length > 6) && (username_input !== '')) {
            adminInfo.firstname = document.getElementById('admin-firstname').value;
            adminInfo.lastname = document.getElementById('admin-lastname').value;
            adminInfo.password = document.getElementById('admin-password').value;
            localStorage.setItem(username_input, JSON.stringify(adminInfo)); //store in local storage      
            // console.log(localStorage.getItem(username_input))
            history.push('/Accounts') 
          } else if ((localStorage.getItem(username_input) === null) && (username_input !== '')) {
            setError({
              userNameError:false,
              passwordError:true
          })} else if ((localStorage.getItem(username_input) === null) && (password_input.length > 6) ) {
            setError({
              userNameError:true,
              passwordError:false
          })} else {
            setError({
              userNameError:true,
              passwordError:false
            })
          }
        } else {
          setError({
            userNameError:true,
            passwordError:false
          })}              
  }     
      
    const submitForm = (event) => {
        event.preventDefault();
    }

  return (

    <div className="register-main">

      <form onSubmit={submitForm} className='form2'>
        
        <label htmlFor = "name">Username:</label>
        <input 
        type='text' 
        name ='name' id='admin-username' className='form-control' placeholder='enter name' 
        />
        <div className = {isError.userNameError===true ? 'registerError' : 'hide'}>{userNameError}</div>
        
        <label htmlFor = "firstname">First Name:</label>
        <input 
        type='text' name='firstname' id='admin-firstname' className='form-control' placeholder='enter first name' 
        />
            
        <label htmlFor = "lastname">Last Name:</label>
        <input 
        type='text' name='lastname' id='admin-lastname' className='form-control' placeholder='enter lastname' 
        />
        
        <label htmlFor = "password">Password:</label>
        <input 
        type='text' name='password' id='admin-password' className='form-control' placeholder='enter password' 
        />
        <div className = {isError.passwordError===true ? 'registerError' : 'hide'}>{passwordError}</div>
             
        <button onClick={save}>Register</button>
        
      </form>         
    </div>
  )
}

export default Register