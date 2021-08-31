import React from 'react'


const Register = () => {

  var adminInfo = {};
      
  const save = (event) => {
    // implement error checking for empty input (username at least 8 characters)
    
    let username_input = document.getElementById('admin-username').value;
    

    if (localStorage.getItem(username_input) === null) {  
      
      adminInfo.firstname = document.getElementById('admin-firstname').value;
      adminInfo.lastname = document.getElementById('admin-lastname').value;
      adminInfo.password = document.getElementById('admin-password').value;
      localStorage.setItem(username_input, adminInfo);
      console.log(localStorage.getItem('adaef'))
    }
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

        <button onClick={save}>Register</button>
        
      </form>
            

    </div>
  )
}

export default Register

