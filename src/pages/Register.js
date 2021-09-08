import React from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../parts/Header'
import Textfield from '../components/Textfield'
import Error from '../components/Error'


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

const [userName, setuserName] = useState('')
const [firstName, setfirstName] = useState('')
const [lastName, setlastName] = useState('')
const [passWord, setpassWord] = useState('')


const [error, setError] = useState({
  usernameErr   : '',
  firstnameErr  : '',
  lastnameErr   : '',
  passwordErr   : ''
})

      console.log(userName)
      console.log(error.usernameErr)

let user_exist,
form_valid;

  
const validNameRegex = RegExp(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?0-9]+/);



let adminInfo = {};

function validateUser() {

  let saved_user = JSON.parse(localStorage.getItem(userName)) 
  
  if (saved_user !== null) {
    user_exist = 1
  } else {  
    user_exist = 0
  }
  console.log(user_exist)
return user_exist
  //   //=======USERNAME========/
    
  //     if (userName === '') {
  //       // setError({
  //       //   usernameErr: true,
  //       //   firstnameErr : false,
  //       //   lastameErr : false,
  //       //   passwordErr : false
          
  //       // })
  //       // seterrorMessage({usernameErr   : 'Please fill username field'})
  //       // setError({usernameErr   : 'Please fill username field'})
      
  //     } else if (userName.length <  2 ) {
  //       // setError({
  //       //   usernameErr: true,
  //       //   firstnameErr : false,
  //       //   lastameErr : false,
  //       //   passwordErr : false,
          
  //       // })
  //       // seterrorMessage({usernameErr   : 'Username must be at least 2 characters long'})
  //       // setError({usernameErr   : 'Username must be at least 2 characters long'})
      
  //     } else {
  //       console.log('Username is valid')
  //     }
  //     //=======FIRSTNAME========/
  //     if (firstName === '') {
  //       // setError({
  //       //   usernameErr: false,
  //       //   firstnameErr : true,
  //       //   lastameErr : false,
  //       //   passwordErr : false
          
  //       // })
  //       // seterrorMessage({firstnameErr   : 'Please fill firstname field!'})
  //       setError({firstnameErr   : 'Please fill firstname field!'})
  //     } else if (firstName.length < 2) {
  //       // setError({
  //       //   usernameErr: false,
  //       //   firstnameErr : true,
  //       //   lastameErr : false,
  //       //   passwordErr : false
          
  //       // })
  //       // setError({firstnameErr   : 'First name must be at least 2 characters long'})
  //       // seterrorMessage({firstnameErr   : 'First name must be at least 2 characters long'})
  //     } else if (validNameRegex.test(firstName)) {
  //       // setError({
  //       //   usernameErr: false,
  //       //   firstnameErr : true,
  //       //   lastameErr : false,
  //       //   passwordErr : false
          
  //       // })
  //       setError({firstnameErr   : 'Must not include numbers and special characters!'})
  //       // seterrorMessage({firstnameErr   : 'Must not include numbers and special characters!'})
  //     } else  {
  //       console.log ('Firstname valid')
  //     }
  //     //=======LASTNAME========/
  //     if (lastName === '') {
  //       // setError({
  //       //   usernameErr: false,
  //       //   firstnameErr : false,
  //       //   lastameErr : true,
  //       //   passwordErr : false
          
  //       // })
  //       setError({lastnameErr   : 'Please fill firstname field!'})
  //       // seterrorMessage({lastnameErr   : 'Please fill firstname field!'})
  //     } else if (lastName.length < 2) {
  //       // setError({
  //       //   usernameErr: false,
  //       //   firstnameErr : false,
  //       //   lastameErr : true,
  //       //   passwordErr : false
          
  //       // })
  //       // seterrorMessage({lastnameErr   : 'Last name must be at least 2 characters long'})
  //       setError({lastnameErr   : 'Last name must be at least 2 characters long'})
  //     } else if (validNameRegex.test(lastName)) {
  //       // setError({
  //       //   usernameErr: false,
  //       //   firstnameErr : false,
  //       //   lastameErr : true,
  //       //   passwordErr : false
          
  //       // })
  //       // seterrorMessage({lastnameErr   : 'Must not include numbers and special characters!'})
  //       setError({lastnameErr   : 'Must not include numbers and special characters!'})
  //     } else {
  //       console.log ('Lastname valid')
  //     }

  //     //=======PASSWORD========/
  //     if (passWord==='') {
  //       // setError({
  //       //   usernameErr: false,
  //       //   firstnameErr : false,
  //       //   lastameErr : false,
  //       //   passwordErr : true
          
  //       // })
  //       setError({passWordErr   : 'Please fill password field!'})
  //       // seterrorMessage({passWordErr   : 'Please fill password field!'})
  //     } else if (passWord.length < 6) {
  //       // setError({
  //       //   usernameErr: false,
  //       //   firstnameErr : false,
  //       //   lastameErr : false,
  //       //   passwordErr : true
          
  //       // })
  //       // seterrorMessage({passwordErr   : 'Password must be at least 6 characters long!'})
  //       setError({passwordErr   : 'Password must be at least 6 characters long!'})
  //     } else {
  //       console.log ('password created')
  //     }
  //   //end of internal ifs  
  //  if ((userName === '') && (firstName === '') && (lastName === '') && (passWord === '')) {
  //     alert ('All fields are empty')
  //     console.log ('invalid form')
  // } 

} //closing of validateUser
   

