import {useState} from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import Textfield from './Textfield'
import Form from './Form'
import Button from './Button'
import Error from './Error'


const Login = ({status, updater}) => {


    const history = useHistory();

    //On component load, initialize errorless state
    const [isError, setError] = useState({
        userNameError: false,
        passwordError: false
    });

    //If user isLoggedIn based on state passed as prop, redirect to accounts component
    if (status.isLoggedIn) {
        return <Redirect to="/accounts"/>
    } 

    var userNameError = "Username does not exist."
    var passwordError = "Incorrect password." 

    function handleLogin() {
        var loginUser = document.getElementById('login-userinput').value;
        var loginPass = document.getElementById('login-userpass').value;
        var storageUser = JSON.parse(localStorage.getItem(loginUser));
        if (storageUser !== null) {
            if (storageUser.password === loginPass) {
                updater({
                    isLoggedIn: true, 
                    currentAdmin: loginUser
                });
                //Use history.replace instead of history.push so that when the user presses back, they don't get directed to Login.js again, instead they will be sent to prev Route
                history.replace("/accounts");
            } else {
                //If input password does not match stores password, set passworderror state to true which will affect rendered components
                setError({
                    userNameError: false,
                    passwordError: true
                })
            }
        } else {
            //If username does not exist in localstorage, set usernameerror state to true which will affect rendered components
            setError({
                userNameError: true,
                passwordError: false
            })
        }
    }


    return (
        <div className="login-main">
            <Form classnames="form1" >
                <h1>Sign-in</h1>
                <Textfield id="login-userinput" classnames="form-control" placeholder="Enter your username" type="text">Username</Textfield>
                <Error classnames={isError.userNameError === true ? 'errortext' : 'hide'}>{userNameError}</Error>
                <Textfield id="login-userpass" classnames="form-control" placeholder="Enter your password" type="password">Password</Textfield>
                <Error classnames={isError.passwordError === true ? 'errortext' : 'hide'}>{passwordError}</Error>
                <Button classnames="buttons btn1" onclick={handleLogin}>Login</Button>
            </Form>
        </div>
    )
}

export default Login