import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Landing from './pages/Landing/Landing'
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { store } from "./store/store";
import { Provider } from 'react-redux';
import Search from "./pages/Search/Search";

import './App.css';
import FilmDetail from "./features/filmDetail/FilmDetail";

const router = createBrowserRouter([{
  path: "/",
  element: <Landing />
},{
  path: "/login",
  element: <Login />
},{
  path: "/register",
  element: <Register />
},{
  path: "/search",
  element: <Search />
},{
  path: "/film/:id",
  element: <FilmDetail />
}]);

const App = () => {
  return (<ErrorBoundary fallback={ <p>There is a problem rendering the App. Please reload and try again.</p> }>
     <Provider store={store}>
      <RouterProvider router={ router } />
    </Provider>
  </ErrorBoundary>)
}

export default App
