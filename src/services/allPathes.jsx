import About from "../components/About";
import Admin from "../components/Admin";
import Card from "../components/Card";
import Cards from "../components/Cards";
import EditCard from "../components/EditCard";
import EditProfile from "../components/EditProfile";
import Home from "../components/Home";
import Login from "../components/Login";
import Logout from "../components/Logout";
import NewCard from "../components/NewCard";
import NotFound from "../components/NotFound";
import Profile from "../components/Profile";
import Register from "../components/Signup";
import Success from "../components/Success";
import Users from "../components/Users";

const pathes = [
    {
        key: 1,
        path: '/',
        element: <Home />
    },
    {
        key: 2,
        path: '/signup',
        element: <Register />
    },
    {
        key: 3,
        path: '/login',
        element: <Login />
    },
    {
        key: 4,
        path: '/home',
        element: <Home />
    },
    {
        key: 5,
        path: '/about',
        element: <About />
    },
    {
        key: 6,
        path: '/profile',
        element: <Profile />
    },
    {
        key: 7,
        path: '/logout',
        element: <Logout />
    },
    {
        key: 8,
        path: '/cards/:id',
        element: <Card />
    },
    {
        key: 9,
        path: '/newCard',
        element: <NewCard />
    },
    {
        key: 10,
        path: '/editCard',
        element: <EditCard />
    },
    {
        key: 11,
        path: '*',
        element: <NotFound />
    },
    {
        key: 12,
        path: '/editProfile',
        element: <EditProfile />
    },
    {
        key: 13,
        path: '/success:login',
        element: <Success />
    },
    {
        key: 14,
        path: '/success:register',
        element: <Success />
    },
    {
        key: 15,
        path: '/success:editProfile',
        element: <Success />
    },
    {
        key: 16,
        path: '/success:editCard',
        element: <Success />
    },
    {
        key: 17,
        path: '/success:card',
        element: <Success />
    },
    {
        key: 18,
        path: '/success:deleteCard',
        element: <Success />
    },
    {
        key: 19,
        path: '/success:deleteProfile',
        element: <Success />
    },
    {
        key: 20,
        path: '/admin',
        element: <Admin />
    },
    {
        key: 21,
        path: '/users',
        element: <Users />
    },
    {
        key: 22,
        path: '/cards',
        element: <Cards />
    }
]

export default pathes