import { NavLink } from "react-router";
import { emailSchema, registerFormValidates, nameSchema, passwordSchema, notEmptySchema, setAndValidate, validateConfirmPassword } from "../helpers/validation";
import * as React from "react";

const RegisterForm = () => {
    const [ name, setName ] = React.useState('');
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ repassword, setRepassword ] = React.useState('');
    const onSubmitRegisterForm = (formData: FormData) => {
        if (registerFormValidates(formData)) {
            setName('');
            setEmail('');
            setPassword('');
            setRepassword('');
        }
    }

    return (<>
        <div className="w-full max-w-sm">
        <h2 className="text-3xl font-bold text-primary mb-2 text-center">Register</h2>
        <p className="text-gray-400 text-center mb-6">
            Create an account to find information about movies or go back to 
                <NavLink to="/" className="link"> landing</NavLink>
        </p>

        <form className="space-y-4" action={ onSubmitRegisterForm } noValidate>
            <input id="name" name="name" type="text" placeholder="Name"
                onChange={ () => { setAndValidate(setName, 'name', nameSchema) }} value={ name } />
            <div className="name__feedback"></div>
            <input id="email" name="email" type="email" placeholder="Email" 
                onChange={ () => { setAndValidate(setEmail, 'email', emailSchema) }} value={ email } />
            <div className="email__feedback"></div>    
            <input id="password" name="password" type="password" placeholder="Password" 
                onChange={ () => { setAndValidate(setPassword, 'password', passwordSchema) }} value={ password } />
            <div className="password__feedback"></div>
            <input id="repassword" name="repassword" type="password" placeholder="Confirm password" 
                onChange={ () => { 
                    setAndValidate(setRepassword, 'repassword', notEmptySchema);
                    validateConfirmPassword();
                }} value={ repassword } />
            <div className="repassword__feedback"></div>
            <button type="submit" className="button-primary"> Register </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
            Already have an account?
            <NavLink to="/login" className="link"> Login</NavLink>
        </p>
        </div>
    </>);
}

export default RegisterForm;