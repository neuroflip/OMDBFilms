import { NavLink } from "react-router";
import { emailSchema, setAndValidate } from "../helpers/validation";
import useLoginForm from "./hooks/useLoginForm";
import FormFeedbackElement from "../../../components/FormFeedbackElement/FormFeedbackElement";

const LoginForm = () => {
    const [ email, setEmail, password, onSubmitLoginForm, onPaswordChange ] = useLoginForm();

    return (<>
        <div className="w-full max-w-sm m-auto items-center">
            <h2 className="text-3xl font-bold text-primary mb-2 text-center">Login</h2>
            <p className="text-gray-400 text-center mb-6">
                Login into your account to find information about movies or go back to 
                <NavLink to="/" className="link"> landing</NavLink>
            </p>

            <form className="space-y-4" action={ onSubmitLoginForm } noValidate>
                <input className="input" type="email" id="email" name="email" placeholder="Email"
                    onChange={ () => { setAndValidate(setEmail, 'email', emailSchema) }} value={ email } />
                <FormFeedbackElement className="email__feedback" />
                <input className="input" type="password" id="password" name="password" placeholder="Password"
                    onChange={ onPaswordChange } value={ password } />
                <FormFeedbackElement className="password__feedback" />
                <button type="submit" className="button-primary">  Login </button>
                <FormFeedbackElement className="general__feedback" />
            </form>

            <p className="text-center text-gray-400 mt-6">
                Don't have an account?
                <NavLink to="/register" className="link"> Register </NavLink>
            </p>
        </div>
    </>)
}

export default LoginForm;