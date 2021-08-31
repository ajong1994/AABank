import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {useState} from 'react-dom'

/* Components */
import Home from './components/Home'
import Accounts from './components/Accounts'
import Account from './components/Account'
import Login from './components/Login'
import Register from './components/Register'
import Transactions from './components/Transactions'
import Create from './components/Create'


const App = () => {
  // const [status, setStatus] = useState({
  //   isLoggedIn: false,
  // })
  return (
    <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register} /> 
        <Route path="/accounts" component={Accounts} />
        <Route path="/account" component={Account} />
        <Route path="/create" component={Create} /> 
        <Route path="/transactions" component={Transactions} />
        <Route path="/" component={Home} />
    </Switch>
  );
  /* Objectives */
  // - App should have a page to display all users (can be a table where the name and balance are visible) -> Route /accounts and /account
  // - App should have a page for creating a user -> Route /create
  // - App should have a page for deposit/withdraw/transfer (can be separate or in one page) -> TBD
}


/* Functions */


//Function create_user(user, balance)
// - Function creates new user in system (First Name, Last Name, Email, Balance, Account Number)
// - New user has zero balance (or an optional initial balance)--Make zero balance the default prop
// - user (argument) is any string value. We should add propTypes.string

//Function deposit(user, amount)
// - Function increases user's balance by amount value
// - Returns new_balance of the user

//Function withdraw(user,amount)
// - Function decreases user's balance by amoutnt value
// - Returns new-blance of the user

//Function send(from_user, to_user, amount)
// - Function decreases from_user's balance by amount value
// - Function increases to_user's balance by amount value
// - Returns balance of from_user and to_user in given format (Phpxx,xxx.xx)

//Function get_balance(user)
// - Returns blance of the user in given format (Phpxx,xxx.xx)

//Function list_users()
// - Returns all users


/* Error Handling */
// - wrong_arguments (e.g. amount cannot be negative, name cannot start with a number)
// - user_already_exists ('Den' == 'den')
// - user_does_not_exists ('Den' == 'den')
// - not_enough_money
// - sender_does_not_exists
// - receiver_does_not_exists

export default App;
