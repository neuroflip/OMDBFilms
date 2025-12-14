import * as React from "react";
import { NavLink } from "react-router";
import { emailSchema, loginFormValidates, setAndValidate } from "../helpers/validation";

const Login = () => {
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    
    const onSubmitLoginForm = (formData: FormData) => {
        if (loginFormValidates(formData)) {
            setEmail('');
            setPassword('');
        }
    }

    const onPaswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;

        setPassword(value);
    }

    return (<>
        <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-primary mb-2 text-center">Login</h2>
            <p className="text-gray-400 text-center mb-6">
                Login into your account to find information about movies or go back to 
                <NavLink to="/" className="link"> landing</NavLink>
            </p>

            <form className="space-y-4" action={ onSubmitLoginForm } noValidate>
                <input type="email" id="email" name="email" placeholder="Email" onChange={ () => { setAndValidate(setEmail, 'email', emailSchema) }} value={ email } />
                <div className="email__feedback"></div>
                <input type="password" id="password" name="password" placeholder="Password" onChange={ onPaswordChange } value={ password } />
                <div className="password__feedback"></div>
                <button type="submit" className="button-primary"> Login </button>
            </form>

            <p className="text-center text-gray-400 mt-6">
                Don't have an account?
                <NavLink to="/register" className="link"> Register</NavLink>
            </p>
        </div>
    </>)
}

export default Login;