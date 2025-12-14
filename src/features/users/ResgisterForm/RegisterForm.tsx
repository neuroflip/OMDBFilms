import * as React from "react";
import { NavLink } from "react-router";
import { emailSchema, nameSchema, passwordSchema, notEmptySchema, setAndValidate } from "../helpers/validation";
import { registerFormValidates, validateConfirmPassword } from "../helpers/registerValidations";
import { createClient } from "@supabase/supabase-js";

const RegisterForm = () => {
    const [ name, setName ] = React.useState('');
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [ repassword, setRepassword ] = React.useState('');
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY);
    const onSubmitRegisterForm = async (formData: FormData) => {
        if (registerFormValidates(formData)) {
            setIsLoading(true);
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        displayName: name
                    },
                    emailRedirectTo: '/search',
                },
            })
            if (error) {
                alert(error.message);
            } else {
                //setSession(data.session);
            }
            setIsLoading(false);
            console.log(data);
            console.log(error);

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
            <button type="submit" className="button-primary">  { isLoading ? "Loading..." : "Register"}</button>
        </form>

        <p className="text-center text-gray-400 mt-6">
            Already have an account?
            <NavLink to="/login" className="link"> Login</NavLink>
        </p>
        </div>
    </>);
}

export default RegisterForm;