function saveAccount() {
    
  if ((userName !== '') && (firstName !== '') && (lastName !== '') && (passWord !== '')) {
    
    if (form_valid===true) {

      adminInfo.firstname = firstName
      adminInfo.lastname = lastName
      adminInfo.password = passWord
      localStorage.setItem(userName, JSON.stringify(adminInfo)); 
      history.push('/accounts') 
      alert(`User ${userName} succesfully created!`)
    } else {   
          alert(`Invalid!`)
    }     
 }
}

  //form validator
  const validateForm = (error) => {
    let valid=true;
    Object.values(error).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }


  const handleSubmit = (e) => {
      e.preventDefault();
      // validateUser()
          if (validateForm(error)) {
            console.info('Valid Form')
            form_valid=true
          } else{
            console.error('Invalid Form')
            form_valid=false
          }
          saveAccount()
        } 


  let handleChange = (e, state) => { 
    // e.preventDefault();
 
    switch (state) {
      case 'userName':
        setuserName(e.target.value)
        validateUser()
        error.usernameErr = 
          // userName === ''
          // ? setError({usernameErr   : 'Username must not be empty'})
          // :
          userName.length < 5
          ? setError({usernameErr   : 'Username must be at least 5 characters long'})
          :
          user_exist===1
          // user_exist === true
          ? setError({usernameErr   : 'Username already exist'})
          : '';
        break;
      case 'firstName' :
        setfirstName(e.target.value);
        error.firstnameErr = 
          validNameRegex.test(firstName)
          ? setError({firstnameErr   : 'First name must not include numbers and special characters!'})
          :
          firstName.length < 2
          ? setError({firstnameErr   : 'Firstname must be at least 2 characters long'})
          : '';
        break;
      case 'lastName' :
        setlastName(e.target.value);
        break;
      case 'passWord' :
        setpassWord(e.target.value);
        break;
      default:
        break;
    }
      // console.log(userName)
    }


  // function saveAccount() {
    
  //   // validation()
  //     // if ((username_input !== '') && (user_valid === true) && (firstname_input !== '') && (lastname_input !== '') && (password_input !=='')) {
  //     if (form_valid ===true) {

  //       adminInfo.firstname = document.getElementById('admin-firstname').value;
  //       adminInfo.lastname = document.getElementById('admin-lastname').value;
  //       adminInfo.password = document.getElementById('admin-password').value;
  //       localStorage.setItem(userName, JSON.stringify(adminInfo)); 
  //       history.push('/accounts') 
  //       alert(`User ${userName} succesfully created!`)
  //     } else {   
  //           alert(`Please check errors!`)
  //     }     
  // }     

  
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
              {/* <label className="required" htmlFor="username">User Name</label>
              <input type='text' id='admin-username' name='username' onChange={handleChange}/> */}
              {/* {error.usernameErr >= 0 && <span className='error'>{error.usernameErr}</span>}           */}
              {error.usernameErr !== '' && <span className='error'>{error.usernameErr}</span>} 
            </div>

            <div className='fullName'>
            <Textfield id="admin-firstname" type="text"  onChange={(e) => handleChange (e, 'firstName')} value={firstName}>First Name</Textfield>
            {/* <Error classnames={error.firstnameErr === true ? 'errortext' : 'hide'}>{error.firstnameErr}</Error> */}
              {/* <label htmlFor="firstname">First Name</label>
              <input type='text' id='admin-firstname' name='firstname' onChange={handleChange}  /> */}
               {error.firstnameErr !== '' && <span className='error'>{error.firstnameErr}</span>} 
            </div>

            <div className='fullName'>
            <Textfield id="admin-lastname" type="text" value={lastName} onChange={(e) => handleChange (e, 'lastName')}>Last Name</Textfield>
            <Error classnames={error.lastameErr === true ? 'errortext' : 'hide'}>{error.lastameErr}</Error>
              {/* <label htmlFor="lastname">Last Name</label>
              <input type='text' id='admin-lastname' name='lastname' onChange={handleChange}  /> */}
              {/* {errors.lastname.length > 0 && <span className='error'>{errors.lastname}</span>} */}
            </div>

            <div className='password'>
            <Textfield id="admin-password" type="password" value={passWord} onChange={(e) => handleChange (e, 'passWord')}>Password</Textfield>
            <Error classnames={error.passwordErr === true ? 'errortext' : 'hide'}>{error.passwordErr}</Error>
              {/* <label htmlFor="password">Password</label>
              <input type='password' id='admin-password'name='password' onChange={handleChange}  /> */}
              {/* {errors.password.length > 0 && <span className='error'>{errors.password}</span>} */}
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


  
// function validation(){

