import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';


//component
import Account from './Account'


const Accounts = () => {
  const [state, setState] = useState({
    user: '',
    accounts: []
  })

  const { user, accounts } = state
  
  const handleOnChange = (e) => {
    const { name, value } = e.target

    setState({ ...state, [name]: value })
  }

  /* CREATE */
  const createUsers = () => {
    const list = accounts // [] - Current
    list.push(user) // [] - Current + Current User Input

    setState({ user: '', accounts: list })
  }

  return (
    <>
      <div className="accounts-main">

        <header className="App-header">
        <ul>
              <li><NavLink className="navItem" to='/create'>Create an account</NavLink></li>
              <li><NavLink className="navItem" to='/transactions'>Transactions</NavLink></li>
        </ul>
        </header>

        <div className="form-wrapper">
          <input
            type="text"
            name="user"
            placeholder="Create user"
            value={user}
            onChange={handleOnChange}
          />
          <button onClick={createUsers}>Add</button>
        </div>
        <div className="table-main">
          <div className="header-wrapper">
            <span>ALL ACCOUNTS</span>
          </div>
          
          {
            accounts.length ?
              accounts.map((value, index) => (
                //LIST OF ACCOUNTS
                <Account
                  key={index}
                  index={index}
                  value={value}
                />
              )) : <span>No records found!</span>
          }
         
        </div>
      </div>
    </>
  )
}

export default Accounts