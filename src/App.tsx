import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Landing from './pages/Landing/Landing'
import RegisterForm from "./features/users/ResgisterForm/RegisterForm";
import Login from "./features/users/Login/Login";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

import './App.css'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


const router = createBrowserRouter([{
  path: "/",
  element: <Landing />
},{
  path: "/login",
  element: <Login />
},{
  path: "/register",
  element: <RegisterForm />
}]);

const App = () => {
  return (<ErrorBoundary fallback={ <p>There is a problem rendering the App. Please reload and try again.</p> }>
    <Header />
    <RouterProvider router={ router } />
    <Footer />
  </ErrorBoundary>)
}

export default App