// let saved_user = JSON.parse(localStorage.getItem(username));

//       if (saved_user !== null) {
//         user_valid = false
//       } else {  
//         user_valid = true
//       }

// }
// var adminInfo= {}

//         e.preventDefault();
//         const { name, value } = e.target;
//         let errors = errors;
    
        
        
//         e.preventDefault();
//         // validate()
//         let errors = check.errors;
//         validation()
//         const { name, value } = e.target;
        
// //Regular expression tester for pattern-matching and "search-and-replace functions on text
// const validNameRegex = RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]+/);
// //form validator
// const validateForm = (errors) => {
//     let valid = true;
//     Object.values(errors).forEach(
//       (val) => val.length > 0 && (valid = false)
//     );
//     return valid;
//   }


      

//   const handleCheck = (e) => {
//     // event.preventDefault();
//     // validation()
//     if (validateForm(check.errors)) {
//       console.info('Valid Form')
//       form_valid=true
//     } else{
//       console.error('Invalid Form')
//       form_valid=false
//     }
//   } 
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // validation()
//     if (validateForm(check.errors)) {
//       console.info('Valid Form')
//       form_valid=true
//     } else{
//       console.error('Invalid Form')
//       form_valid=false
//     }
//     saveAccount()
//   } 


//  /* <div className='fullName'>
//               <label className="required" htmlFor="username">User Name</label>
//               <input type='text' id='admin-username' name='username' onChange={handleChange}/>
//               {errors.username.length > 0 && <span className='error'>{errors.username}</span>}          
//             </div>

//             <div className='fullName'>
//               <label htmlFor="firstname">First Name</label>
//               <input required type='text' id='admin-firstname' name='firstname' onChange={handleChange}  />
//               {errors.firstname.length > 0 && <span className='error'>{errors.firstname}</span>}
//             </div>

//             <div className='fullName'>
//               <label htmlFor="lastname">Last Name</label>
//               <input required type='text' id='admin-lastname' name='lastname' onChange={handleChange}  />
//               {errors.lastname.length > 0 && <span className='error'>{errors.lastname}</span>}
//             </div>

//             <div className='password'>
//               <label htmlFor="password">Password</label>
//               <input required type='password' id='admin-password'name='password' onChange={handleChange}  />
//               {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
//             </div> */



// //ALWAYS FILL ALL REQUIRED FIELDS

// // import React from 'react'
// // import {Redirect, useHistory } from 'react-router-dom'
// // import { useState } from 'react'
// // import Textfield from '../components/Textfield'
// // import Form from '../components/Form'
// // // import Button from './Button'
// // // import Error from './Error'
// // import Header from '../parts/Header'


// // const Register = ({status}) => {

// //   const history = useHistory()

// // // If currentAdmin is not amcanlubo or ajong, do not authorize to register other accounts
// //   if(status.isLoggedIn){
// //     if ((status.currentAdmin === 'amcanlubo') || (status.currentAdmin === 'ajong')){
    
// //     } else {     
// //       console.log('ACCESS DENIED');  
// //       alert('ACCESS DENIED'); 
// //       // <Redirect to="/accounts"/>
// //       history.push('/accounts') 
// //     }
// //   } 
// //   // else {}
// //   //Regular expression tester for pattern-matching and "search-and-replace" functions on text
// //   const validNameRegex = RegExp(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?0-9]+/);
  
// //   //form validator
// //   const validateForm = (errors) => {
// //   let valid = true;
// //   Object.values(errors).forEach(
// //     (val) => val.length > 0 && (valid = false)
// //   );
// //   return valid;
// // }

// //   //Initial state
// //   const [check, setCheck] = useState({
// //     username: null,
// //     firstname: null,
// //     lastname: null,
// //     password: null,
// //     errors:  {
// //         username: '',
// //         firstname: '',
// //         lastname: '',
// //         email: '',
// //         password: ''
// //   }
// // })

// //   // const [usernameErr, SetusernameErr] = useState({})
// //   // const [firstnameErr, SetfirstnameErr] = useState({})
// //   // const [lastnameErr, SetlastnameErr] = useState({})
// //   // const [passwordErr, SetpasswordErr] = useState({})
  
  
// //   var adminInfo = {};
// //   let user_exist;
  

// //   function validate() {
    
// //     let username_input = document.getElementById('admin-username').value,
// //         storageUsers = JSON.parse(localStorage.getItem(adminInfo));
        
