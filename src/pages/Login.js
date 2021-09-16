import {useState} from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import Textfield from '../components/Textfield'
import Form from '../components/Form'
import Button from '../components/Button'
import Error from '../components/Error'
import logo from '../components/logo.png'


const Login = ({status, updater}) => {

    const history = useHistory();

    //On component load, initialize errorless state
    const [isError, setError] = useState({
        userNameError: false,
        passwordError: false
    });

    //Initialize state for input variables
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    //If user isLoggedIn based on state passed as prop, redirect to accounts component
    if (status.isLoggedIn) {
        return <Redirect to="/accounts"/>
    } 

    //Create default admin credentials
    const default_credentials = [{
        ajong1994: {
            firstname: 'Aji',
            lastname : 'Ong',
            password: 'password'
        }
    },{
        amcanlubo: {
            firstname: 'Arianne',
            lastname: 'Canlubo',
            password: 'makulitak0'
        }
    }]

    //Error messages
    const userNameError = "Username does not exist."
    const passwordError = "Incorrect password." 

    //Update state of inputs on input change
    function handleInputChange(e ,field) {
        if (field === 'username') {
            setUsernameInput(e.target.value)
        } else {
            setPasswordInput(e.target.value)
        }
        setError({
            userNameError: false,
            passwordError: false
        })
    }

    function handleLogin() {
        //run validator / authentication logic against default credentials listed above
        for (let i = 0; i < 2; i++) {
            if (usernameInput in default_credentials[i]) {
                if (passwordInput === default_credentials[i][usernameInput].password) {
                    updater({
                        isLoggedIn: true, 
                        currentAdmin: usernameInput
                    });
                    history.replace("/accounts");
                } else {
                    setError({
                        userNameError: false,
                        passwordError: true
                    })
                    return
                }
            }
        }
        //run validator / authentication logic against credentials stored in localStorage
        var storedUser = JSON.parse(localStorage.getItem(usernameInput));
        if (storedUser !== null) {
            if (storedUser.password === passwordInput) {
                updater({
                    isLoggedIn: true, 
                    currentAdmin: usernameInput
                });
                //Use history.replace instead of history.push so that when the user presses back, they don't get directed to Login.js again, instead they will be sent to prev Route
                history.replace("/accounts");
            } else {
                //If input password does not match stored password, set passworderror state to true which will affect rendered components
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
        <div className="grid grid-cols-3 h-full">
            <div className="col-span-2 login-hero">
            </div>
            <div className="col-span-1 bg-white h-full p-12 pt-16">
                <Form classnames="" >
                    <img src={logo} className="w-24 pb-16"/>
                    <h2 className="text-4xl font-bold">Login</h2>
                    <div className="mt-8 grid grid-cols-1 gap-2">
                        <div>
                            <Textfield id="login-userinput" placeholder="Enter your username" type="text" value={usernameInput} onChange={(e) => handleInputChange(e, 'username')}>Username</Textfield>
                            <Error classnames={isError.userNameError === true ? 'show' : 'hide hidden'}>{userNameError}</Error>
                        </div>
                        <div>
                            <Textfield id="login-userpass" classnames="form-control" placeholder="Enter your password" type="password" value={passwordInput} onChange={(e) => handleInputChange(e, 'password')}>Password</Textfield>
                            <Error classnames={isError.passwordError === true ? 'show' : 'hide hidden'}>{passwordError}</Error>
                        </div>
                    <Button classnames="mt-8 bg-primary py-2 px-1 rounded-md text-white font-Lato" onclick={handleLogin}>Login</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login