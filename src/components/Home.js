import React from 'react'
import Header from './Header'
import List from './List'
// import { useState } from 'react'


const Home = ({status}) => {
  // const [isAuth, setAuth] = useState(true)
  

    return (
        
    <div className="home-main">
      <Header classname ='App-header'>
        <List liClassname='navItem' location='/home'>Home</List> 
        <List liClassname='navItem' location='/login'>Login</List>
        <List liClassname='navItem'  location='/register'>Register</List>
      </Header> 
        <h1>WELCOME { status.currentAdmin } !!!</h1> 
    </div>
        
    )
}

export default Home
