import React, {useState, useEffect} from 'react'
// import { Switch, Route } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

/* Components */
// import Home from './components/Home'
import Accounts from './pages/Accounts'
import Account from './pages/Account'
import Login from './pages/Login'
import Register from './pages/Register'
import Create from './pages/Create'
import TotalTransactions from './pages/TotalTransactions'
import PageNotFound from './pages/PageNotFound'


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
    <Router>
      <Switch>
          <Route exact path={process.env.PUBLIC_URL + "/login"} render={(props) => <Login {...props} status={loginStatus} updater={updateStatus}/>} />
          <Route exact path={process.env.PUBLIC_URL + "/register"} render={(props) => <Register {...props} status={loginStatus} updater={updateStatus} />}  /> 
          <Route exact path={process.env.PUBLIC_URL + "/accounts"} render={(props) => <Accounts {...props} status={loginStatus} updater={updateStatus} />} />
          <Route exact path={process.env.PUBLIC_URL + "/account"} render={(props) => <Account {...props} status={loginStatus} updater={updateStatus} />} />
          <Route exact path={process.env.PUBLIC_URL + "/create"} render={(props) => <Create {...props} status={loginStatus}  updater={updateStatus}/>} /> 
          <Route exact path={process.env.PUBLIC_URL + "/transactions"} render={(props) => <TotalTransactions {...props} status={loginStatus} updater={updateStatus}/>} />
          <Route path={process.env.PUBLIC_URL + "/"} render={(props) => <Login {...props} status={loginStatus} updater={updateStatus} />} />
          <Route path = "*"><PageNotFound /></Route>
      </Switch>
    </Router>

    
  );
}

export default App;
