import React, {useState, useEffect} from 'react'
import { Switch, Route } from 'react-router-dom'

/* Components */
import Home from './components/Home'
import Accounts from './components/Accounts'
import Account from './components/Account'
import Login from './components/Login'
import Register from './components/Register'
import Transactions from './components/Transactions'
import Create from './components/Create'


const App = () => {

  //On app pageload/refresh, checks sessionStorage for key 'isLoggedIn' and use that as state.
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(JSON.parse(sessionStorage.getItem('isLoggedIn')))
  );

  //Whenever state 'isLoggedIn' is modified, useEffect Hook to change sessionStorage also.
  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", isLoggedIn)
  }, [isLoggedIn]);

  //Named function to change isLoggedIn state
  function updateStatus(newstate) {
    if (newstate === true || newstate === false) {
      setIsLoggedIn(newstate);
    } else {
      console.log('Invalid state value passed to isLoggedIn.')
    }
  }

  return (
    <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" render={(props) => <Login {...props} status={isLoggedIn} updater={updateStatus}/>} />
        <Route path="/register" render={(props) => <Register {...props} status={isLoggedIn} />}  /> 
        <Route path="/accounts" render={(props) => <Accounts {...props} status={isLoggedIn} />} />
        <Route path="/account" render={(props) => <Account {...props} status={isLoggedIn} />} />
        <Route path="/create" render={(props) => <Create {...props} status={isLoggedIn} />} /> 
        <Route path="/transactions" render={(props) => <Transactions {...props} status={isLoggedIn} />}  />
        <Route path="/" component={Home} />
    </Switch>
  );
  /* Objectives */
  // - App should have a page to display all users (can be a table where the name and balance are visible) -> Route /accounts with account modal
  // - App should have a page for creating a user -> Route /create
  // - App should have a page for deposit/withdraw/transfer (can be separate or in one page) -> included in account modal
}


/* Functions */


//Function create_user(user, balance)
// - Function creates new user in system (First Name, Last Name, Email, Balance, Account Number)
// - New user has zero balance (or an optional initial balance)
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
// - Returns balance of the user in given format (Phpxx,xxx.xx)

//Function list_users() [DONE]
// - Returns all users -- in ./Accounts


/* Error Handling */
// - wrong_arguments (e.g. amount cannot be negative, name cannot start with a number)
// - user_already_exists ('Den' == 'den')
// - user_does_not_exists ('Den' == 'den')
// - not_enough_money
// - sender_does_not_exists
// - receiver_does_not_exists

export default App;
