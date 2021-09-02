import React from 'react'
import {useState} from 'react'
import { useHistory } from 'react-router-dom'
import Textfield from './Textfield'
import Form from './Form'
import Button from './Button'
import Error from './Error'


const Create = () => {

    const history = useHistory()
    const [isError, setError] = useState({
        firstNameError:false,
        lastNameError:false,
        emailError:false,
        balanceError:false,
    });
    
    var accInfo = {};
    var firstNameError = "firstname cannot be blank!"
    var lastNameError = "lastname cannot be blank!"
    var emailError = "email is invalid!" ;
    var balanceError = "user balance must not be a negative number!";

    function saveUser() {

        
        let firstname_input = document.getElementById('user-firstname').value;
        let lastname_input = document.getElementById('user-lastname').value;
        let email_input = document.getElementById('user-email').value;
        let user_balance = document.getElementById('user-balance').value;
        let accNum;
        let totalCustomers;

        if (firstname_input === '')  {
            setError({
                firstNameError:true,
                lastNameError:false,
                emailError:false,
                balanceError:false
            })
        } else if (lastname_input === '') {
            setError({
                firstNameError:false,
                lastNameError:true,
                emailError:false,
                balanceError:false
          })
        } else if (email_input === '') {
            setError({
                firstNameError:false,
                lastNameError:false,
                emailError:true,
                balanceError:false
          })
        } else if (user_balance < 0) {
            setError({
                firstNameError:false,
                lastNameError:false,
                emailError:false,
                balanceError:true
          })
        } else {
        //create UID
            if (localStorage.getItem('totalCustomers') === null) {
                localStorage.setItem('totalCustomers', 1)    
                totalCustomers = Number(localStorage.getItem('totalCustomers'))
                accNum = totalCustomers
            } else {
                totalCustomers = Number(localStorage.getItem('totalCustomers'))
                accNum = totalCustomers + 1
                // totalCustomers + 1
                localStorage.setItem('totalCustomers', accNum)
                
            }

            if (localStorage.getItem('totalCustomers') !== null) {
                setError({
                    firstNameError:false,
                    lastNameError:false,
                    emailError:false,
                    balanceError:false
            })
                if (user_balance  === '') {
                    user_balance=0
                }

                totalCustomers = Number(localStorage.getItem('totalCustomers'))
                accNum = totalCustomers
                accInfo.accNum = accNum
                accInfo.firstname = firstname_input;
                accInfo.lastname = lastname_input;
                accInfo.email = email_input;
                accInfo.balance = user_balance;
                localStorage.setItem(`user-${accNum}`, JSON.stringify(accInfo)); 

                
                if (localStorage.getItem('customerList') === null) {
                    localStorage.setItem('customerList', JSON.stringify([`user-${accNum}`]))
                } else  {
                    const customerList = JSON.parse(localStorage.getItem('customerList'))
                    customerList.push(`user-${accNum}`)
                    localStorage.setItem('customerList', JSON.stringify(customerList))
                }

                history.push('/transactions') 
                alert(`User ${firstname_input} succesfully created!`)
            }
        }
    }


    return (
        <div className='createUser-main'>

        <Form className='form2'>
        <h1>Create Customer Account</h1>


        <Textfield id='user-firstname' className='form-control' placeholder='enter firstname' type='text' >First Name:</Textfield>
        <Error classnames = {isError.firstNameError===true ? 'errortext' : 'hide'}>{firstNameError}</Error>    
        
        <Textfield id='user-lastname' className='form-control' placeholder='enter lastname' type='text' >Last Name:</Textfield>
        <Error classnames = {isError.lastNameError===true ? 'errortext' : 'hide'}>{lastNameError}</Error>

        <Textfield id='user-email' className='form-control' placeholder='xxxxx@email.com' type='email' >Email:</Textfield> 
        <Error classnames = {isError.emailError===true ? 'errortext' : 'hide'}>{emailError}</Error> 

        <Textfield id='user-balance' className='form-control' placeholder='enter balance' type='number' >Balance:</Textfield>
        <Error classnames = {isError.balanceError===true ? 'errortext' : 'hide'}>{balanceError}</Error> 

        
        <Button classnames="buttons btn1" onclick={saveUser}>Create Account</Button>   
      </Form>  
            
        </div>
    )
}

export default Create
