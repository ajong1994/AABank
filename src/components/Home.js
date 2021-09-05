import React from 'react'
import Header from './Header'
import Logout from './Logout'



const Home = ({status}) => {


    return (
        
    <div className="home-main">
      <Header />
      <Logout />
      {/* <Header classname ='App-header'>
        <List liClassname='navItem' location='/home'>Home</List> 
        <List liClassname='navItem' location='/login'>Login</List>  
        <List liClassname='navItem'  location='/register'>Register</List>
      </Header> 

      <Logout /> */}
      
        <h1>WELCOME { status.currentAdmin }!!!</h1> 
    </div>
        
    )
}

export default Home
