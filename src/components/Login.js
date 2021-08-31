import React from 'react'
import { useState } from 'react'


const getFormValues = () => {
    const storedValues= localStorage.getItem('form');
    if(!storedValues)
        return {
            name: '',
            password:''
        };
        return JSON.parse(storedValues)
}

const Login = () => {
    const [values, setValues] = useState(getFormValues)
    //     name: '',
    //     password:''
    // })

    React.useEffect(() => {
        localStorage.setItem('form',JSON.stringify(values));
    }, [values]);


    const handleSubmit = (event) => {
        event.preventDefault();
        // alert('Enter something!')
    }

    const handleChange = (event) => {
        setValues((previousValues) => ({
            ...previousValues,
            [event.target.name]: event.target.value,
        }));
    } 

    return (
    
    <div className="login-main">
         
        <form className='form1'>
            <h1>Sign-in</h1>
            <label htmlFor = "name">Account name:</label>
            <input type='text' name ='name' id='name' className='form-control' value={values.name} onChange={handleChange} placeholder='username'/>
            <label>Password:</label>
            <input type='password' name='password' id='password' className='form-control' value={values.password} onChange={handleChange}placeholder='password'/>
        </form> 

        <button className='buttons btn1' onClick={handleSubmit}>Login</button>
    </div>


    )
}

export default Login