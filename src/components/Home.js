import React from 'react'
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        
    <div className="home-main">

      <header className="App-header">
          
          <ul>
            <li><NavLink className="navItem" to='/home'>Home</NavLink></li>
            <li><NavLink className="navItem" to='/login'>Login</NavLink></li>
            <li><NavLink className="navItem" to= '/register'>Register</NavLink></li>
          </ul>
          
      </header>  

        <h1>WELCOME!!!</h1>
    </div>
        
    )
}

export default Home
