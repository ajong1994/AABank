import React from 'react'
import {useState} from 'react'
import { useHistory } from 'react-router-dom'
import Textfield from './Textfield'
import Form from './Form'
import Button from './Button'
import Error from './Error'


const Create = ({status}) => {
    // let currentStatus = useState(status)

    //If user isLoggedIn based on state passed as prop, redirect to accounts component
    // if (status) {
    //     return <Redirect to="/accounts"/>
    // } 

    const history = useHistory()
    const [isError, setError] = useState({
        firstNameError:false,
        lastNameError:false,
        emailblankError:false,
        emailInvalidError:false,
        emailExistError:false,
        balanceError:false,
        invalidCharError:false,
        invalidChar2Error:false
    });
    
    var accInfo = {};
    
    var firstNameErrorMsg = "firstname cannot be blank"
    var lastNameErrorMsg = "lastname cannot be blank"
    var invalidCharMsg = "must not contain numbers and special characters"
    var emailblankErrorMsg = "email cannot be blank" ;
    var emailInvalidErrorMsg = "invalid email" ;
    var emailExistErrorMsg='email already exist'
    var balanceErrorMsg = "user balance must not be a negative number";

    function saveUser() {


        let firstname_input = document.getElementById('user-firstname').value;
        let lastname_input = document.getElementById('user-lastname').value;
        let email_input = document.getElementById('user-email').value;
        let user_balance = document.getElementById('user-balance').value;
        let accNum;
        let totalCustomers;
        var populatedCustomerList = []
        var newList = []
        let email_exist 
        let validFirstName
        let validLastName
        let validEmail


        // Get list of total customers from localStorage
        const customerList = JSON.parse(localStorage.getItem('customerList'));
                
            if (customerList !== null) {
                //loop through customerList
                for (let customer of customerList) {
                    populatedCustomerList.push(JSON.parse(localStorage.getItem(customer)))
                }
                    //loop through each customer to check each info
                    for (let i=0; i < populatedCustomerList.length; i++) {
                        newList.push(populatedCustomerList[i])
                        //check if user email input matches any stored customer email and return an error
                        for (let j=0; j < newList.length; j++) {
                            if (email_input === newList[i].email){
                                email_exist = true
                            } else {
                                email_exist = false
                            }
                        }
                    }
            }

        //Check if firstname and lastname user input accepts only string
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]+/;

            if (format.test(firstname_input)) {
                validFirstName = true
            } else {
                validFirstName = false
            }

    
            if(format.test(lastname_input)) {
                validLastName = true
            } else {
                validLastName = false
            }
        //Check if email has correct format        
        var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (emailformat.test(email_input)){
                validEmail = false
            } else {
                validEmail = true
            }
        // str1.toLowerCase() === str2.toLowerCase(); // true
        
        //check if first name input field is not empty
        if (firstname_input === '')  {
            setError({
                firstNameError:true,
                lastNameError:false,
                emailblankError:false,
                emailInvalidError:false,
                emailExistError:false,
                balanceError:false,
                invalidCharError:false,
                invalidChar2Error:false
            })
        } 
        //check if first name characters are valid
        else if (validFirstName === true) {
            setError({
                firstNameError:false,
                lastNameError:false,
                emailblankError:false,
                emailInvalidError:false,
                emailExistError:false,
                balanceError:false,
                invalidCharError:true,
                invalidChar2Error:false
          })
        }
        //check if first name characters are valid
        else if (validLastName === true) {
            setError({
                firstNameError:false,
                lastNameError:false,
                emailblankError:false,
                emailInvalidError:false,
                emailExistError:false,
                balanceError:false,
                invalidCharError:false,
                invalidChar2Error:true
          })
        }
        //check if last name input field is not empty
        else if (lastname_input === '') {
            setError({
                firstNameError:false,
                lastNameError:true,
                emailblankError:false,
                emailInvalidError:false,
                emailExistError:false,
                balanceError:false,
                invalidCharError:false,
                invalidChar2Error:false
          })
        //check if email input field is not empty
        } else if (email_input === '') {
            
            setError({
                firstNameError:false,
                lastNameError:false,
                emailblankError:true,
                emailInvalidError:false,
                emailExistError:false,
                balanceError:false,
                invalidCharError:false,
                invalidChar2Error:false
          })
        //check if email format is valid
        }  else if (validEmail === true) {      
            setError({
                firstNameError:false,
                lastNameError:false,
                emailblankError:false,
                emailInvalidError:true,
                emailExistError:false,
                balanceError:false,
                invalidCharError:false,
                invalidChar2Error:false
          })
        //check if email already exist
        } else if(email_exist===true){
            setError({
                firstNameError:false,
                lastNameError:false,
                emailblankError:false,
                emailInvalidError:false,
                emailExistError:true,
                balanceError:false,
                invalidCharError:false,
                invalidChar2Error:false
            })
        //check if balance is not a negative value
        }  else if (user_balance < 0) {
            setError({
                firstNameError:false,
                lastNameError:false,
                emailblankError:false,
                emailInvalidError:false,
                emailExistError:false,
                balanceError:true,
                invalidCharError:false,
                invalidChar2Error:false
          })
        } else {
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

            if (localStorage.getItem('totalCustomers') !== null) {
                setError({
                    firstNameError:false,
                    lastNameError:false,
                    emailblankError:false,
                    emailInvalidError:false,
                    balanceError:false,
                    invalidCharError:false,
                    invalidChar2Error:false
            })

            if (user_balance  === '') {
                user_balance = 0
            }
                totalCustomers = Number(localStorage.getItem('totalCustomers'))
                accNum = totalCustomers
                //format accNum to 5-digit number
                accNum = String(accNum).padStart(5, '0')
                accInfo.accNum = accNum
                accInfo.firstname = firstname_input;
                accInfo.lastname = lastname_input;
                accInfo.email = email_input;
                accInfo.balance = user_balance;
                //store accInfo to local storage
                localStorage.setItem(`user-${accNum}`, JSON.stringify(accInfo)); 
            
                //create an array of 'customerList' for mapping
                if (localStorage.getItem('customerList') === null) {
                    localStorage.setItem('customerList', JSON.stringify([`user-${accNum}`]))
                } else  {
                    const customerList = JSON.parse(localStorage.getItem('customerList'))
                    customerList.push(`user-${accNum}`)
                    localStorage.setItem('customerList', JSON.stringify(customerList))
                }
                //if successfully created move to accounts page
                history.push('/accounts') 
                alert(`User ${firstname_input} succesfully created!`)
            }
        }
    }

    
    return (
        <div className='createUser-main'>
          <Form className='form2'>
                <h1>Create Customer Account</h1>

                <Textfield id='user-firstname' className='form-control' placeholder='enter firstname' type='text' >First Name:</Textfield>
                <Error classnames = {isError.firstNameError===true ? 'errortext' : 'hide'}>{firstNameErrorMsg}</Error>    
                <Error classnames = {isError.invalidCharError===true ? 'errortext' : 'hide'}>{invalidCharMsg}</Error>    
                
                <Textfield id='user-lastname' className='form-control' placeholder='enter lastname' type='text' >Last Name:</Textfield>
                <Error classnames = {isError.lastNameError===true ? 'errortext' : 'hide'}>{lastNameErrorMsg}</Error>
                <Error classnames = {isError.invalidChar2Error===true ? 'errortext' : 'hide'}>{invalidCharMsg}</Error>

                <Textfield id='user-email' className='form-control' placeholder='xxxxx@email.com' type='email' >Email:</Textfield> 
                <Error classnames = {isError.emailblankError===true ? 'errortext' : 'hide'}>{emailblankErrorMsg}</Error> 
                <Error classnames = {isError.emailInvalidError===true ? 'errortext' : 'hide'}>{emailInvalidErrorMsg}</Error> 
                <Error classnames = {isError.emailExistError===true ? 'errortext' : 'hide'}>{emailExistErrorMsg}</Error> 

                <Textfield id='user-balance' className='form-control' placeholder='enter balance' type='number' >Balance:</Textfield>
                <Error classnames = {isError.balanceError===true ? 'errortext' : 'hide'}>{balanceErrorMsg}</Error> 

                <Button classnames="buttons btn1" onclick={saveUser}>Create Account</Button>   
            </Form>        
    </div>
    )
}

export default Create
