import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout'

const Header = ({status}) => {
    
      
    return (        
         <header className='App-header'> 
            <ul>
                <li><Link className='navItem' to='/accounts'>Accounts</Link></li>
                <li><Link className='navItem' to='/register'>Register</Link></li>
                <li><Link className='navItem' to='/create'>Create Account</Link></li>
                <li><Link className='navItem' to='/'><Logout /></Link></li> 
                {/* <li><Link className='navItem' to='/logout'>Logout</Link></li> */}
                    
            </ul>           
        </header>
    )       
}

export default Header


// const Header = ({id, classname, children}) => {

// <>
//     <header id={id} className={classname}>
//     {children}
//     </header>
//     <List liClassname='navItem' location='/create'>Create User</List> 
//     <List liClassname='navItem'  location='/register'>Register</List>
//     <List liClassname='navItem' location='/logout'>Logout</List>
// </>