import { NavLink } from "react-router";

const Landing = () => {
    return (<>
        <main className="flex flex-col items-center justify-center text-center px-6 h-full w-full">
            <h2 className="text-4xl font-bold text-primary mb-4">Search for Movies</h2>
            <p className="text-gray-400 mb-8">
                Find information about your favorite movies, series and episodes using OMDb API.
            </p>

            <div className="w-full max-w-sm space-y-4">
                <NavLink role="button" to="/login" className="button-primary">Login</NavLink>
                <NavLink role="button" to="/register" className="button-primary">Register</NavLink>
            </div>
        </main>
    </>);
}

export default Landing;