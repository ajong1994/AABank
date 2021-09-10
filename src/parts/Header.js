import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../components/Logout'


import logo from './logo.png'


const Header = ({status}) => {
    
    return (        
        
        //<header className='flex flex-row justify-between '> 
         <header className="header-2"> 
         <div class="container px-4 mx-auto md:flex md:items-center">
        <div className="flex justify-between items-center">
         <img className='h-14' src={logo} alt="Logo" />
        </div>
            <ul className="md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0">
                <li><Link className="font-bold text-xl text-indigo-600" to='/accounts'>Accounts</Link></li>
                <li><Link className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300" to='/transactions'>Transactions</Link></li>
                <li><Link className={((status.currentAdmin !== 'amcanlubo') && (status.currentAdmin !== 'ajong1994')) ? 'hide' : "p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"} to='/register'>Register</Link></li>
                <li><Link className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300" to='/create'>Create Account</Link></li>
                <li><Link className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300" to='/'><Logout /></Link></li>                     
            </ul>  
        </div>
        </header>
    )       
}

export default Header
