import React from 'react'

const Create = () => {
    let username_input;
    let password_input;
    let accNum;
    let accInfo ={};

    if (localStorage.getItem('totalCustomers') === null) {  
        localStorage.setItem('totalCustomers', 1)
        accNum = 1
    } else {
        var totalCustomers = Number(localStorage.getItem('totalCustomers'))
        accNum = totalCustomers + 1
    }


        
    if (localStorage.getItem(username_input) === null) {
        accInfo.accNum = accNum
        accInfo.firstName = accNum
        accInfo.lastname = accNum
        localStorage.setItem(`user-${accNum}`, accInfo);
    }

    return (
        <div>
             {/* <form onSubmit={submitForm} className='form2'>
        <label htmlFor = "name">Account name:</label>

        <input 
        type='text' 
        name ='name' id='name' className='form-control' placeholder='enter name'
        value={values.name}  
        onChange={save}/>
        
        <label htmlFor = "balance">Balance:</label>
        <input 
        type='number' name='balance' id='balance' className='form-control' placeholder='enter balance'
        value={values.balance} 
        onChange={save}/>

        <button>Register</button>
        <button>View</button>
      </form> */}
            
        </div>
    )
}

export default Create
