import React from 'react'
import { Switch, Route } from 'react-router-dom'

/* Components */
import Home from './components/Home'
import Accounts from './components/Accounts'
import Account from './components/Account'
import Login from './components/Login'
import Register from './components/Register'
import Transactions from './components/Transactions'


const App = () => {
  return (
    <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/accounts" component={Accounts} />
        <Route path="/account" component={Account} />
        <Route path="/register" component={Register} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/" component={Home} />
    </Switch>
  );
}

export default App;
