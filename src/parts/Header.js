import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../components/Logout'


const Header = ({status}) => {

    return (        
         <header className='App-header'> 
            <ul>
                <li><Link className='navItem' to='/accounts'>Accounts</Link></li>
                <li><Link className='navItem' to='/transactions'>Transactions</Link></li>
                <li><Link className={((status.currentAdmin !== 'amcanlubo') && (status.currentAdmin !== 'ajong1994')) ? 'none' : 'navItem'} to='/register'>Register</Link></li>
                <li><Link className='navItem' to='/create'>Create Account</Link></li>
                <li><Link className='navItem' to='/'><Logout /></Link></li>                     
            </ul>           
        </header>
    )       
}

export default Header
