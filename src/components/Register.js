import React from 'react'
import { useState } from 'react'

//get data from form

const getFormValues = () => {
  const storedValues = localStorage.getItem('data');
  if(!storedValues)
      return {
          name: '',
          balance:''
      };
      return JSON.parse(storedValues)
}

// if(localStorage.getItem('data') == null){
    //   localStorage.setItem('data', '[]');
    // }

  // getprevious data and push
    //let oldData = JSON.parse(localStorage.getItem('data'));
    // oldData.push(newData);

  // save old data + new data to local storage
    // localStorage.setItem('data', JSON.stringify(oldData))

const Register = props => {
  // const {value} = props
  const [values, setValues] = useState(getFormValues)


  React.useEffect(() => {
    localStorage.setItem('data',JSON.stringify(values));
  }, [values]);


const submitForm = (event) => {
    event.preventDefault();
    // alert('Enter something!')
}

const save = (event) => {

  setValues((previousValues) => ({
    ...previousValues,
    [event.target.name]: event.target.value,
  }));

    
}


  return (
    <div className="register-main">

      <form onSubmit={submitForm} className='form2'>
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
      </form>

    </div>
  )
}

export default Register


// function save() {
  // const [values, setValues] = useState(getFormValues)
  // let [nameValue, setNameValue] = useState
  // let [balanceValue , setBalValue] = useState
  // let new_data = document.getElementById('input').value;

  //save array
    // if(localStorage.getItem('data') == null){
    //   localStorage.setItem('data', '[]');
    // }

  //getprevious data and push
    // var old_data = JSON.parse(localStorage.getItem('data'));
    // old_data.push(new_data);

  //save old data + new data to local storage
    // localStorage.setItem('data', JSON.stringify(old_data))
// }
