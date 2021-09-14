import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../components/Logout'
import logo from './logo2.png'
import {CashIcon} from '@heroicons/react/outline'
import {UserAddIcon} from '@heroicons/react/outline'
import {UserGroupIcon} from '@heroicons/react/outline'
import {LogoutIcon} from '@heroicons/react/outline'
import {UserCircleIcon} from '@heroicons/react/outline'


const Header = ({status}) => {
    
    
    return (        
        
    <div className="flex flex-col bg-white h-full min-h-screen sticky top-0">
        <div className="flex flex-col w-56 h-full min-h-screen bg-white overflow-hidden shadow">
            <div className="flex items-center justify-center h-20">
                <img className='h-24' src={logo} alt="Logo" />
            </div>
            

            <ul class="flex flex-col py-5">

                <li className="flex flex-row items-center h-12">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    {/* <UserCircleIcon className="h-6 w-6" /> */}
                    </span>
                    <span className="text-sm font-bold text-gray-600">{ status.currentAdmin }</span>
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
                    <span className="text-sm font-medium">Create Admin</span>
                    </Link>
                </li>
                <li>
                    <Link className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-primary" to='/create'>
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <UserAddIcon className="h-6 w-6"/>
                    </span>
                    <span className="text-sm font-medium">Create Account</span>
                    </Link>
                </li>
                 
                <li>
                    <Link className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-primary" to='/'>
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <LogoutIcon className="h-6 w-6"/>
                    </span>
                    <span className="text-sm font-medium"><Logout /></span>
                    </Link>
                </li>
            </ul>
           
        </div>
    </div>
    )       
}

export default Header
