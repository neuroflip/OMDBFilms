import { NavLink } from "react-router";

const RegisterForm = () => {
    return (<>
        <div className="w-full max-w-sm">
        <h2 className="text-3xl font-bold text-primary mb-2 text-center">Register</h2>
        <p className="text-gray-400 text-center mb-6">
            Create an account to find information about movies or go back to 
                <NavLink to="/" className="link"> landing</NavLink>
        </p>

        <form className="space-y-4">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm password" />
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