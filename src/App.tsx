import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Landing from './pages/Landing/Landing'
import RegisterForm from "./features/users/ResgisterForm/RegisterForm";
import LoginForm from "./features/users/LoginForm/LoginForm";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { store } from "./store/store";
import { Provider } from 'react-redux';
import Search from "./pages/Search/Search";

import './App.css';

const router = createBrowserRouter([{
  path: "/",
  element: <Landing />
},{
  path: "/login",
  element: <LoginForm />
},{
  path: "/register",
  element: <RegisterForm />
},{
  path: "/search",
  element: <Search />
}]);

const App = () => {
  return (<ErrorBoundary fallback={ <p>There is a problem rendering the App. Please reload and try again.</p> }>
     <Provider store={store}>
      <RouterProvider router={ router } />
    </Provider>
  </ErrorBoundary>)
}

export default App
