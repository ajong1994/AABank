import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Textfield from './Textfield'
import Form from './Form'
import Button from './Button'
import Error from './Error'

//input status
const Register = ({status}) => {

  const history = useHistory()

  //no error state
  const [isError, setError] = useState({
      userNameEmptyError:false,
      userNameExistError:false,
      firstNameError:false,
      lastNameError:false,
      passwordError:false,
      passwordEmpty:false
  });
  //if an error is committed display error message/s
  var adminInfo = {};
  var userNameError1 = "username cannot be blank!";
  var userNameError2 =  "username already exist!";
  var firstNameError = "firstname cannot be blank!"
  var lastNameError = "lastname cannot be blank!"
  var passwordError1 = "password is invalid!" ;
  var passwordError2 = "password cannot be blank!";


  function save() {
    
    let username_input = document.getElementById('admin-username').value,
        firstname_input = document.getElementById('admin-firstname').value,
        lastname_input = document.getElementById('admin-lastname').value,
        password_input = document.getElementById('admin-password').value;

        //if username input field is empty
        if (username_input !== '') {  

          //if username doesn't exist, all fields are complete and password is at least 6 characters, proceed to registration
          if  ((localStorage.getItem(username_input) === null) && (firstname_input !== '') && (lastname_input !== '') && (password_input.length >= 6)) {
            adminInfo.firstname = document.getElementById('admin-firstname').value;
            adminInfo.lastname = document.getElementById('admin-lastname').value;
            adminInfo.password = document.getElementById('admin-password').value;
            localStorage.setItem(username_input, JSON.stringify(adminInfo)); 
            // history.push('/Accounts') 
            history.push('/login') 
            alert(`User ${username_input} succesfully created!`)

          //if firstname field is left empty leave an error message
          } else if ((localStorage.getItem(username_input) === null) && (firstname_input === '')){
            setError({
              userNameEmptyError:false,
              userNameExistError:false,
              firstNameError:true,
              lastNameError:false,
              passwordError:false,
              passwordEmpty:false
          })

          //if lastname field is left empty leave an error message
          } else if ((localStorage.getItem(username_input) === null) && (lastname_input === '')){
            setError({
              userNameEmptyError:false,
              userNameExistError:false,
              firstNameError:false,
              lastNameError:true,
              passwordError:false,
              passwordEmpty:false
          })

          //if password field is left empty leave an error message
          } else if ((localStorage.getItem(username_input) === null) && (password_input === '')){
            setError({
              userNameEmptyError:false,
              userNameExistError:false,
              firstNameError:false,
              lastNameError:false,
              passwordError:false,
              passwordEmpty:true
          })

          //if password input is less than 6 characters leave an error message
          } else if ((localStorage.getItem(username_input) === null) && (password_input.length < 6)) {
            setError({
              userNameEmptyError:false,
              userNameExistError:false,
              firstNameError:false,
              lastNameError:false,
              passwordError:true,
              passwordEmpty:false     

          //username already exist
          })} else {   
            setError({
              userNameEmptyError:false,
              userNameExistError:true,
              firstNameError:false,
              lastNameError:false,
              passwordError:false,
              passwordEmpty:false    
            })
          }

        //username is empty
        } else {   
          setError({
              userNameEmptyError:true,   
              userNameExistError:false,
              firstNameError:false,
              lastNameError:false,
              passwordError:false
          })}              
  }     
      
  
  return (

    <div className="register-main">
      <Form className='form2'>
        <h1>Register</h1>
        <Textfield id='admin-username' className='form-control' placeholder='enter name' type='text' >Username:</Textfield>
        <Error classnames = {isError.userNameEmptyError===true ? 'errortext' : 'hide'}>{userNameError1}</Error>
        <Error classnames = {isError.userNameExistError===true ? 'errortext' : 'hide'}>{userNameError2}</Error>
        
        <Textfield id='admin-firstname' className='form-control' placeholder='enter firstname' type='text' >First Name:</Textfield>
        <Error classnames = {isError.firstNameError===true ? 'errortext' : 'hide'}>{firstNameError}</Error>

        <Textfield id='admin-lastname' className='form-control' placeholder='enter lastname' type='text' >Last Name:</Textfield> 
        <Error classnames = {isError.lastNameError===true ? 'errortext' : 'hide'}>{lastNameError}</Error> 

        <Textfield id='admin-password' className='form-control' placeholder='enter password' type='text' >Password:</Textfield>
        <Error classnames = {isError.passwordError===true ? 'errortext' : 'hide'}>{passwordError1}</Error> 
        <Error classnames = {isError.passwordEmpty===true ? 'errortext' : 'hide'}>{passwordError2}</Error>  
        <span>Use 6 or more characters</span>   
        <Button classnames="buttons btn1" onclick={save}>Register</Button>   
      </Form>         
    </div>
  )
}

export default Register