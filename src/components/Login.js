import {Redirect, useHistory} from 'react-router-dom'
import Textfield from './Textfield'
import Form from './Form'
import Button from './Button'


const Login = ({status}) => {

    const history = useHistory();
    
    if (status.isLoggedIn) {
        return <Redirect to="/accounts"/>
    } 

    function handleLogin() {
        var loginUser = document.getElementById('login-userinput').value;
        var loginPass = document.getElementById('login-userpass').value;
        var storageUser = JSON.parse(localStorage.getItem(loginUser));
        console.log(storageUser);
        if (storageUser !== null) {
            if (storageUser.password === loginPass) {
                history.push("/accounts");
            } else {
                alert ('Incorrect password.')
            }
        } else {
            alert('Admin user does not exist.')
        }
    }


    return (
        <div className="login-main">
            <Form classnames="form1" >
                <h1>Sign-in</h1>
                <Textfield id="login-userinput" classnames="form-control" placeholder="Enter your username" type="text">Username</Textfield>
                <Textfield id="login-userpass" classnames="form-control" placeholder="Enter your password" type="password">Password</Textfield>
                <Button classnames="buttons btn1" onclick={handleLogin}>Login</Button>
            </Form>
        </div>
    )
}

export default Login