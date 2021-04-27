import List from "./pages/List";
import Favorites from "./pages/Favorites";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const routes = [
  {
    path: "/list/:show",
    component: List,
    private: false,
  },
  {
    path: "/signin",
    component: SignIn,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/favorites",
    component: Favorites,
    private: true,
  },
];

export default routes;
