import { NavLink } from "react-router";

const Login = () => {
    return (<>
        <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-primary mb-2 text-center">Login</h2>
            <p className="text-gray-400 text-center mb-6">
                Login into your account to find information about movies or go back to 
                <NavLink to="/" className="link"> landing</NavLink>
            </p>

            <form className="space-y-4">
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
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