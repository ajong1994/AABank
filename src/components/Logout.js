import React from 'react'
import { useHistory } from 'react-router-dom'


const Logout = ({status}) => {

    // const history = useHistory()
    function clear() { 
        alert(`User succesfully logged out!`)
        sessionStorage.clear();
        window.location.href='/Login'    
    }
   
    return (
        <>
            <span className='logout' onClick={clear}>Logout</span>
        </>
    )
}

export default Logout

        // import { useState } from 'react'
        // import {Redirect, useHistory} from 'react-router-dom'

        //   const history = useHistory()

        // sessionStorage.removeItem('isLoggedIn');
        // sessionStorage.removeItem('currentAdmin');
        
        // updater({
        //     isLoggedIn: false, 
        //     currentAdmin: ''
        // });

        // remove all stored values
        // sessionStorage.clear('isLoggedIn');
        // sessionStorage.clear('currentAdmin');
        
        // return <Redirect to="/Login"/>