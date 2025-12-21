import { createHashRouter } from "react-router";
import Landing from "./Landing/Landing";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Search from "./Search/Search";
import FilmDetail from "./FilmDetail/FilmDetail";
import NotFound404 from "./NotFound404/NotFound404";

const router = createHashRouter([{
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
},{
  path: "*",
  element: <NotFound404 />
}]);

export default router;