// //         if (storageUsers !== null) {
// //             //loop through each admin user accounts and cross-check
// //             for (let adminInfo of storageUsers) {
// //                console.log(adminInfo)
// //                 if (username_input === adminInfo) {
// //                   user_exist = true
// //                 } else {
// //                   user_exist = false    
// //                 }
// //             }
// //             return user_exist
// //         }
// //   }

// //   function saveAccount() {
    
// //     let username_input = document.getElementById('admin-username').value,
// //         firstname_input = document.getElementById('admin-firstname').value,
// //         lastname_input = document.getElementById('admin-lastname').value,
// //         password_input = document.getElementById('admin-password').value;
        
// //         validate()
    
// //         if (user_exist === true) {
// //           alert(`User ${username_input} already exist!`)
// //         }   
// //         //if username doesn't exist, all fields are complete and password is at least 6 characters, proceed to registration
// //         else if ((localStorage.getItem(username_input) === 'null') && (firstname_input !== '') && (lastname_input !== '') && (password_input.length >= 6)) {
// //           adminInfo.firstname = document.getElementById('admin-firstname').value;
// //           adminInfo.lastname = document.getElementById('admin-lastname').value;
// //           adminInfo.password = document.getElementById('admin-password').value;
// //           localStorage.setItem(username_input, JSON.stringify(adminInfo)); 
// //           history.push('/accounts') 
// //           alert(`User ${username_input} succesfully created!`)
// //         } 
// //         else {   
// //           alert(`Fill all required fields!`)
// //           // alert(`User ${username_input} already exist!`)
// //         }
              
// //   }     

// //   const handleChange = (event) => { 
    
// //     event.preventDefault();
// //     const { name, value } = event.target;
// //     // validate()
// //     let errors = check.errors;
    
    
// //     switch (name) {
// //       case 'username': 
// //       errors.username = 
// //           value.length < 2
// //             ? errors.username = 'Username is too short'
// //           //   :
// //           // (user_exist===true)
// //           //   ? usernameErr.userNameShort = 'Username already exist!'
// //             : '';
// //         break;
// //       case 'firstname': 
// //       errors.firstname = 
// //           value.length < 3
// //             ? errors.firstname = 'First name must be at least 3 characters'
// //             :
// //           validNameRegex.test(value)
// //             ? errors.firstname = 'First name must not include numbers and special characters!'
// //             : '';
// //         break;
     
// //       case 'lastname': 
// //       errors.lastname = 
// //           value.length < 2
// //             ? errors.lastname = 'Last name must be at least 3 characters'
// //             :
// //           validNameRegex.test(value)
// //             ? errors.lastname = 'Last name must not include numbers and special characters!'
// //             : '';
// //         break;
      
// //       case 'password': 
// //       errors.password = 
// //           value.length < 6
// //             ? errors.password= 'Password must be 6 characters long'
// //             : '';
// //         break;
// //       default:
// //         break;
// //     }
// //     setCheck({errors, [name]: value});
// //     // setCheck(prevState => ({ ...errors, [name]: value }))
// //   }

// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     if (validateForm(check.errors)) {
// //       console.info('Valid Form')
// //     } else{
// //       console.error('Invalid Form')
// //     }
// //   } 

// //   const {errors} = check;
  
// //   return (

// //   <> 
// //     <Header />
// //     <div className='wrapper'>
// //         <div className='form-wrapper'>
// //           <h2>Register Admin</h2>
// //           <form onSubmit={handleSubmit} noValidate>
          

// //             <div className='fullName'>
              
// //               <label htmlFor="username">User Name</label>
// //               <input required type='text' id='admin-username' name='username' onChange={handleChange} noValidate />
// //               {errors.username.length > 0 && <span className='error'>{errors.username}</span>}          
// //             </div>

// //             <div className='fullName'>
// //               <label htmlFor="firstname">First Name</label>
// //               <input required type='text' id='admin-firstname' name='firstname' onChange={handleChange} noValidate />
// //               {errors.firstname.length > 0 && <span className='error'>{errors.firstname}</span>}
// //             </div>

// //             <div className='fullName'>
// //               <label htmlFor="lastname">Last Name</label>
// //               <input required type='text' id='admin-lastname' name='lastname' onChange={handleChange} noValidate />
// //               {errors.lastname.length > 0 && <span className='error'>{errors.lastname}</span>}
// //             </div>

// //             <div className='password'>
// //               <label htmlFor="password">Password</label>
// //               <input required type='password' id='admin-password'name='password' onChange={handleChange} noValidate />
// //               {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
// //             </div>

// //             <div className='info'>
// //               <small>Password must be six characters in length.</small>
// //             </div>
// //             <div className='submit'>
// //               <button onClick={saveAccount}>Create</button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //   </>
// //   )
// // }

// // export default Register