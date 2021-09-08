import React, {useState, useEffect} from 'react'
import { Switch, Route } from 'react-router-dom'

/* Components */
// import Home from './components/Home'
import Accounts from './pages/Accounts'
import Account from './pages/Account'
import Login from './components/Login'
import Logout from './components/Logout'
import Register from './pages/Register'
import Create from './pages/Create'


const App = () => {

  //On app pageload/refresh, checks sessionStorage for key 'isLoggedIn' and use that as state.
  const [loginStatus, setLoginStatus] = useState({
    isLoggedIn: Boolean(JSON.parse(sessionStorage.getItem('isLoggedIn'))),
    currentAdmin: sessionStorage.getItem('currentAdmin')
  });

  //Whenever state 'isLoggedIn' is modified, useEffect Hook to change sessionStorage also.
  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", loginStatus.isLoggedIn)
    sessionStorage.setItem("currentAdmin", loginStatus.currentAdmin)
  }, [loginStatus]);

  //Named function to change isLoggedIn state
  function updateStatus(newstate) {
      setLoginStatus(newstate);
  }

  return (
    <Switch>
        {/* <Route path="/home" render={(props) => <Home {...props} status={loginStatus} />} /> */}
        <Route path="/login" render={(props) => <Login {...props} status={loginStatus} updater={updateStatus}/>} />
        <Route path="/logout" render={(props) => <Logout {...props} status={loginStatus} updater={updateStatus}/>} />
        <Route path="/register" render={(props) => <Register {...props} status={loginStatus} />}  /> 
        <Route path="/accounts" render={(props) => <Accounts {...props} status={loginStatus} />} />
        <Route path="/account" render={(props) => <Account {...props} status={loginStatus} />} />
        <Route path="/create" render={(props) => <Create {...props} status={loginStatus} />} /> 
        <Route path="/" render={(props) => <Login {...props} status={loginStatus} updater={updateStatus} />} />
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

//Function deposit(user, amount) [DONE]
// - Function increases user's balance by amount value
// - Returns new_balance of the user

//Function withdraw(user,amount) [DONE]
// - Function decreases user's balance by amoutnt value
// - Returns new-blance of the user

//Function send(from_user, to_user, amount) [DONE -- except returning in a given format cause it doesn't make sense]
// - Function decreases from_user's balance by amount value
// - Function increases to_user's balance by amount value
// - Returns balance of from_user and to_user in given format (Phpxx,xxx.xx)

//Function get_balance(user) [DONE]
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
