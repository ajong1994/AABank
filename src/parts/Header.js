import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../components/Logout'
import logo from '../components/logo.png'
import {CashIcon} from '@heroicons/react/outline'
import {UserAddIcon} from '@heroicons/react/outline'
import {UserGroupIcon} from '@heroicons/react/outline'
import {LogoutIcon} from '@heroicons/react/outline'


const Header = ({status, updater}) => {
    
    
    return (        
        
    <div className="flex flex-col bg-white h-full">
        <div className="flex flex-col w-56 h-full bg-white overflow-hidden shadow">
            <div className="flex items-center justify-center h-20">
                <img className='w-36' src={logo} alt="Logo" />
            </div>
            

            <ul className="flex flex-col py-5">

                <li className="flex flex-row items-center h-12">
                    <span className="text-md font-bold text-gray-600 pl-3">Welcome, { status.currentAdmin }!</span>
                </li>

                <li>
                    <Link className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-primary" to='/accounts'>
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <UserGroupIcon className="h-6 w-6" />
                    </span>
                    <span className="text-sm font-medium">Accounts</span>
                    </Link>
                </li>
                <li>
                    <Link className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-primary" to='/transactions'>
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <CashIcon className="h-6 w-6"/>
                    </span>
                    <span className="text-sm font-medium">Transactions</span>
                    </Link>
                </li>
                <li>
                    <Link className={((status.currentAdmin !== 'amcanlubo') && (status.currentAdmin !== 'ajong1994')) ? "hidden" :"flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"} to='/register'>
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <UserAddIcon className="h-6 w-6"/>
                    </span>
                    <span className="text-sm font-medium">Register Admin</span>
                    </Link>
                </li>
                <li>
                    <Link className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-primary" to='/create'>
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <UserAddIcon className="h-6 w-6"/>
                    </span>
                    <span className="text-sm font-medium">Create User</span>
                    </Link>
                </li>
                 
                <li>
                    <Link className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-primary" to='/'>
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <LogoutIcon className="h-6 w-6"/>
                    </span>
                    <span className="text-sm font-medium"><Logout status={status} updater={updater} /></span>
                    </Link>
                </li>
            </ul>
           
        </div>
    </div>
    )       
}

export default Header
