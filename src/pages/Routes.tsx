import { createBrowserRouter } from "react-router";
import Landing from "./Landing/Landing";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Search from "./Search/Search";
import FilmDetail from "./FilmDetail/FilmDetail";

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

export default router;