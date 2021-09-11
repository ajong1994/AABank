import React from 'react'

const Logout = ({status, updater}) => {

    // if (status.isLoggedIn){
    //     updater({
    //         isLoggedIn: false, 
    //         currentAdmin: ''
    //     });
    //     clear()
    // }

    
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